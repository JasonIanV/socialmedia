import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import FacebookCallback from '../FacebookCallback';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock window.location
const mockLocation = new URL('http://localhost:3000/connect/facebook/callback?code=test_code');
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('FacebookCallback', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    render(<FacebookCallback />);
    expect(screen.getByText('Connecting your Facebook account...')).toBeInTheDocument();
  });

  it('handles successful Facebook account connection', async () => {
    const mockAccount = {
      id: 'fb_123',
      name: 'Test Account',
      platform: 'facebook',
      accessToken: 'mock_token',
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockAccount });

    await act(async () => {
      render(<FacebookCallback />);
    });

    await waitFor(() => {
      expect(screen.getByText('Successfully Connected!')).toBeInTheDocument();
      expect(screen.getByText(`Your Facebook account "${mockAccount.name}" has been connected.`)).toBeInTheDocument();
    });

    expect(mockedAxios.post).toHaveBeenCalledWith('/api/accounts/connect/facebook', { code: 'test_code' });
  });

  it('handles missing authorization code', async () => {
    // Update window.location to remove code parameter
    Object.defineProperty(window, 'location', {
      value: new URL('http://localhost:3000/connect/facebook/callback'),
      writable: true,
    });

    await act(async () => {
      render(<FacebookCallback />);
    });

    await waitFor(() => {
      expect(screen.getByText('Connection Failed')).toBeInTheDocument();
      expect(screen.getByText('No authorization code provided')).toBeInTheDocument();
    });

    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it('handles API error response', async () => {
    // Make sure we're using the URL with code parameter
    Object.defineProperty(window, 'location', {
      value: new URL('http://localhost:3000/connect/facebook/callback?code=test_code'),
      writable: true,
    });
    
    const errorMessage = 'Invalid authorization code';
    mockedAxios.post.mockRejectedValueOnce(new Error(errorMessage));

    render(<FacebookCallback />);

    await waitFor(() => {
      expect(screen.getByText('Connection Failed')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    expect(mockedAxios.post).toHaveBeenCalledWith('/api/accounts/connect/facebook', { code: 'test_code' });
  });

  it('renders return to home link', () => {
    render(<FacebookCallback />);
    const homeLink = screen.getByText('Return to Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute('href')).toBe('/');
  });
});