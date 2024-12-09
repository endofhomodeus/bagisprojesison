import React from 'react';
import { Download, Calendar, Building2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface DonationHistoryPageProps {
  language: Language;
}

// Example donation history data
const donationHistory = [
  {
    id: '1',
    date: '2024-03-15',
    amount: 1000,
    currency: 'TRY',
    foundation: 'Surp Pırgiç Ermeni Hastanesi Vakfı',
    receiptUrl: '#'
  },
  {
    id: '2',
    date: '2024-02-28',
    amount: 500,
    currency: 'TRY',
    foundation: 'Karagözyan Ermeni Yetimhanesi Vakfı',
    receiptUrl: '#'
  },
  {
    id: '3',
    date: '2024-01-15',
    amount: 2500,
    currency: 'TRY',
    foundation: 'Surp Agop Ermeni Katolik Hastanesi Vakfı',
    receiptUrl: '#'
  }
];

export default function DonationHistoryPage({ language }: DonationHistoryPageProps) {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {t.donations.history}
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.donations.date}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.donations.foundation}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.donations.amount}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.donations.receipt}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {donationHistory.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(donation.date).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                        {donation.foundation}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {donation.amount.toLocaleString()} {donation.currency}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href={donation.receiptUrl}
                        className="text-red-600 hover:text-red-700 flex items-center justify-end space-x-1"
                      >
                        <Download className="w-4 h-4" />
                        <span>{t.donations.downloadReceipt}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}