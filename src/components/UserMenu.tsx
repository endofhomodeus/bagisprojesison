import React, { useState, useRef, useEffect } from 'react';
import { User, History, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Language } from '../types';
import { translations } from '../translations';

interface UserMenuProps {
  language: Language;
  onProfileClick: () => void;
  onHistoryClick: () => void;
}

export default function UserMenu({ language, onProfileClick, onHistoryClick }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const t = translations[language];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuItemClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
      >
        <User className="w-5 h-5" />
        <span>{user?.username}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={() => handleMenuItemClick(onProfileClick)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Settings className="w-4 h-4 mr-2" />
              {t.profile.title}
            </button>
            <button
              onClick={() => handleMenuItemClick(onHistoryClick)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <History className="w-4 h-4 mr-2" />
              {t.donations.history}
            </button>
            <button
              onClick={() => handleMenuItemClick(logout)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t.auth.logout}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}