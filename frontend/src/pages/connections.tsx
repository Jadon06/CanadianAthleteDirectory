import { useEffect, useMemo, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { FaUserFriends } from 'react-icons/fa';
import { LuMessageSquareMore } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import type { ChangeEvent, KeyboardEvent } from 'react';
import CustomNavBar from '../Components/NavigationBar';
import { navigateToOwnDashboard } from '../utils/dashboardRoute';

interface ConnectionUser {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	school?: string;
	user_type?: string;
	profile_picture?: string;
}

const USERS_PER_PAGE = 25;

export default function Connections() {
	const navigate = useNavigate();
	const [connections, setConnections] = useState<ConnectionUser[]>([]);
	const [followingState, setFollowingState] = useState<Record<string, boolean>>({});
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	const totalPages = Math.max(1, Math.ceil(connections.length / USERS_PER_PAGE));

	const paginatedConnections = useMemo(() => {
		const start = (currentPage - 1) * USERS_PER_PAGE;
		return connections.slice(start, start + USERS_PER_PAGE);
	}, [connections, currentPage]);

	useEffect(() => {
		const fetchConnections = async () => {
			try {
				const response = await fetch('http://localhost:8001/search/', {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ content: '' })
				});

				if (!response.ok) {
					throw new Error('Failed to fetch connections');
				}

				const data = (await response.json()) as ConnectionUser[];
				if (!Array.isArray(data) || data.length === 0) {
					setConnections([]);
					setFollowingState({});
					return;
				}

				const mappedConnections =
					data.map((user) => ({
						...user,
						id: user.email || `${user.first_name}-${user.last_name}`
					}));

				setConnections(mappedConnections);
				setFollowingState(
					Object.fromEntries(mappedConnections.map((user) => [user.id, true]))
				);
			} catch {
				setConnections([]);
				setFollowingState({});
			} finally {
				setIsLoading(false);
			}
		};

		fetchConnections();
	}, []);

	useEffect(() => {
		if (currentPage > totalPages) {
			setCurrentPage(totalPages);
		}
	}, [currentPage, totalPages]);

	const handleClickHome = () => {
		navigate('/feed');
	};

	const handleClickMessages = () => {
		navigate('/messages');
	};

	const handleClickNotifications = () => {
		navigate('/notifications');
	};

	const handleClickDashboard = () => {
		void navigateToOwnDashboard(navigate);
	};

	const handleClickSearch = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			navigate('/search-results');
		}
	};

	const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
		void event.target.value;
	};

	const handleStartConversation = (user: ConnectionUser) => {
		navigate('/messages', { state: { newConversation: user } });
	};

	const handleToggleFollowing = (userId: string) => {
		setFollowingState((prev) => ({
			...prev,
			[userId]: !prev[userId]
		}));
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

			<Container className="page-section" style={{ paddingTop: '18px', paddingBottom: '40px' }}>
				<Card className="surface-card connections-shell">
					<div className="connections-header">
						<div className="eyebrow" style={{ marginBottom: '10px' }}>
							<FaUserFriends /> Following
						</div>
						<h1 className="section-title" style={{ marginBottom: 0 }}>Your Connections</h1>
					</div>

					{isLoading ? (
						<div className="muted-copy">Loading connections...</div>
					) : paginatedConnections.length === 0 ? (
						<div className="muted-copy">No connections yet. Start connecting with athletes, coaches, and scouts to build your network.</div>
					) : (
						<div className="connections-list">
							{paginatedConnections.map((user) => {
								const initials = `${(user.first_name || '').charAt(0)}${(user.last_name || '').charAt(0)}`.toUpperCase();

								return (
									<div className="connection-item" key={user.id}>
										<div className="connection-user-left">
											{user.profile_picture ? (
												<img src={user.profile_picture} alt={`${user.first_name} ${user.last_name}`} className="connection-avatar" />
											) : (
												<div className="connection-avatar-fallback">{initials || 'U'}</div>
											)}

											<div className="connection-text-stack">
												<h3>{user.first_name} {user.last_name}</h3>
												<div className="network-meta">{user.school || 'School unavailable'} • {user.user_type || 'Athlete'}</div>
											</div>
										</div>

											<div className="connection-actions">
												<Button
													className="ghost-button btn connection-following-btn"
													onClick={() => handleToggleFollowing(user.id)}
												>
													{followingState[user.id] ? 'Following' : 'Follow'}
												</Button>
												<Button
													className="ghost-button btn connection-message-btn"
													onClick={() => handleStartConversation(user)}
													aria-label={`Message ${user.first_name} ${user.last_name}`}
													title="Message"
												>
													<LuMessageSquareMore />
												</Button>
											</div>
									</div>
								);
							})}
						</div>
					)}

					{connections.length > 0 && (
						<div className="connections-pagination">
							<Button
								className="ghost-button btn"
								onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
								disabled={currentPage === 1}
							>
								Previous
							</Button>

							<div className="network-meta">Page {currentPage} of {totalPages}</div>

							<Button
								className="ghost-button btn"
								onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
								disabled={currentPage === totalPages}
							>
								Next
							</Button>
						</div>
					)}
				</Card>
			</Container>
		</div>
	);
}
