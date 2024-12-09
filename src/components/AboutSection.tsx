import React from 'react';
import { Building2, Users, Target } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Hakkımızda
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            2024'den beri Türkiye'deki Ermeni toplumuna hizmet veriyoruz
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-red-600 dark:text-red-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Tarihimiz</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yüzyıllardır süregelen kültürel mirasımızı korumak ve yaşatmak için çalışıyoruz.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-red-600 dark:text-red-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Misyonumuz</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Toplumumuzun kültürel, sosyal ve manevi ihtiyaçlarını karşılamak için çalışıyoruz.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-red-600 dark:text-red-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Vizyonumuz</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Gelecek nesillere güçlü bir topluluk ve zengin bir kültürel miras bırakmak.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}