import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import EventsSection from './components/EventsSection';
import NewsSection from './components/NewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import FuneralSearch from './components/FuneralSearch';
import DonationPage from './pages/DonationPage';
import UserProfilePage from './pages/UserProfilePage';
import DonationHistoryPage from './pages/DonationHistoryPage';
import { AuthProvider } from './contexts/AuthContext';
import { Language, Theme } from './types';

type Page = 'home' | 'donation' | 'profile' | 'history';

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('tr');
  const [authModal, setAuthModal] = useState<{ isOpen: boolean }>({
    isOpen: false,
  });
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [donationNote, setDonationNote] = useState<string>('');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleDonate = (name?: string) => {
    setCurrentPage('donation');
    if (name) {
      setDonationNote(`${name} adına`);
    } else {
      setDonationNote('');
    }
  };

  const mainContent = (
    <>
      <Hero language={language} />
      <AboutSection language={language} />
      <FuneralSearch 
        language={language} 
        onDonate={handleDonate}
      />
      <NewsSection language={language} />
      <EventsSection language={language} />
      <ContactSection language={language} />
      <Footer language={language} />
    </>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'donation':
        return <DonationPage language={language} initialNote={donationNote} />;
      case 'profile':
        return <UserProfilePage language={language} />;
      case 'history':
        return <DonationHistoryPage language={language} />;
      default:
        return mainContent;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar
          theme={theme}
          language={language}
          onThemeChange={setTheme}
          onLanguageChange={setLanguage}
          onAuth={() => setAuthModal({ isOpen: true })}
          onDonate={() => handleDonate()}
          onHome={() => setCurrentPage('home')}
          onProfile={() => setCurrentPage('profile')}
          onHistory={() => setCurrentPage('history')}
        />
        {renderPage()}
        {currentPage !== 'home' && <Footer language={language} />}
        <AuthModal
          isOpen={authModal.isOpen}
          onClose={() => setAuthModal({ isOpen: false })}
          language={language}
        />
      </div>
    </AuthProvider>
  );
}

export default App;