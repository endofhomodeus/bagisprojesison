import React, { useState } from 'react';
import { Calendar as CalendarIcon, Search, MapPin, Clock } from 'lucide-react';
import type { Funeral } from '../types';

const funerals: Funeral[] = [
  {
    id: '1',
    deceasedName: 'Örnek İsim 1',
    date: new Date('2024-03-20'),
    location: 'Surp Takavor Kilisesi',
    details: 'Cenaze töreni saat 14:00\'de başlayacaktır.',
  },
  {
    id: '2',
    deceasedName: 'Örnek İsim 2',
    date: new Date('2024-03-21'),
    location: 'Surp Asdvadzadzin Kilisesi',
    details: 'Cenaze töreni saat 11:00\'de başlayacaktır.',
  },
];

export default function FuneralCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFunerals = funerals.filter(funeral => 
    funeral.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <section id="funeral-calendar" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Cenaze Takvimi
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tarih Seçin
              </label>
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                İsim Ara
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="İsim ile ara..."
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 pl-10 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">
              {selectedDate.toLocaleDateString('tr-TR')} Tarihli Cenazeler
            </h3>
            
            {filteredFunerals.length > 0 ? (
              <div className="space-y-4">
                {filteredFunerals.map(funeral => (
                  <div key={funeral.id} className="border-b border-gray-200 dark:border-gray-600 pb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {funeral.deceasedName}
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {funeral.date.toLocaleTimeString('tr-TR')}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {funeral.location}
                      </div>
                      <p>{funeral.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                Seçilen tarihte cenaze bulunmamaktadır.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}