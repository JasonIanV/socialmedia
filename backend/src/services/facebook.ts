// Simulated Facebook integration service

interface FacebookPageInfo {
  account_name: string;
  page_id: string;
}

interface FacebookAccount {
  id: string;
  name: string;
  accessToken: string;
  platform: 'facebook';
  pageInfo?: FacebookPageInfo;
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
    const pageInfo = await this.getFacebookPageInfo(mockAccessToken);
    const account: FacebookAccount = {
      id: pageInfo.page_id,
      name: pageInfo.account_name,
      accessToken: encryptToken(mockAccessToken),
      platform: 'facebook',
      pageInfo
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

  // Get Facebook page information using access token
  async getFacebookPageInfo(accessToken: string): Promise<FacebookPageInfo> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!accessToken.startsWith('fb_token_')) {
      throw new Error('Invalid access token');
    }

    // Simulate Facebook API response
    return {
      account_name: 'Test Facebook Page',
      page_id: `fb_page_${Date.now()}`
    };
  }
}

export default new FacebookIntegrator();