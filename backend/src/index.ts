import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import facebookIntegrator from './services/facebook';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Healthy' });
});

// Facebook OAuth URL endpoint
app.get('/api/accounts/facebook/oauth-url', (req, res) => {
  console.log('Facebook OAuth URL endpoint called');
  
  // Simulate a Facebook OAuth URL
  const mockOAuthUrl = 'https://facebook.com/oauth?client_id=123456789&redirect_uri=http://localhost:3000/auth/facebook/callback&scope=email,pages_show_list,pages_read_engagement,pages_manage_posts';
  
  res.status(200).json({ url: mockOAuthUrl });
});

// Facebook connection endpoint
app.post('/api/accounts/connect/facebook', async (req, res) => {
  const { authCode } = req.body;

  // Validate auth code
  if (!authCode || typeof authCode !== 'string' || authCode.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid or missing auth code'
    });
  }

  try {
    // Exchange auth code for account info
    const account = await facebookIntegrator.exchangeAuthCode(authCode);

    res.status(200).json({
      success: true,
      account: {
        id: account.id,
        name: account.name,
        platform: account.platform
      }
    });
  } catch (error) {
    console.error('Error connecting Facebook account:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to connect Facebook account'
    });
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;