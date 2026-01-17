
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { geminiService } from '../services/geminiService';
import { Icons } from '../constants';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hindi: नमस्ते। मैं आपकी भक्ति यात्रा में सहायता के लिए यहाँ हूँ। आज आप कैसा महसूस कर रहे हैं?\nEnglish: Namaste. I am here to help you in your devotional journey. How are you feeling today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' as const : 'user' as const,
      parts: [{ text: m.content }]
    }));

    const responseText = await geminiService.getResponse(input, history);

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseText || "Hindi: क्षमा करें, मैं समझ नहीं पाया।\nEnglish: Sorry, I couldn't understand.",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-orange-50/30 rounded-t-3xl overflow-hidden shadow-inner">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-2xl ${
                m.role === 'user'
                  ? 'bg-orange-500 text-white rounded-tr-none'
                  : 'bg-white text-amber-900 shadow-sm border border-orange-100 rounded-tl-none'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.content}</p>
              <p className={`text-[10px] mt-2 opacity-60 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-orange-100">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-orange-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-orange-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-orange-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t border-orange-100">
        <div className="flex gap-2 items-center max-w-lg mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Talk to Shanti Assistant..."
            className="flex-1 bg-orange-50/50 border border-orange-200 rounded-full px-5 py-3 focus:outline-none focus:border-orange-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="w-12 h-12 rounded-full saffron-gradient text-white flex items-center justify-center transform active:scale-95 disabled:opacity-50 transition-all shadow-md"
          >
            <Icons.Send className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
