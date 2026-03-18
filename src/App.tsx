import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureCards from './components/FeatureCards';
import GoalSection from './components/GoalSection';
import Footer from './components/Footer';
import AptitudeQuiz from './components/AptitudeQuiz';
import CollegeDirectory from './components/CollegeDirectory';
import CareerMapping from './components/CareerMapping';
import TimelineTracker from './components/TimelineTracker';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import EbooksMarketplace from './components/EbooksMarketplace';
import Chatbot from './components/Chatbot';
import AIChat from './components/AIChat';

function AppContent() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'login':
        return (
          <Login
            onBack={() => setActiveSection('home')}
            onSwitchToSignup={() => setActiveSection('signup')}
          />
        );
      case 'signup':
        return (
          <Signup
            onBack={() => setActiveSection('home')}
            onSwitchToLogin={() => setActiveSection('login')}
          />
        );
      case 'aptitude':
        if (!user) {
          setActiveSection('login');
          return null;
        }
        return <AptitudeQuiz onBack={() => setActiveSection('home')} />;
      case 'colleges':
        if (!user) {
          setActiveSection('login');
          return null;
        }
        return <CollegeDirectory onBack={() => setActiveSection('home')} />;
      case 'career':
        if (!user) {
          setActiveSection('login');
          return null;
        }
        return <CareerMapping onBack={() => setActiveSection('home')} />;
      case 'timeline':
        if (!user) {
          setActiveSection('login');
          return null;
        }
        return <TimelineTracker onBack={() => setActiveSection('home')} />;
      case 'dashboard':
        if (!user) {
          setActiveSection('login');
          return null;
        }
        return <Dashboard onNavigate={setActiveSection} />;
      case 'ebooks':
        if (!user) {
          setActiveSection('login');
          return null;
        }
        return <EbooksMarketplace onBack={() => setActiveSection('home')} />;
      case 'aichat':
        if (!user) {
          setActiveSection('login');
          return null;
        }
        return <AIChat onBack={() => setActiveSection('home')} />;
      default:
        return user ? (
          <Dashboard onNavigate={setActiveSection} />
        ) : (
          <>
            <Hero onGetStarted={() => setActiveSection('login')} />
            <FeatureCards onNavigate={setActiveSection} />
            <GoalSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-teal-50">
      <Header activeSection={activeSection} onNavigate={setActiveSection} />
      <main>{renderSection()}</main>
      <Footer />
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
