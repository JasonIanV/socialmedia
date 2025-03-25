import FacebookIntegrator, { resetAccounts } from '../facebook';

beforeEach(() => {
  resetAccounts();
});

describe('FacebookIntegrator', () => {
  let facebookIntegrator = FacebookIntegrator;

  describe('exchangeAuthCode', () => {
    it('should create a new Facebook account with valid auth code', async () => {
      const authCode = 'valid_auth_code';
      const account = await facebookIntegrator.exchangeAuthCode(authCode);

      expect(account).toHaveProperty('id');
      expect(account).toHaveProperty('name');
      expect(account).toHaveProperty('accessToken');
      expect(account.platform).toBe('facebook');
    });

    it('should store the account after creation', async () => {
      const authCode = 'valid_auth_code';
      const account = await facebookIntegrator.exchangeAuthCode(authCode);
      
      const storedAccount = facebookIntegrator.getAccount(account.id);
      expect(storedAccount).toEqual(account);
    });
  });

  describe('getAccount', () => {
    it('should return undefined for non-existent account', () => {
      const account = facebookIntegrator.getAccount('non_existent_id');
      expect(account).toBeUndefined();
    });

    it('should return account for valid ID', async () => {
      const authCode = 'valid_auth_code';
      const createdAccount = await facebookIntegrator.exchangeAuthCode(authCode);
      
      const account = facebookIntegrator.getAccount(createdAccount.id);
      expect(account).toBeDefined();
      expect(account?.id).toBe(createdAccount.id);
    });
  });

  describe('getAllAccounts', () => {
    it('should return empty array when no accounts exist', () => {
      const accounts = facebookIntegrator.getAllAccounts();
      expect(accounts).toEqual([]);
    });

    it('should return all stored accounts', async () => {
      const authCode1 = 'auth_code_1';
      const authCode2 = 'auth_code_2';
      
      const account1 = await facebookIntegrator.exchangeAuthCode(authCode1);
      const account2 = await facebookIntegrator.exchangeAuthCode(authCode2);
      
      const accounts = facebookIntegrator.getAllAccounts();
      expect(accounts).toHaveLength(2);
      expect(accounts).toEqual(expect.arrayContaining([account1, account2]));
    });
  });
})