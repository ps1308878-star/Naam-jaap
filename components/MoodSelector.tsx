
import React from 'react';
import { Mood } from '../types';

interface MoodSelectorProps {
  onSelect: (mood: Mood) => void;
  selectedMood: Mood | null;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onSelect, selectedMood }) => {
  const moods: { id: Mood; label: string; hindi: string; icon: string }[] = [
    { id: 'stressed', label: 'Tensed', hindi: 'तनाव', icon: '🧘' },
    { id: 'low-energy', label: 'Low Energy', hindi: 'थकान', icon: '⚡' },
    { id: 'peaceful', label: 'Peaceful', hindi: 'शांत', icon: '✨' },
    { id: 'devotional', label: 'Devotional', hindi: 'भक्ति', icon: '🙏' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-center text-amber-800">
        Hindi: आप आज कैसा महसूस कर रहे हैं?
        <br />
        <span className="text-sm font-normal text-amber-600">English: How are you feeling today?</span>
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onSelect(mood.id)}
            className={`p-4 rounded-2xl flex flex-col items-center gap-1 transition-all border-2 ${
              selectedMood === mood.id
                ? 'border-orange-500 bg-orange-50 saffron-gradient text-white'
                : 'border-orange-100 bg-white hover:bg-orange-50'
            }`}
          >
            <span className="text-2xl">{mood.icon}</span>
            <span className="font-bold">{mood.hindi}</span>
            <span className="text-xs opacity-80">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
