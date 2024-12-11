import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import type { Event } from '../types';

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Ermeni Mutfağı Festivali',
    date: '2024-04-15',
    location: 'Beyoğlu Üç Horan Kilisesi Avlusu',
    description: 'Geleneksel Ermeni mutfağının en özel lezzetlerinin sunulacağı festivalde, yöresel yemekler ve tatlılar tadılabilecek, yemek yapım gösterileri izlenebilecek.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Çocuklar İçin Ermenice Yaz Kampı',
    date: '2024-06-20',
    location: 'Kınalıada Ermeni Yetimhanesi',
    description: 'Çocuklara Ermenice öğretmek ve kültürel değerleri aktarmak amacıyla düzenlenen yaz kampı başlıyor. Eğlenceli aktiviteler ve eğitim bir arada.',
    image: 'https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe?auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: 'Klasik Ermeni Müziği Konseri',
    date: '2024-05-10',
    location: 'Surp Levon Ermeni Katolik Kilisesi',
    description: 'Ünlü Ermeni bestecilerin eserlerinden oluşan özel bir repertuar, profesyonel müzisyenler tarafından seslendirilecek.',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    title: 'Ermeni El Sanatları Sergisi',
    date: '2024-04-25',
    location: 'Getronagan Lisesi Sergi Salonu',
    description: 'Geleneksel Ermeni el sanatlarının modern yorumlarını içeren sergi, usta zanaatkarların eserlerini sanatseverlerle buluşturuyor.',
    image: 'https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&q=80',
  }
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