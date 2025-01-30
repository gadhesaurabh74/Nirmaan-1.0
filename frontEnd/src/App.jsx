import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PrintingService from './components/PrintingService';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar user={user} onLogout={handleLogout} />
      
      {notification && (
        <div className="fixed top-20 right-4 max-w-md transform transition-all duration-500 ease-in-out animate-slide-in">
          <div className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-blue-500 flex items-center">
            <Bell className="h-5 w-5 text-blue-500 mr-2" />
            <p className="text-gray-700">{notification}</p>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveService('printing')}
              className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                activeService === 'printing'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Printer className="h-5 w-5 mr-2" />
              Printing Service
            </button>
            <button
              onClick={() => setActiveService('canteen')}
              className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                activeService === 'canteen'
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Coffee className="h-5 w-5 mr-2" />
              Canteen Service
            </button>
          </div>

          <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md">
            <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-gray-700 font-medium">Balance:</span>
            <span className="ml-2 text-green-600 font-bold">${balance.toFixed(2)}</span>
          </div>
        </div>

        <div className="transition-all duration-500 ease-in-out transform">
          {activeService === 'printing' ? <PrintingService /> : <CanteenService />}
        </div>
      </main>
    </div>
  );
}

export default App;