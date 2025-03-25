import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface FacebookAccount {
  id: string;
  name: string;
  platform: string;
  accessToken: string;
}

const FacebookCallback: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [account, setAccount] = useState<FacebookAccount | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const connectFacebookAccount = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (!code) {
        setStatus('error');
        setError('No authorization code provided');
        return;
      }

      try {
        const response = await axios.post('/api/accounts/connect/facebook', { code });
        setAccount(response.data);
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Failed to connect Facebook account');
        console.error('Error connecting Facebook account:', err);
      }
    };

    connectFacebookAccount();
  }, []);

  return (
    <div className="facebook-callback-container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      {status === 'loading' && (
        <div style={{ textAlign: 'center', color: '#666' }}>
          <p>Connecting your Facebook account...</p>
        </div>
      )}

      {status === 'success' && account && (
        <div
          style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '15px',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0' }}>Successfully Connected!</h3>
          <p style={{ margin: '0' }}>Your Facebook account "{account.name}" has been connected.</p>
        </div>
      )}

      {status === 'error' && (
        <div
          style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '15px',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0' }}>Connection Failed</h3>
          <p style={{ margin: '0' }}>{error || 'An unknown error occurred'}</p>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            transition: 'background-color 0.2s',
          }}
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default FacebookCallback;
