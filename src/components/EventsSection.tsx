import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import type { Event } from '../types';

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Kültür ve Sanat Festivali',
    date: '2024-04-15',
    location: 'İstanbul Kültür Merkezi',
    description: 'Geleneksel el sanatları, müzik ve dans gösterileri',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Topluluk Buluşması',
    date: '2024-04-20',
    location: 'Vakıf Merkezi',
    description: 'Aylık topluluk buluşması ve sosyal etkinlik',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
  },
];

export default function EventsSection() {
  return (
    <section id="events" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Etkinlikler
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {event.title}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString('tr-TR')}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {event.description}
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
                  Detaylar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white px-6 py-3 rounded-md transition-colors">
            Tüm Etkinlikleri Gör
          </button>
        </div>
      </div>
    </section>
  );
}