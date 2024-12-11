import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { News } from '../types';

const latestNews: News[] = [
  {
    id: '1',
    title: 'Surp Pırgiç Hastanesi\'nde Yeni Sağlık Hizmetleri',
    content: 'Surp Pırgiç Ermeni Hastanesi, modern tıbbi cihazlarla donatılmış yeni bölümlerini hizmete açtı. Hastane yönetimi, topluma daha iyi hizmet verebilmek için teknolojik altyapısını güçlendirmeye devam ediyor.',
    date: '2024-03-15',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Surp Haç Tıbrevank Lisesi\'nden Uluslararası Başarı',
    content: 'Özel Tıbrevank Ermeni Lisesi öğrencileri, uluslararası bilim olimpiyatlarında önemli başarılar elde etti. Matematik ve fizik dallarında altın madalya kazanan öğrenciler, okullarını gururlandırdı.',
    date: '2024-03-10',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: 'Karagözyan Vakfı\'ndan Eğitim Bursu Programı',
    content: 'Karagözyan Vakfı, yeni eğitim-öğretim yılı için kapsamlı bir burs programı başlattı. Program, başarılı öğrencilere eğitim hayatları boyunca destek sağlamayı hedefliyor.',
    date: '2024-03-08',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    title: 'Ermeni Kültür Mirası Dijital Arşiv Projesi',
    content: 'İstanbul\'daki Ermeni kültür mirasının dijital ortama aktarılması projesi başladı. Proje kapsamında tarihi belgeler, fotoğraflar ve el yazmaları dijitalleştirilerek gelecek nesillere aktarılacak.',
    date: '2024-03-05',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80',
  }
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