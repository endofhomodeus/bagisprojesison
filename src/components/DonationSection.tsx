import React, { useState } from 'react';
import { CreditCard, DollarSign, Euro, PoundSterling, Banknote } from 'lucide-react';
import type { Foundation } from '../types';

const foundations: Foundation[] = [
  {
    id: '1',
    name: 'Eğitim Fonu',
    description: 'Ermeni okullarına ve eğitim projelerine destek',
  },
  {
    id: '2',
    name: 'Kültür Mirası Fonu',
    description: 'Tarihi yapıların restorasyonu ve kültürel etkinlikler',
  },
  {
    id: '3',
    name: 'Sosyal Yardım Fonu',
    description: 'İhtiyaç sahiplerine destek ve toplumsal dayanışma',
  },
];

const currencies = [
  { symbol: 'TRY', icon: Banknote, label: 'TL' },
  { symbol: 'USD', icon: DollarSign, label: 'USD' },
  { symbol: 'EUR', icon: Euro, label: 'EUR' },
  { symbol: 'GBP', icon: PoundSterling, label: 'GBP' },
];

const predefinedAmounts = [50, 100, 250, 500, 1000];

export default function DonationSection() {
  const [selectedFoundation, setSelectedFoundation] = useState<string>('');
  const [amount, setAmount] = useState<number>(50);
  const [currency, setCurrency] = useState<string>('TRY');
  const [customAmount, setCustomAmount] = useState<string>('');

  return (
    <section id="donation" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Bağış Yap
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Bağış Miktarı</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {currencies.map(({ symbol, icon: Icon, label }) => (
                  <button
                    key={symbol}
                    onClick={() => setCurrency(symbol)}
                    className={`flex items-center justify-center p-3 rounded-md border ${
                      currency === symbol
                        ? 'border-red-500 bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-5 gap-4 mb-6">
                {predefinedAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className={`p-3 rounded-md border ${
                      amount === preset
                        ? 'border-red-500 bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Diğer Miktar
                </label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount(Number(e.target.value));
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  placeholder="Miktar girin"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Vakıf Seçimi</h3>
              <div className="space-y-4">
                {foundations.map((foundation) => (
                  <div
                    key={foundation.id}
                    onClick={() => setSelectedFoundation(foundation.id)}
                    className={`p-4 rounded-md border cursor-pointer ${
                      selectedFoundation === foundation.id
                        ? 'border-red-500 bg-red-50 dark:bg-red-900'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <h4 className="font-medium dark:text-white">{foundation.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {foundation.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md sticky top-24">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Bağış Özeti</h3>
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">Seçilen Miktar</p>
                  <p className="text-2xl font-bold dark:text-white">
                    {amount} {currency}
                  </p>
                </div>
                {selectedFoundation && (
                  <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300">Seçilen Vakıf</p>
                    <p className="font-medium dark:text-white">
                      {foundations.find(f => f.id === selectedFoundation)?.name}
                    </p>
                  </div>
                )}
                <button
                  className={`w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors ${
                    !selectedFoundation || !amount ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={!selectedFoundation || !amount}
                >
                  Bağışı Tamamla
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}