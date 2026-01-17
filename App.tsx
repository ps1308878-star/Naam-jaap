
import React, { useState, useEffect } from 'react';
import { Icons } from './constants';
import { Mood, JaapSession } from './types';
import MoodSelector from './components/MoodSelector';
import MalaCounter from './components/MalaCounter';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'jaap' | 'ai' | 'stats'>('home');
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [sessions, setSessions] = useState<JaapSession[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    // Load local data if available (simulated offline)
    const saved = localStorage.getItem('jaap_sessions');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSessions(parsed);
      setTotalCount(parsed.reduce((acc: number, s: JaapSession) => acc + s.count, 0));
    }
  }, []);

  const handleFinishSession = (deity: string, count: number) => {
    const newSession: JaapSession = { deity, count, timestamp: new Date() };
    const updated = [newSession, ...sessions].slice(0, 100);
    setSessions(updated);
    setTotalCount(prev => prev + count);
    localStorage.setItem('jaap_sessions', JSON.stringify(updated));
    setActiveTab('home');
    setSelectedMood('peaceful');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <header className="px-2">
              <h1 className="text-3xl font-bold text-amber-900 font-mukta">Namaste 🙏</h1>
              <p className="text-amber-700">Explore your spiritual peace today.</p>
            </header>

            <div className="saffron-gradient p-6 rounded-3xl text-white shadow-lg space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium uppercase tracking-widest opacity-80">Total Counts</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Today</span>
              </div>
              <div className="text-5xl font-bold font-mukta">{totalCount}</div>
              <p className="text-sm opacity-90">Hindi: निरंतर अभ्यास ही शांति की कुंजी है।<br/>English: Consistent practice is the key to peace.</p>
            </div>

            <MoodSelector
              selectedMood={selectedMood}
              onSelect={(mood) => {
                setSelectedMood(mood);
                setActiveTab('ai');
              }}
            />

            <div className="space-y-4">
              <h3 className="font-bold text-amber-900 px-2 flex justify-between items-center">
                Recent Sessions
                <span className="text-xs font-normal text-amber-600">View All</span>
              </h3>
              <div className="space-y-3">
                {sessions.length > 0 ? (
                  sessions.slice(0, 3).map((s, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl flex justify-between items-center border border-orange-100 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                          <Icons.Mala className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-amber-900">{s.deity}</p>
                          <p className="text-xs text-amber-600">{new Date(s.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-orange-600 font-bold font-mukta text-xl">+{s.count}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-amber-600/50 bg-amber-50 rounded-2xl border border-dashed border-amber-200">
                    No sessions yet. Start your first Jaap!
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'jaap':
        return (
          <div className="animate-in slide-in-from-bottom duration-300">
             <header className="px-2 mb-6">
              <h1 className="text-2xl font-bold text-amber-900 font-mukta text-center">Digital Mala</h1>
            </header>
            <MalaCounter onFinish={handleFinishSession} />
          </div>
        );
      case 'ai':
        return <AIAssistant />;
      case 'stats':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <header className="px-2">
              <h1 className="text-2xl font-bold text-amber-900 font-mukta">Your Progress</h1>
            </header>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
                  <p className="text-xs text-amber-600 mb-1">Average Daily</p>
                  <p className="text-2xl font-bold text-orange-500">124</p>
               </div>
               <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
                  <p className="text-xs text-amber-600 mb-1">Current Streak</p>
                  <p className="text-2xl font-bold text-orange-500">5 Days</p>
               </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">
              <h4 className="font-bold mb-4">Activity Insights</h4>
              <div className="flex items-end justify-between h-32 gap-2">
                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      style={{ height: `${h}%` }} 
                      className={`w-full rounded-t-lg saffron-gradient ${i === 6 ? 'opacity-100' : 'opacity-40'}`}
                    ></div>
                    <span className="text-[10px] uppercase text-amber-600">
                      {['M','T','W','T','F','S','S'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col relative bg-[#fff9f0] shadow-2xl overflow-hidden">
      {/* Top Banner (Optional status bar replacement) */}
      <div className="h-6 w-full bg-white/50"></div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-orange-100 flex items-center justify-around px-4 z-50">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 p-2 transition-all ${activeTab === 'home' ? 'text-orange-600 scale-110' : 'text-amber-300'}`}
        >
          <Icons.Home />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
        </button>
        <button
          onClick={() => setActiveTab('jaap')}
          className={`flex flex-col items-center gap-1 p-2 transition-all ${activeTab === 'jaap' ? 'text-orange-600 scale-110' : 'text-amber-300'}`}
        >
          <Icons.Mala />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Jaap</span>
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex flex-col items-center gap-1 p-2 transition-all ${activeTab === 'ai' ? 'text-orange-600 scale-110' : 'text-amber-300'}`}
        >
          <div className="relative">
            <Icons.Chat />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Assistant</span>
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex flex-col items-center gap-1 p-2 transition-all ${activeTab === 'stats' ? 'text-orange-600 scale-110' : 'text-amber-300'}`}
        >
          <Icons.Stats />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Stats</span>
        </button>
      </nav>

      {/* Floating Action Button for quick Jaap */}
      {activeTab !== 'jaap' && activeTab !== 'ai' && (
        <button 
          onClick={() => setActiveTab('jaap')}
          className="absolute bottom-24 right-6 w-14 h-14 saffron-gradient rounded-full shadow-xl flex items-center justify-center text-white transform active:scale-90 transition-transform z-40"
        >
          <Icons.Mala className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default App;
