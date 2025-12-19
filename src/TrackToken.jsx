import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TrackToken = () => {
    const { tokenId } = useParams();
    console.log(tokenId, "tokenid");
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL

    console.log(backendUrl);


    const fetchTokenStatus = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${backendUrl}/api/token/tokenstatus/${tokenId}`
            );
            setData(response.data.data);
            setError(null);

        } catch (err) {
            setError(err.response?.data?.message || 'Invalid or expired token link');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (tokenId) {
        fetchTokenStatus();
          const interval = setInterval(fetchTokenStatus, 30000);
          return () => clearInterval(interval);
        }
    }, [tokenId]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p >Loading your token status...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-content">
                    <h1>Oops!</h1>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="card">
                <h1>Your Token Status</h1>
                {/* Status Message */}
                <div className={`status-message ${data?.tokensAhead === 0 ? 'your-turn' : data?.tokensAhead <= 2 ? 'almost' : ''}`}>
                    {data?.statusMessage}
                </div>
                {/* Header */}
                <div className="header">

                    <h2>{data?.queueName}</h2>
                    <p className="category">{data?.categoryName}</p>
                </div>

                {/* Token Number */}
                {/* <div className="token-display">
          <p>Your Token Number</p>
          <div className="token-number">{data?.tokenNumber}</div>
        </div> */}

                {/* Stats */}
                <div className="stats-grid">
                    <div className="stat-box serving">
                        <p>Your Token Number</p>
                        <div className="big-number">{data?.tokenNumber || '-'}</div>
                    </div>
                    <div className="stat-box ahead">
                        <p>Ahead of You</p>
                        <div className="big-number">{data?.tokensAhead}</div>
                    </div>
                </div>

                {/* Time Slot */}
                <div className="time-slot">
                    <p>Today's Timing</p>
                    <div className="time">{data?.timeSlot}</div>
                </div>




            </div>
        </div>
    );
};

export default TrackToken;