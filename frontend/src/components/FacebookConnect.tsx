import React, { useState } from 'react';
import axios from 'axios';

const FacebookConnect: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/accounts/facebook/oauth-url');
      window.location.href = response.data.url;
    } catch (err) {
      setError('Failed to get Facebook OAuth URL. Please try again.');
      console.error('Error fetching OAuth URL:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="facebook-connect-container">
      <button
        className="facebook-connect-button"
        onClick={handleConnect}
        disabled={loading}
        style={{
          backgroundColor: '#1877F2',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? (
          'Connecting...'
        ) : (
          <>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Connect with Facebook
          </>
        )}
      </button>
      {error && (
        <div
          style={{
            color: '#dc3545',
            marginTop: '8px',
            fontSize: '14px',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default FacebookConnect;