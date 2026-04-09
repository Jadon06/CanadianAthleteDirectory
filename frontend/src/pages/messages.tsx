import { Card, Container, Button } from 'react-bootstrap';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ChangeEvent, KeyboardEvent } from 'react';
import CustomNavBar from '../Components/NavigationBar';
import { navigateToOwnDashboard } from '../utils/dashboardRoute';

interface ConversationUser {
    first_name: string;
    last_name: string;
    school?: string;
    profile_picture?: string;
}

interface ChatMessage {
    id: number;
    text: string;
    fromMe: boolean;
    status?: 'pending' | 'sent';
}

export default function Messages() {
    const navigate = useNavigate()
    const location = useLocation()
    const stateConversation = (location.state as { newConversation?: ConversationUser } | null)?.newConversation

    const [activeConversation, setActiveConversation] = useState<ConversationUser | null>(stateConversation || null)
    const [draftMessage, setDraftMessage] = useState('')
    const [threadMessages, setThreadMessages] = useState<ChatMessage[]>([])
    const [socketStatus, setSocketStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected')
    const socketRef = useRef<WebSocket | null>(null)

    useEffect(() => {
        if (stateConversation) {
            setActiveConversation(stateConversation)
            setThreadMessages([])
        }
    }, [stateConversation])

    const handleClickHome = () => {
        navigate('/feed')
    }

    const handleClickMessages = () => {
        navigate('/messages')
    }

    const handleClickNotifications = () => {
        navigate('/notifications')
    }

    const handleClickDashboard = () => {
        void navigateToOwnDashboard(navigate)
    }

    const handleClickSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            navigate('/search-results')
        }
    }

    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        void event.target.value
    }

    const roomId = useMemo(() => {
        if (!activeConversation) {
            return 'general'
        }

        const participant = `${activeConversation.first_name || ''}_${activeConversation.last_name || ''}`
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '_')

        return participant || 'general'
    }, [activeConversation])

    useEffect(() => {
        if (!activeConversation) {
            setSocketStatus('disconnected')
            if (socketRef.current) {
                socketRef.current.close()
                socketRef.current = null
            }
            return
        }

        setSocketStatus('connecting')
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
        const ws = new WebSocket(`${protocol}://localhost:8001/messaging/ws/${roomId}`)
        socketRef.current = ws

        ws.onopen = () => {
            setSocketStatus('connected')
        }

        ws.onmessage = (event) => {
            const rawMessage = String(event.data || '')
            const separatorIndex = rawMessage.indexOf(': ')
            const parsedText = separatorIndex >= 0 ? rawMessage.slice(separatorIndex + 2) : rawMessage

            setThreadMessages((prev) => {
                const now = Date.now()
                const pendingMatch = prev.find((message) => (
                    message.fromMe &&
                    message.status === 'pending' &&
                    message.text === parsedText &&
                    now - message.id < 4000
                ))

                if (pendingMatch) {
                    return prev.map((message) => (
                        message.id === pendingMatch.id
                            ? { ...message, status: 'sent' }
                            : message
                    ))
                }

                return [
                    ...prev,
                    {
                        id: now,
                        text: parsedText,
                        fromMe: false,
                        status: 'sent'
                    }
                ]
            })
        }

        ws.onerror = () => {
            setSocketStatus('disconnected')
        }

        ws.onclose = () => {
            setSocketStatus('disconnected')
        }

        return () => {
            ws.close()
            if (socketRef.current === ws) {
                socketRef.current = null
            }
        }
    }, [activeConversation, roomId])

    const handleSendMessage = () => {
        const trimmed = draftMessage.trim()
        if (!trimmed) {
            return
        }

        const messageId = Date.now()

        setThreadMessages((prev) => [
            ...prev,
            {
                id: messageId,
                text: trimmed,
                fromMe: true,
                status: 'pending'
            }
        ])

        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(trimmed)
        }

        setDraftMessage('')
    }

    const initials = `${activeConversation?.first_name?.charAt(0) || ''}${activeConversation?.last_name?.charAt(0) || ''}`.toUpperCase()
    const fullName = activeConversation ? `${activeConversation.first_name} ${activeConversation.last_name}` : ''

    return (
        <div className="app-shell hero-shell">
            <CustomNavBar
                handleClickHome={handleClickHome}
                handleClickMsgs={handleClickMessages}
                handleClickSearch={handleClickSearch}
                handleClickNotifications={handleClickNotifications}
                handleChangeSearch={handleChangeSearch}
                handleClickDashboard={handleClickDashboard}
            />

            <Container fluid className="message-page-shell">
                <Card className="message-ipad-shell">
                    <div className="message-ipad-grid">
                        <aside className="message-sidebar">
                            <div className="message-sidebar-head">
                                <h3>Inbox</h3>
                            </div>

                            <div className="message-conversation-list" style={{ height: '100%' }}>
                                {activeConversation ? (
                                    <button className="message-conversation-item is-active" type="button">
                                        <div className="message-avatar">
                                            {activeConversation.profile_picture ? (
                                                <img src={activeConversation.profile_picture} alt={fullName} />
                                            ) : (
                                                initials || 'U'
                                            )}
                                        </div>
                                        <div className="message-item-copy">
                                            <div className="message-item-top">
                                                <strong>{fullName}</strong>
                                                <span>Now</span>
                                            </div>
                                            <div className="message-item-preview">New conversation</div>
                                        </div>
                                        <span className="message-unread-dot">1</span>
                                    </button>
                                ) : (
                                    <div className="muted-copy" style={{ textAlign: 'center', marginTop: '14px' }}>
                                        Inbox Empty
                                    </div>
                                )}
                            </div>
                        </aside>

                        <section className="message-thread-pane">
                            <div className="message-thread-head">
                                <div>
                                    <h3>{activeConversation ? fullName : 'Messages'}</h3>
                                    <div className="network-meta">{activeConversation ? (activeConversation.school || 'No school listed') : 'No active conversation'}</div>
                                    {activeConversation && (
                                        <div className="network-meta">Socket: {socketStatus}</div>
                                    )}
                                </div>
                            </div>

                            <div className="message-thread-body">
                                {activeConversation ? (
                                    threadMessages.length > 0 ? (
                                        threadMessages.map((message) => (
                                            <div key={message.id} className={`message-bubble ${message.fromMe ? 'from-me' : 'from-them'}`}>
                                                {message.text}
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            <div className="muted-copy" style={{ textAlign: 'center', marginTop: '14px' }}>
                                                New conversation started with {fullName}.
                                            </div>
                                            <div className="muted-copy" style={{ textAlign: 'center' }}>
                                                Send the first message to connect.
                                            </div>
                                        </>
                                    )
                                ) : (
                                    <>
                                        <div className="muted-copy" style={{ textAlign: 'center', marginTop: '14px' }}>
                                            Inbox Empty
                                        </div>
                                        <div className="muted-copy" style={{ textAlign: 'center' }}>
                                            Select a conversation once messages are available.
                                        </div>
                                    </>
                                )}
                            </div>

                            {activeConversation && (
                                <div className="message-thread-input-row">
                                    <input
                                        type="text"
                                        value={draftMessage}
                                        onChange={(event) => setDraftMessage(event.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                                handleSendMessage()
                                            }
                                        }}
                                        placeholder={`Message ${activeConversation.first_name}...`}
                                    />
                                    <Button className="action-button btn" onClick={handleSendMessage}>Send</Button>
                                </div>
                            )}
                        </section>
                    </div>
                </Card>
            </Container>
        </div>
    );
}