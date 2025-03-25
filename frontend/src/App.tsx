import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import FacebookConnect from './components/FacebookConnect';
import FacebookCallback from './components/FacebookCallback';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Social Media Manager</h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/connect/facebook/callback" element={<FacebookCallback />} />
            <Route path="/" element={
              <section className="connect-section" role="region" aria-labelledby="connect-section-title">
                <h2 id="connect-section-title">Connect Your Accounts</h2>
                <div className="connect-options">
                  <FacebookConnect />
                </div>
              </section>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;