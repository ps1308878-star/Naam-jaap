
import React, { useState, useEffect } from 'react';
import { DEITIES } from '../constants';

interface MalaCounterProps {
  onFinish: (deity: string, count: number) => void;
}

const MalaCounter: React.FC<MalaCounterProps> = ({ onFinish }) => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(11);
  const [selectedDeity, setSelectedDeity] = useState(DEITIES[0]);
  const [isVibrating, setIsVibrating] = useState(false);

  const increment = () => {
    setCount((prev) => prev + 1);
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 100);
    
    // Check for target completion
    if (count + 1 === target) {
      if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
    }
  };

  const reset = () => {
    if (count > 0) onFinish(selectedDeity.name, count);
    setCount(0);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="w-full flex justify-between items-center mb-4">
        <select
          value={selectedDeity.name}
          onChange={(e) => setSelectedDeity(DEITIES.find(d => d.name === e.target.value) || DEITIES[0])}
          className="bg-white border-2 border-orange-200 rounded-lg p-2 text-sm focus:outline-none focus:border-orange-500"
        >
          {DEITIES.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
        </select>
        <div className="flex gap-2">
          {[11, 21, 108].map(t => (
            <button
              key={t}
              onClick={() => setTarget(t)}
              className={`px-3 py-1 rounded-full text-xs font-bold ${target === t ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center">
        <p className="text-orange-600 font-mukta text-xl mb-1 italic">{selectedDeity.mantra}</p>
        <p className="text-amber-800 text-sm">Target: {target}</p>
      </div>

      <button
        onClick={increment}
        className={`w-64 h-64 rounded-full saffron-gradient flex items-center justify-center text-white shadow-2xl transform active:scale-95 transition-transform relative ${isVibrating ? 'scale-105' : ''}`}
      >
        <div className="flex flex-col items-center">
          <span className="text-7xl font-bold font-mukta">{count}</span>
          <span className="text-lg opacity-80 uppercase tracking-widest mt-2">Japa</span>
        </div>
        {/* Bead visualization */}
        <div className="absolute inset-0 border-[12px] border-white/20 rounded-full border-dashed animate-[spin_20s_linear_infinite]"></div>
      </button>

      <div className="flex gap-4 mt-4">
        <button
          onClick={reset}
          className="px-8 py-3 bg-amber-100 text-amber-800 rounded-full font-bold hover:bg-amber-200 transition-colors"
        >
          Complete Session
        </button>
      </div>
      
      <p className="text-xs text-center text-amber-700/60 mt-4 leading-relaxed">
        Hindi: प्रत्येक जप के साथ ईश्वर की कृपा महसूस करें।<br/>
        English: Feel the divine grace with every chant.
      </p>
    </div>
  );
};

export default MalaCounter;
