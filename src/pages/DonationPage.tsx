import React, { useState } from 'react';
import { Heart, User, Building2 } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../translations';
import DonationSlider from '../components/DonationSlider';
import { currencies, foundations, type DonorInfo, type CardInfo } from '../constants/donation';

interface DonationPageProps {
  language: Language;
  initialNote?: string;
}

export default function DonationPage({ language, initialNote = '' }: DonationPageProps) {
  const [selectedFoundation, setSelectedFoundation] = useState<string>('');
  const [amount, setAmount] = useState<number>(500);
  const [currency, setCurrency] = useState<string>('TRY');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showCardModal, setShowCardModal] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [donorType, setDonorType] = useState<'individual' | 'corporate'>('individual');
  const [note, setNote] = useState(initialNote);
  const [donorInfo, setDonorInfo] = useState<DonorInfo>({
    type: 'individual',
    email: '',
    phone: '',
    address: ''
  });
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  const handleAmountChange = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value));
    setCustomAmount(value.toString());
    setAmount(value);
  };

  const handleDonorInfoChange = (field: keyof DonorInfo, value: string) => {
    setDonorInfo(prev => ({ ...prev, [field]: value }));
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const isFormValid = () => {
    if (!selectedFoundation || !amount || !agreementAccepted) return false;
    
    if (donorType === 'individual') {
      return donorInfo.firstName && 
             donorInfo.lastName && 
             donorInfo.identityNumber && 
             donorInfo.email && 
             donorInfo.phone && 
             donorInfo.address;
    } else {
      return donorInfo.companyName && 
             donorInfo.taxNumber && 
             donorInfo.email && 
             donorInfo.phone && 
             donorInfo.address;
    }
  };

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={() => setShowCardModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <span className="text-2xl">&times;</span>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
          Ödeme Bilgileri
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button className="btn-primary flex items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Apple_Pay_logo.svg" 
                   alt="Apple Pay" 
                   className="h-8" />
            </button>
            <button className="btn-primary flex items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_Pay_Logo.svg" 
                   alt="Google Pay" 
                   className="h-8" />
            </button>
          </div>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-600">veya</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kart Numarası
              </label>
              <input
                type="text"
                value={cardInfo.number}
                onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                placeholder="1234 5678 9012 3456"
                className="input-field"
                maxLength={19}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kart Üzerindeki İsim
              </label>
              <input
                type="text"
                value={cardInfo.name}
                onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                placeholder="AD SOYAD"
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Son Kullanma Tarihi
                </label>
                <input
                  type="text"
                  value={cardInfo.expiry}
                  onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                  placeholder="MM/YY"
                  className="input-field"
                  maxLength={5}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  value={cardInfo.cvc}
                  onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })}
                  placeholder="123"
                  className="input-field"
                  maxLength={3}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              Ödemeyi Tamamla
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const AgreementModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={() => setShowAgreement(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <span className="text-2xl">&times;</span>
        </button>

        <h2 className="text-2xl font-bold mb-6 dark:text-white">Bağış Sözleşmesi</h2>
        
        <div className="prose dark:prose-invert">
          <p>Bu sözleşme, bağışçı ile vakıf arasındaki bağış ilişkisini düzenler...</p>
          <h3>1. Taraflar</h3>
          <p>Bağışçı ve vakıf, bu sözleşmenin taraflarını oluşturur.</p>
          <h3>2. Bağışın Amacı</h3>
          <p>Yapılan bağış, seçilen vakfın amaçları doğrultusunda kullanılacaktır.</p>
          <h3>3. Bağışın Kullanımı</h3>
          <p>Bağış tutarı, vakfın tüzüğünde belirtilen amaçlar için kullanılacaktır.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Bağış Yap
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Bağışçı Tipi</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => {
                    setDonorType('individual');
                    setDonorInfo({ type: 'individual', email: '', phone: '', address: '' });
                  }}
                  className={`flex items-center justify-center space-x-2 p-4 rounded-lg border ${
                    donorType === 'individual'
                      ? 'border-red-500 bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Bireysel</span>
                </button>
                <button
                  onClick={() => {
                    setDonorType('corporate');
                    setDonorInfo({ type: 'corporate', email: '', phone: '', address: '' });
                  }}
                  className={`flex items-center justify-center space-x-2 p-4 rounded-lg border ${
                    donorType === 'corporate'
                      ? 'border-red-500 bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                  <span>Kurumsal</span>
                </button>
              </div>

              {/* Donor Information Form */}
              <div className="space-y-4">
                {donorType === 'individual' ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Ad
                        </label>
                        <input
                          type="text"
                          value={donorInfo.firstName || ''}
                          onChange={(e) => handleDonorInfoChange('firstName', e.target.value)}
                          className="input-field"
                          placeholder="Adınız"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Soyad
                        </label>
                        <input
                          type="text"
                          value={donorInfo.lastName || ''}
                          onChange={(e) => handleDonorInfoChange('lastName', e.target.value)}
                          className="input-field"
                          placeholder="Soyadınız"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        TC Kimlik No
                      </label>
                      <input
                        type="text"
                        value={donorInfo.identityNumber || ''}
                        onChange={(e) => handleDonorInfoChange('identityNumber', e.target.value)}
                        className="input-field"
                        placeholder="TC Kimlik Numaranız"
                        maxLength={11}
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Şirket Adı
                      </label>
                      <input
                        type="text"
                        value={donorInfo.companyName || ''}
                        onChange={(e) => handleDonorInfoChange('companyName', e.target.value)}
                        className="input-field"
                        placeholder="Şirket Adı"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Vergi No
                      </label>
                      <input
                        type="text"
                        value={donorInfo.taxNumber || ''}
                        onChange={(e) => handleDonorInfoChange('taxNumber', e.target.value)}
                        className="input-field"
                        placeholder="Vergi Numarası"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Common Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={donorInfo.email}
                    onChange={(e) => handleDonorInfoChange('email', e.target.value)}
                    className="input-field"
                    placeholder="E-posta Adresiniz"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={donorInfo.phone}
                    onChange={(e) => handleDonorInfoChange('phone', e.target.value)}
                    className="input-field"
                    placeholder="Telefon Numaranız"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Adres
                  </label>
                  <textarea
                    value={donorInfo.address}
                    onChange={(e) => handleDonorInfoChange('address', e.target.value)}
                    className="input-field"
                    placeholder="Adresiniz"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Para Birimi</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {currencies.map(({ symbol, icon: Icon, label }) => (
                  <button
                    key={symbol}
                    onClick={() => setCurrency(symbol)}
                    className={`flex items-center justify-center p-2 rounded-md border ${
                      currency === symbol
                        ? 'border-red-500 bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {label}
                  </button>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-4 dark:text-white">Bağış Miktarı</h3>
              <div className="mb-8">
                <DonationSlider
                  value={amount}
                  onChange={handleAmountChange}
                  currency={currency}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Diğer Miktar
                </label>
                <input
                  type="number"
                  min="0"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="input-field"
                  placeholder="Miktar girin"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Vakıf Seçimi</h3>
              <select
                value={selectedFoundation}
                onChange={(e) => setSelectedFoundation(e.target.value)}
                className="input-field"
              >
                <option value="">Vakıf Seçin</option>
                {foundations.map((foundation) => (
                  <option key={foundation.id} value={foundation.id}>
                    {foundation.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Bağış Notu</h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Bağışınız için not ekleyebilirsiniz..."
                className="input-field"
                rows={4}
              />
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md sticky top-24">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Bağış Özeti</h3>
              <div className="space-y-4">
                {selectedFoundation && (
                  <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300">Seçilen Vakıf</p>
                    <p className="font-medium dark:text-white">
                      {foundations.find(f => f.id === selectedFoundation)?.name}
                    </p>
                  </div>
                )}
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">Seçilen Miktar</p>
                  <p className="text-2xl font-bold dark:text-white">
                    {formatNumber(amount)} {currency}
                  </p>
                </div>
                {note && (
                  <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300">Bağış Notu</p>
                    <p className="font-medium dark:text-white">{note}</p>
                  </div>
                )}

                <div className="pb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={agreementAccepted}
                      onChange={(e) => setAgreementAccepted(e.target.checked)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      <button
                        onClick={() => setShowAgreement(true)}
                        className="text-red-600 hover:text-red-700 underline"
                      >
                        Bağış sözleşmesini
                      </button>{' '}
                      okudum ve onaylıyorum
                    </span>
                  </label>
                </div>

                <button
                  onClick={() => setShowCardModal(true)}
                  className={`w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors ${
                    !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={!isFormValid()}
                >
                  Bağışı Tamamla
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCardModal && <PaymentModal />}
      {showAgreement && <AgreementModal />}
    </div>
  );
}