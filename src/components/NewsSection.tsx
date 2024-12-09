import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { News } from '../types';

const latestNews: News[] = [
  {
    id: '1',
    title: 'Yeni Kültür Merkezi Açılışı',
    content: 'Topluluğumuz için yeni bir kültür merkezi açılıyor...',
    date: '2024-03-15',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Geleneksel Festival Başlıyor',
    content: 'Bu yılki geleneksel festivalimiz yaklaşıyor...',
    date: '2024-03-10',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80',
  },
];

export default function NewsSection() {
  return (
    <section id="news" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Haberler
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {latestNews.map((news) => (
            <div key={news.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {news.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-300 text-sm mb-4">
                  {new Date(news.date).toLocaleDateString('tr-TR')}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {news.content}
                </p>
                <button className="text-red-600 hover:text-red-700 font-medium flex items-center transition-colors">
                  Devamını Oku
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}