import { Card, Container } from 'react-bootstrap';
import { FaInbox } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import type { ChangeEvent, KeyboardEvent } from 'react';
import CustomNavBar from '../Components/NavigationBar';

export default function Messages() {
    const navigate = useNavigate()

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
        navigate('/dashboard')
    }

    const handleClickSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            navigate('/search-results')
        }
    }

    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        void event.target.value
    }

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
                                <div className="muted-copy" style={{ textAlign: 'center', marginTop: '14px' }}>
                                    Inbox Empty
                                </div>
                            </div>
                        </aside>

                        <section className="message-thread-pane">
                            <div className="message-thread-head">
                                <div>
                                    <h3>Messages</h3>
                                    <div className="network-meta">No active conversation</div>
                                </div>
                            </div>

                            <div className="message-thread-body">
                                <div className="muted-copy" style={{ textAlign: 'center', marginTop: '14px' }}>
                                    Inbox Empty
                                </div>
                                <div className="muted-copy" style={{ textAlign: 'center' }}>
                                    Select a conversation once messages are available.
                                </div>
                            </div>
                        </section>
                    </div>
                </Card>
            </Container>
        </div>
    );
}