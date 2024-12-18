import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Globe, Heart } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../translations';
import { useAuth } from '../contexts/AuthContext';
import UserMenu from './UserMenu';

interface NavbarProps {
  theme: Theme;
  language: Language;
  onThemeChange: (theme: Theme) => void;
  onLanguageChange: (lang: Language) => void;
  onAuth: () => void;
  onDonate: () => void;
  onHome: () => void;
  onProfile: () => void;
  onHistory: () => void;
}

export default function Navbar({
  theme,
  language,
  onThemeChange,
  onLanguageChange,
  onAuth,
  onDonate,
  onHome,
  onProfile,
  onHistory
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const { isAuthenticated } = useAuth();
  const t = translations[language];

  const languages = {
    tr: 'Türkçe',
    en: 'English',
    hy: 'Հայերէն',
  };

  const scrollToSection = (sectionId: string) => {
    onHome();
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setIsOpen(false);
  };

  const handleLanguageChange = (lang: Language) => {
    onLanguageChange(lang);
    setShowLanguages(false);
  };

  const handleAuthClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAuth();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={() => {
                onHome();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xl font-bold text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              {t.navbar.title}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => scrollToSection('about')} className="nav-link">{t.navbar.about}</button>
            <button onClick={() => scrollToSection('funeral-search')} className="nav-link">{t.navbar.funerals}</button>
            <button onClick={() => scrollToSection('news')} className="nav-link">{t.navbar.news}</button>
            <button onClick={() => scrollToSection('events')} className="nav-link">{t.navbar.events}</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">{t.navbar.contact}</button>

            <button
              onClick={() => {
                onDonate();
                setIsOpen(false);
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center"
            >
              <Heart className="w-4 h-4 mr-2" />
              {t.navbar.donate}
            </button>

            <button onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="relative">
              <button 
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center space-x-1 nav-link"
              >
                <Globe className="w-5 h-5" />
                <span>{languages[language]}</span>
              </button>

              {showLanguages && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {Object.entries(languages).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => handleLanguageChange(code as Language)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <UserMenu
                language={language}
                onProfileClick={onProfile}
                onHistoryClick={onHistory}
              />
            ) : (
              <button 
                onClick={handleAuthClick}
                className="nav-link"
              >
                {t.navbar.login}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-2">
            <button onClick={() => scrollToSection('about')} 
              className="block w-full text-left py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400">
              {t.navbar.about}
            </button>
            <button onClick={() => scrollToSection('funeral-search')} 
              className="block w-full text-left py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400">
              {t.navbar.funerals}
            </button>
            <button onClick={() => scrollToSection('news')} 
              className="block w-full text-left py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400">
              {t.navbar.news}
            </button>
            <button onClick={() => scrollToSection('events')} 
              className="block w-full text-left py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400">
              {t.navbar.events}
            </button>
            <button onClick={() => scrollToSection('contact')} 
              className="block w-full text-left py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400">
              {t.navbar.contact}
            </button>

            {/* Centered Donate Button */}
            <div className="py-2 flex justify-center">
              <button
                onClick={() => {
                  onDonate();
                  setIsOpen(false);
                }}
                className="w-full max-w-xs px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center"
              >
                <Heart className="w-4 h-4 mr-2" />
                {t.navbar.donate}
              </button>
            </div>

            <div className="py-2 border-t border-gray-200 dark:border-gray-700">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      onProfile();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
                  >
                    {t.profile.title}
                  </button>
                  <button
                    onClick={() => {
                      onHistory();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
                  >
                    {t.donations.history}
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleAuthClick}
                  className="block w-full text-left py-2 text-base font-bold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
                >
                  {t.navbar.login}
                </button>
              )}
            </div>

            <div className="py-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <button onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center py-2 text-base font-medium text-gray-700 dark:text-gray-200">
                  {theme === 'dark' ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </div>

            <div className="py-2 border-t border-gray-200 dark:border-gray-700">
              <div className="text-base font-medium text-gray-700 dark:text-gray-200 mb-2">
                {t.navbar.selectLanguage}
              </div>
              {Object.entries(languages).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => {
                    handleLanguageChange(code as Language);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}