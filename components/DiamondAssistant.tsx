
import React, { useState, useRef, useEffect } from 'react';
import { getCreativeDirection } from '../services/gemini';
import { ChatMessage } from '../types';

const DiamondAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const response = await getCreativeDirection(userMessage);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div id="assistant" className="glass-panel rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col h-[500px]">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 bg-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-cyan-900/30 flex items-center justify-center text-cyan-300 border border-cyan-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-cinzel font-bold text-sm tracking-widest">ASISTENTE DIAMANTE</h3>
            <p className="text-[10px] text-cyan-500 uppercase font-bold">Creative IA Powered</p>
          </div>
        </div>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.length === 0 && (
          <div className="text-center py-12 px-4">
            <p className="text-zinc-500 text-sm italic">
              "Cuéntame sobre tu próximo proyecto. ¿Qué vibra buscas? ¿Oscura, energética, futurista?"
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-cyan-600 text-white rounded-tr-none' 
                : 'bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-tl-none'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl rounded-tl-none">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-zinc-950 border-t border-zinc-800">
        <div className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe tu visión..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors pr-12"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white hover:bg-cyan-500 transition-colors disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiamondAssistant;
