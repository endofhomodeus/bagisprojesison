import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Heart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface FuneralData {
  id: string;
  name: string;
  date: string;
  church: string;
  time: string;
}

const funeralData: FuneralData[] = [
  {
    id: '1',
    name: 'Hovhannes Şahinyan',
    date: '2024-11-01',
    church: 'Taksim Kilisesi',
    time: '14:00'
  },
  {
    id: '2',
    name: 'Hayko Bağdat',
    date: '2024-11-02',
    church: 'Surp Takavor Kilisesi',
    time: '11:00'
  },
  {
    id: '3',
    name: 'Nayat Karaköse',
    date: '2024-11-03',
    church: 'Surp Asdvadzadzin Kilisesi',
    time: '13:00'
  }
];

interface FuneralSearchProps {
  language: Language;
  onDonate: (name?: string) => void;
}

export default function FuneralSearch({ language, onDonate }: FuneralSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredFunerals, setFilteredFunerals] = useState<FuneralData[]>([]);
  const [suggestions, setSuggestions] = useState<FuneralData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  useEffect(() => {
    if (searchQuery) {
      const filtered = funeralData.filter(funeral =>
        funeral.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else if (selectedDate) {
      const filtered = funeralData.filter(funeral =>
        funeral.date === selectedDate
      );
      setFilteredFunerals(filtered);
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      setFilteredFunerals([]);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (funeral: FuneralData) => {
    setSearchQuery(funeral.name);
    setFilteredFunerals([funeral]);
    setShowSuggestions(false);
  };

  const handleDonateClick = (name?: string) => {
    onDonate(name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="funeral-search" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {t.funerals.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.funerals.searchByName}
              </label>
              <div className="relative" ref={suggestionsRef}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedDate('');
                  }}
                  placeholder={t.funerals.searchPlaceholder}
                  className="input-field pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-md shadow-lg">
                    {suggestions.map((funeral) => (
                      <button
                        key={funeral.id}
                        onClick={() => handleSuggestionClick(funeral)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                      >
                        {funeral.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.funerals.searchByDate}
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSearchQuery('');
                }}
                className="input-field"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">
              {t.funerals.searchResults}
            </h3>
            
            {filteredFunerals.length > 0 ? (
              <div className="space-y-6">
                {filteredFunerals.map(funeral => (
                  <div key={funeral.id} className="border-b border-gray-200 dark:border-gray-600 pb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {funeral.name}
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(funeral.date).toLocaleDateString(language === 'tr' ? 'tr-TR' : language === 'en' ? 'en-US' : 'hy-AM')} - {funeral.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {funeral.church}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDonateClick(funeral.name)}
                      className="mt-4 flex items-center justify-center space-x-2 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span>{t.navbar.donate}</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                {t.funerals.noResults}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}