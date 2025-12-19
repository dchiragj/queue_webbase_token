// src/components/QueueForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const QueueForm = () => {
  const [queue, setQueue] = useState(null);
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [mobile, setMobile] = useState(user.mobileNumber || '');
  const [isMobileSubmitted, setIsMobileSubmitted] = useState(false);
  const [activeToken, setActiveToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkingToken, setCheckingToken] = useState(false);
  const [gettingToken, setGettingToken] = useState(false);
  const [queueId, setQueueId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:8008';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/not-found", { replace: true });
      return;
    }

    try {
      const decoded = atob(token);
      const [queueId, categoryId] = decoded.split("/");
      if (queueId && categoryId) {
        setQueueId(queueId);
        setCategoryId(categoryId);
      }

    } catch (error) {
      navigate("/not-found", { replace: true });
    }
  }, []);
  useEffect(() => {
    const loadQueue = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${backendUrl}/api/token/queue/${queueId}/${categoryId}`
        );
        setQueue(res.data.data);

      } catch (err) {
        toast.error('Queue not found or currently closed');
        setQueue(null);
      } finally {
        setLoading(false);
      }
    };

    if (queueId && categoryId) loadQueue();
  }, [queueId, categoryId, backendUrl]);

  // Check if user already has a token
  const handleMobileSubmit = async () => {
    if (!mobile.length) {
      toast.error('Please enter a valid 10-digit mobile number OR valid email address');
      return;
    }
    const isEmail = mobile.includes('@')
    if (isEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(mobile)) {
        toast.error("Please enter valid email address")
        return
      }
    } else {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(mobile)) {
        toast.error("Please enter valid mobile number")
        return
      }
    }

    setCheckingToken(true);
    try {
      const res = await axios.get(
        `${backendUrl}/api/queue/${queueId}/history?mobile=${mobile}`
      );

      if (res.data.status !== 'ok') {
        setActiveToken(null);
        setIsMobileSubmitted(true);
        return;
      }

      const d = res.data.data;

      if (d.User) {
        setUser(d.User);
        setFirstName(d.User.firstName || '');
        setLastName(d.User.lastName || '');
      }
      if (d.hasToken && d.tokenNumber) {

        setActiveToken({
          tokenNumber: d.tokenNumber,
          status: d.status || 'PENDING',
          createdAt: d.createdAt,
          hasToken: true,
          usersAllTokens: d.usersAllTokens || [],
        });

        toast.info(`You already have Token #${d.tokenNumber} in this queue`, {
          position: "top-center",
          autoClose: 5000,
        });
      } else if (d.usersAllTokens && d.usersAllTokens.length > 0) {
        setActiveToken({
          tokenNumber: null,
          hasToken: false,
          usersAllTokens: d.usersAllTokens,
        });

        toast.info(`You have ${d.usersAllTokens.length} token(s) in other queues`, {
          position: "top-center",
        });
      } else {
        setActiveToken({
          tokenNumber: null,
          hasToken: false,
          usersAllTokens: [],
        });
      }

      setIsMobileSubmitted(true);
    } catch (err) {
      console.error('Failed to check token:', err);
      toast.error('Failed to check your token status');
      setActiveToken(null);
      setIsMobileSubmitted(true);
    } finally {
      setCheckingToken(false);
    }
  };

  const joinQueue = async () => {
    if (!firstName.trim()) return toast.warn('Please enter your first name');

    setGettingToken(true);
    try {
      const res = await axios.post(`${backendUrl}/api/token/generate-token-web`, {
        queueId: parseInt(queueId),
        categoryId: parseInt(categoryId),
        firstName: firstName.trim(),
        lastName: lastName.trim() || 'User',
        identifier: mobile,
      });

      const tokenData = res.data.data || res.data;


      toast.success(`Token #${tokenData.tokenNumber}Generated Successfully! Kindly check your ${mobile.includes('@') ? 'email' : 'SMS'}`, {
        position: "top-center",
        autoClose: 6000,
      });

      setActiveToken({
        tokenNumber: tokenData.tokenNumber,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      });

      setFirstName('');
      setLastName('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to get token');
    } finally {
      setGettingToken(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-card">
          <div className="spinner"></div>
          <p>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
     <div className="card">
        {/* Close Button */}
        {mobile && (
          <button
            onClick={() => {
              setMobile('');
              setFirstName('');
              setLastName('');
              setActiveToken(null);
              setIsMobileSubmitted(false)
            }}
            className="close-btn-card"
            aria-label="Back to mobile number"
          >
            ×
          </button>
        )}

        <h1 className="info">
          {queue?.name || 'Join Queue'} - {queue?.businessName}
        </h1>

        {/* Step 1: Ask Mobile */}
        {!isMobileSubmitted ? (
          <div className="form">
            <h3>Enter Mobile Number Or Email</h3>
            <p style={{ color: '#555', fontSize: '14px' }}>
              We will check if you already have a token
            </p>
            <input
              type="text"
              placeholder="9876543210 OR abc@gmail.com"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              // maxLength={10}
              autoFocus
            />
           <button
              onClick={handleMobileSubmit}
              disabled={!mobile.length || checkingToken}
              className="btn primary"
              style={{ marginTop: '20px' }}
            >
              {checkingToken ? 'Checking...' : 'Continue'}
            </button>
          </div>

        ) : checkingToken ? (
          <div className="form">
            <p>Checking your token status...</p>
            <div className="spinner" style={{ margin: '20px auto' }}></div>
          </div>
        ) : (
          /* ====== TOKEN EXISTS OR HISTORY EXISTS ====== */
          <div className="history">
            {/* Main Active Token in Current Queue */}
            {activeToken?.tokenNumber ? (
              <>
                <h3>Your Token is Ready!</h3>
                <div className="token-display main-token">
                  <div className="token-number">#{activeToken.tokenNumber}</div>
                  <div className="token-time">
                    {new Date(activeToken.createdAt).toLocaleString('en-IN')}
                  </div>
                  <div className="token-status highlight">Waiting in Queue</div>
                </div>
              </>
            ) : (
              <h3>You can get a new token</h3>
            )}
            {/* Warning Message */}
            {activeToken?.tokenNumber && (
              <p style={{ color: '#d32f2f', margin: '20px 0', fontWeight: '500' }}>
                Please wait for your turn. Do not generate duplicate token.
              </p>
            )}

            {/* Button */}
            <button
              onClick={() => {
                setIsMobileSubmitted(false);
                setMobile('');
                setActiveToken(null);
                setFirstName('');
                setLastName('');
              }}
              className="btn secondary"
              style={{ marginTop: '10px' }}
            >
              use get another token
            </button>
            {/* Step 2: No Token → Ask Name & Generate */}
            {!activeToken?.tokenNumber && (
              <div className="form">
                <h3>Enter Your Name</h3>
                <input
                  type="text"
                  placeholder="First Name *"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                />
                <input
                  type="text"
                  placeholder="Last Name (optional)"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="tel"
                  value={mobile}
                  readOnly
                  style={{ background: '#f0f0f0' }}
                />
                <button
                  onClick={joinQueue}
                  disabled={gettingToken || !firstName.trim()}
                  className="btn primary"
                >
                  {gettingToken ? 'Please wait...' : 'Join Queue'}
                </button>
              </div>
            )}
            {/* All Other Tokens from Same Mobile (usersAllTokens) */}
            {activeToken?.usersAllTokens && activeToken.usersAllTokens.length > 0 && (
              <div className="other-tokens-section">
                <h4 style={{ textAlign: 'center' }}>Your Tokens in Other Queues</h4>
                <div className="tokens-grid">
                  {activeToken.usersAllTokens.map((token) => (
                    <div
                      key={token.id}
                      className={`token-card ${token.queueId === parseInt(queueId) ? 'current-queue' : ''
                        }`}
                    >
                      <div className="token-header">
                        <span className="token-num">#{token.tokenNumber}</span>

                      </div>
                      <div className="queue-name">
                        {token.queue?.name || 'Unknown Queue'}
                      </div>
                      <div className="token-date">
                        {new Date(token.createdAt).toLocaleDateString('en-IN')}
                      </div>
                      <div className="token-date">
                        {new Date(token.createdAt).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                      <span className={`status-badge ${token.status.toLowerCase()}`}>
                        {token.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}


          </div>
        )}


      </div>
    </div>
  );
};

export default QueueForm;