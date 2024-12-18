import React from 'react';
import { DollarSign } from 'lucide-react';

interface DonationSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  currency: string;
}

export default function DonationSlider({ 
  value, 
  onChange, 
  min = 0, 
  max = 100000,
  currency 
}: DonationSliderProps) {
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = Number(e.target.value);
    
    // Custom step logic
    if (newValue <= 5000) {
      newValue = Math.round(newValue / 100) * 100; // Round to nearest 100
    } else if (newValue <= 10000) {
      newValue = Math.round(newValue / 500) * 500; // Round to nearest 500
    } else {
      newValue = Math.round(newValue / 1000) * 1000; // Round to nearest 1000
    }
    
    onChange(newValue);
  };

  const getStep = (value: number) => {
    if (value <= 5000) return 100;
    if (value <= 10000) return 500;
    return 1000;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <div className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <span>{formatNumber(value)}</span>
          <span className="ml-2">{currency}</span>
        </div>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          step={getStep(value)}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-red-600
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:hover:bg-red-700
            [&::-webkit-slider-thumb]:transition-colors
            
            [&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:h-6
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-red-600
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-white
            [&::-moz-range-thumb]:shadow-lg
            [&::-moz-range-thumb]:hover:bg-red-700
            [&::-moz-range-thumb]:transition-colors"
        />
        <div className="absolute -top-2 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{formatNumber(min)}</span>
          <span>{formatNumber(30000)}</span>
          <span>{formatNumber(65000)}</span>
          <span>{formatNumber(max)}</span>
        </div>
      </div>
    </div>
  );
}