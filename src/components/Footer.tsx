import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Vakıflar Topluluğu</h3>
            <p className="text-gray-400">
              Kültürel mirasımızı korumak ve geliştirmek için çalışıyoruz.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white">Hakkımızda</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-white">Etkinlikler</a></li>
              <li><a href="#news" className="text-gray-400 hover:text-white">Haberler</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white">İletişim</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-2 text-gray-400">
              <li>İstanbul, Türkiye</li>
              <li>+90 212 XXX XX XX</li>
              <li>info@vakiflartoplulugu.org</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Bizi Takip Edin</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Aras Atakligan & Aren Koş. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}