import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('renders the application header with correct title', () => {
    render(<App />);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent('Social Media Manager');
  });

  it('renders the connect section with correct heading', () => {
    render(<App />);
    
    const connectHeading = screen.getByRole('heading', { level: 2 });
    expect(connectHeading).toHaveTextContent('Connect Your Accounts');
  });

  it('renders the FacebookConnect component', () => {
    render(<App />);
    
    // Since we know FacebookConnect renders a button with specific text
    const facebookButton = screen.getByRole('button', { name: /connect with facebook/i });
    expect(facebookButton).toBeInTheDocument();
  });

  it('has proper layout structure', () => {
    render(<App />);
    
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveClass('app-main');

    const connectSection = screen.getByRole('region', { name: /connect your accounts/i });
    expect(connectSection).toBeInTheDocument();
    expect(connectSection).toHaveClass('connect-section');
  });
});