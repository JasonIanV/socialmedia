import request from 'supertest';
import express from 'express';
import app from '../index';

describe('API Endpoints', () => {
  describe('GET /api/health', () => {
    it('should return healthy status', async () => {
      const response = await request(app).get('/api/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'Healthy' });
    });
  });

  describe('GET /api/accounts/facebook/oauth-url', () => {
    it('should return a valid Facebook OAuth URL', async () => {
      const response = await request(app).get('/api/accounts/facebook/oauth-url');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('url');
      expect(response.body.url).toMatch(/^https:\/\/facebook\.com\/oauth/);
      expect(response.body.url).toMatch(/client_id=\d+/);
      expect(response.body.url).toMatch(/redirect_uri=/);
      expect(response.body.url).toMatch(/scope=/);
    });
  });

  describe('POST /api/accounts/connect/facebook', () => {
    it('should reject invalid auth code', async () => {
      const response = await request(app)
        .post('/api/accounts/connect/facebook')
        .send({ authCode: '' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        error: 'Invalid or missing auth code'
      });
    });

    it('should connect Facebook account with valid auth code', async () => {
      const response = await request(app)
        .post('/api/accounts/connect/facebook')
        .send({ authCode: 'valid_auth_code' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        account: expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          platform: 'facebook'
        })
      });
    });

    it('should handle server errors gracefully', async () => {
      // Simulate a server error by passing an auth code that triggers an error
      const response = await request(app)
        .post('/api/accounts/connect/facebook')
        .send({ authCode: 'error_triggering_code' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        success: false,
        error: 'Failed to connect Facebook account'
      });
    });
  });
});