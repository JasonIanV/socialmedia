// Simulated Facebook integration service

interface FacebookAccount {
  id: string;
  name: string;
  accessToken: string;
  platform: 'facebook';
}

// Simulated in-memory storage
let accounts = new Map<string, FacebookAccount>();

// For testing purposes
export const resetAccounts = () => {
  accounts = new Map<string, FacebookAccount>();
};

// Simulate encryption (in real app, use proper encryption)
const encryptToken = (token: string): string => {
  return `encrypted_${token}`;
};

class FacebookIntegrator {
  // Simulate exchanging auth code for access token and account info
  async exchangeAuthCode(authCode: string): Promise<FacebookAccount> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate error for testing
    if (authCode === 'error_triggering_code') {
      throw new Error('Facebook API error');
    }

    // Simulate Facebook API response
    const mockAccessToken = `fb_token_${Date.now()}`;
    const account: FacebookAccount = {
      id: `fb_${Date.now()}`,
      name: 'Test Facebook Page',
      accessToken: encryptToken(mockAccessToken),
      platform: 'facebook'
    };

    // Store account data
    accounts.set(account.id, account);
    console.log('Stored Facebook account:', { ...account, accessToken: '[REDACTED]' });

    return account;
  }

  // Get stored account by ID
  getAccount(id: string): FacebookAccount | undefined {
    return accounts.get(id);
  }

  // Get all stored accounts
  getAllAccounts(): FacebookAccount[] {
    return Array.from(accounts.values());
  }
}

export default new FacebookIntegrator();