import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import { FaBasketballBall, FaSearch, FaUserCircle } from 'react-icons/fa';

import CustomNavBar from '../Components/NavigationBar';
import { buildDashboardPath, navigateToOwnDashboard, usernameFromFullName } from '../utils/dashboardRoute';
import { apiUrl } from '../utils/api';

interface SearchUser {
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  profile_picture: string;
  phone_number: string;
  school: string;
  position: string;
  height: string;
  weight: string;
  age: string;
  user_type: string;
}

export default function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParam = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return (params.get('q') ?? '').trim();
  }, [location.search]);

  const [query, setQuery] = useState(queryParam);
  const [allUsers, setAllUsers] = useState<SearchUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    const fetchUsers = async() => {
      setIsLoading(true);
      setErrorMessage('');

      const response = await fetch(apiUrl('/search/'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: query })
      });

      if (!response.ok) {
        setErrorMessage('Unable to load search results right now.');
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setAllUsers(Array.isArray(data) ? data : []);
      setIsLoading(false);
    };

    fetchUsers();
  }, [query]);

  const normalizedQuery = query.toLowerCase();

  const filteredUsers = useMemo(() => {
    if (!normalizedQuery) {
      return allUsers;
    }

    return allUsers.filter((user) => {
      const haystack = [
        user.first_name,
        user.middle_name,
        user.last_name,
        user.school,
        user.position,
        user.user_type,
        user.email,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [allUsers, normalizedQuery]);

  const handleClickHome = () => navigate('/feed');
  const handleClickMessages = () => navigate('/messages');
  const handleClickNotifications = () => navigate('/notifications');
  const handleClickDashboard = () => {
    void navigateToOwnDashboard(navigate);
  };

  const handleClickSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate(`/search-results?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
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
        <div className="section-heading" style={{ marginBottom: '14px' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: '10px' }}>
              <FaSearch /> Search Results
            </div>
            <h1 className="section-title">Find athletes, coaches, and scouts quickly.</h1>
            <p className="section-subtitle">
              {query ? `Showing matches for "${query}"` : 'Showing all available profiles. Type in the search bar and press Enter to refine.'}
            </p>
          </div>
          <Button className="ghost-button btn" onClick={() => navigate('/feed/')}>Back to feed</Button>
        </div>

        {isLoading && (
          <Card className="surface-card" style={{ borderRadius: '24px', padding: '28px', textAlign: 'center' }}>
            <div className="basketball-loader" aria-hidden="true">
              <div className="basketball-loader-track">
                <div className="basketball-loader-orbit">
                  <span className="basketball-loader-tail" />
                  <span className="basketball-loader-contrail contrail-1" />
                  <span className="basketball-loader-contrail contrail-2" />
                  <span className="basketball-loader-contrail contrail-3" />
                  <span className="basketball-loader-contrail contrail-4" />
                  <span className="basketball-loader-contrail contrail-5" />
                  <span className="basketball-loader-contrail contrail-6" />
                  <span className="basketball-loader-ball">
                    <FaBasketballBall />
                  </span>
                </div>
              </div>
            </div>
            <div className="muted-copy">Loading results...</div>
          </Card>
        )}

        {!isLoading && errorMessage && (
          <Card className="surface-card" style={{ borderRadius: '24px', padding: '20px' }}>
            <h3>Search unavailable</h3>
            <div className="muted-copy">{errorMessage}</div>
          </Card>
        )}

        {!isLoading && !errorMessage && (
          <div className="search-results-grid">
            {filteredUsers.length === 0 && (
              <Card className="surface-card" style={{ borderRadius: '24px', padding: '20px' }}>
                <h3>No users found</h3>
                <div className="muted-copy">Try another name, school, position, or role.</div>
              </Card>
            )}

            {filteredUsers.map((user, index) => (
              <Card
                key={`${user.email}-${index}`}
                className="search-result-card"
                onClick={() => navigate(buildDashboardPath(usernameFromFullName(`${user.first_name} ${user.last_name}`)), { state: { profileEmail: user.email } })}
                style={{ cursor: 'pointer' }}
              >
                <div className="search-result-top">
                  <div className="search-result-avatar">
                    {user.profile_picture ? (
                      <img src={user.profile_picture} alt={`${user.first_name} ${user.last_name}`} />
                    ) : (
                      <FaUserCircle />
                    )}
                  </div>
                  <div>
                    <h3 className="mb-1">{`${user.first_name} ${user.last_name}`}</h3>
                    <div className="network-meta">{user.user_type || 'Athlete'}{user.position ? ` | ${user.position}` : ''}</div>
                  </div>
                </div>

                <div className="search-result-meta">
                  <span className="profile-stat-chip">{user.school || 'School not listed'}</span>
                  {user.age && <span className="profile-stat-chip">Age {user.age}</span>}
                  {user.height && <span className="profile-stat-chip">Ht {user.height}</span>}
                  {user.weight && <span className="profile-stat-chip">Wt {user.weight}</span>}
                </div>

                <div className="muted-copy" style={{ marginTop: '10px' }}>{user.email || 'No email available'}</div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
