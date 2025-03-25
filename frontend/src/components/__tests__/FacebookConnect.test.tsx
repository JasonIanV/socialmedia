import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import FacebookConnect from '../FacebookConnect';

// Mock axios
jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('FacebookConnect Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Mock console.error to prevent actual error logging during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error after each test
    jest.restoreAllMocks();
  });
  it('renders connect button with correct text and icon', () => {
    render(<FacebookConnect />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Connect with Facebook');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('shows loading state when connecting', async () => {
    mockedAxios.get.mockImplementationOnce(() => new Promise(() => {}));
    
    render(<FacebookConnect />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(button).toHaveTextContent('Connecting...');
    expect(button).toBeDisabled();
  });

  it('redirects to Facebook OAuth URL on successful response', async () => {
    const mockOAuthUrl = 'https://facebook.com/oauth';
    mockedAxios.get.mockResolvedValueOnce({ data: { url: mockOAuthUrl } });
    
    // Mock window.location.href
    const mockLocation = { href: window.location.href };
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true
    });
    
    render(<FacebookConnect />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/accounts/facebook/oauth-url');
      expect(window.location.href).toBe(mockOAuthUrl);
    });
  });

  it('displays error message on API failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
    
    render(<FacebookConnect />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    await waitFor(() => {
      const errorMessage = screen.getByText('Failed to get Facebook OAuth URL. Please try again.');
      expect(errorMessage).toBeInTheDocument();
    });
    
    expect(button).not.toBeDisabled();
  });
});