import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrintingService from './components/PrintingService';
import PrintSubmission from './components/PrintSubmission';
import CanteenService from './components/CanteenService';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import { Printer, Coffee, CreditCard, Bell } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [activeService, setActiveService] = useState('printing');
  const [balance, setBalance] = useState(50.00);
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const notifications = [
        "🎉 New discount: 20% off on all prints today!",
        "🍔 Try our new campus special burger",
        "📢 Peak hours: Expect 10-15 mins print queue"
      ];
      
      const interval = setInterval(() => {
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        setNotification(randomNotification);
        setTimeout(() => setNotification(null), 5000);
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogin = (email, password) => {
    setUser({ name: email.split('@')[0], email });
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleSignup = (email, password, name) => {
    setUser({ name, email });
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage 
          onLogin={() => {
            setAuthMode('login');
            setShowAuthModal(true);
          }}
          onSignup={() => {
            setAuthMode('signup');
            setShowAuthModal(true);
          }}
        />
        {showAuthModal && (
          <AuthModal
            mode={authMode}
            onClose={() => setShowAuthModal(false)}
            onLogin={handleLogin}
            onSignup={handleSignup}
          />
        )}
      </>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar user={user} onLogout={handleLogout} />
        
        {notification && (
          <div className="fixed top-20 right-4 max-w-md transform transition-all duration-500 ease-in-out animate-slide-in">
            <div className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-blue-500">
              <p className="text-lg text-gray-700">{notification}</p>
            </div>
          </div>
        )}
        
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/printing" element={<PrintingService />} />
            <Route path="/canteen" element={<CanteenService />} />
            <Route path="/printSubmission" element={<PrintSubmission />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
