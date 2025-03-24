import React from 'react';
import './App.css';
import FacebookConnect from './components/FacebookConnect';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Social Media Manager</h1>
      </header>
      <main className="app-main">
        <section className="connect-section">
          <h2>Connect Your Accounts</h2>
          <div className="connect-options">
            <FacebookConnect />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;