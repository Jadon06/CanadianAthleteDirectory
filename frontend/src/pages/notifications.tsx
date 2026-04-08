import { Card, Container } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomNavBar from '../Components/NavigationBar';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: 'mock-1',
        type: 'message',
        title: 'New message from Coach Rivera',
        message: 'Coach Rivera: "Great film from your last game. Send your next highlight when it is ready."',
        timestamp: '2m ago',
        read: false,
        icon: 'message'
    }
]

const READ_NOTIFICATIONS_STORAGE_KEY = 'readNotificationIds'

const getInitialNotifications = (): Notification[] => {
    const readIds = new Set<string>()

    if (typeof window !== 'undefined') {
        try {
            const stored = localStorage.getItem(READ_NOTIFICATIONS_STORAGE_KEY)
            const parsed = stored ? JSON.parse(stored) : []
            if (Array.isArray(parsed)) {
                parsed.forEach((id) => {
                    if (typeof id === 'string') {
                        readIds.add(id)
                    }
                })
            }
        } catch {
            // Ignore malformed localStorage values and fall back to defaults.
        }
    }

    return MOCK_NOTIFICATIONS.map((notification) => ({
        ...notification,
        read: notification.read || readIds.has(notification.id)
    }))
}

export default function Notifications(){
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState<Notification[]>(() => getInitialNotifications());
    const [isLoading] = useState(false);

    const handleClickHome = () => navigate('/feed');
    const handleClickMessages = () => navigate('/messages');
    const handleClickNotifications = () => navigate('/notifications');
    const handleClickDashboard = () => navigate('/dashboard');

    const handleClickSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            navigate('/search-results');
        }
    };

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        void value;
    };

    const getNotificationRoute = (type: string) => {
        switch (type.toLowerCase()) {
            case 'message':
                return '/messages';
            case 'feed':
            case 'highlight':
                return '/feed';
            case 'profile':
                return '/dashboard';
            case 'search':
                return '/search-results';
            default:
                return '/notifications';
        }
    };

    const handleNotificationClick = (notif: Notification) => {
        setNotifications((prev) => {
            const updated = prev.map((item) =>
                item.id === notif.id ? { ...item, read: true } : item
            )

            if (typeof window !== 'undefined') {
                try {
                    const readIds = updated.filter((item) => item.read).map((item) => item.id)
                    localStorage.setItem(READ_NOTIFICATIONS_STORAGE_KEY, JSON.stringify(readIds))
                } catch {
                    // Ignore localStorage write failures.
                }
            }

            return updated
        })

        const route = getNotificationRoute(notif.type);
        setTimeout(() => {
            navigate(route);
        }, 300);
    };

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

            <Container className="page-section" style={{ paddingTop: "18px", paddingBottom: "40px" }}>
                <div className="section-heading" style={{ marginBottom: "24px" }}>
                    <div>
                        <div className="eyebrow" style={{ marginBottom: "10px" }}>
                            <FaBell /> Notifications
                        </div>
                        <h1 className="section-title">Stay in the loop.</h1>
                        <p className="section-subtitle">Followers, highlights, messages, and activity all in one place.</p>
                    </div>
                </div>

                {isLoading ? (
                    <Card className="surface-card" style={{ borderRadius: "24px", padding: "20px" }}>
                        <div className="muted-copy">Loading notifications...</div>
                    </Card>
                ) : notifications.length === 0 ? (
                    <Card className="surface-card" style={{ borderRadius: "24px", padding: "40px", textAlign: "center" }}>
                        <div style={{ fontSize: "3rem", marginBottom: "16px", color: "#4f647f" }}>
                            <FaBell />
                        </div>
                        <h3 style={{ marginBottom: "8px" }}>Inbox is empty</h3>
                        <div className="muted-copy" style={{ marginBottom: "24px" }}>
                            When you get followers, reactions, messages, or activity, they'll show up here.
                        </div>
                    </Card>
                ) : (
                    <div className="notifications-list">
                        {notifications.map((notif) => (
                            <Card
                                key={notif.id}
                                className={`notification-card ${notif.read ? 'read' : 'unread'}`}
                                onClick={() => handleNotificationClick(notif)}
                            >
                                <div className="notification-top">
                                    <div className="notification-content">
                                        <h3 style={{ marginBottom: "4px" }}>{notif.title}</h3>
                                        <div className="muted-copy">{notif.message}</div>
                                    </div>
                                    <div className="notification-meta">{notif.timestamp}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}