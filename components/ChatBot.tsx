
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Tactical analysis ready. How can I optimize your marketing stack today?', timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await geminiService.getChatResponse(history, input);
      setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'System error. Strategy connection lost.', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white w-96 h-[550px] rounded-2xl shadow-2xl flex flex-col border border-zinc-200 overflow-hidden ring-1 ring-black/5">
          <div className="bg-black p-5 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <i className="fas fa-brain text-sm"></i>
              </div>
              <div>
                <p className="font-black text-sm uppercase tracking-tighter">Mind Engine 3.0</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase">System Online</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-zinc-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-red-600 text-white rounded-tr-none font-medium' 
                  : 'bg-white text-black shadow-sm border border-zinc-100 rounded-tl-none font-medium'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-100 rounded-tl-none flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 border-t border-zinc-100 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Command input..."
                className="flex-1 bg-zinc-100 border border-transparent rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-red-600/10 focus:bg-white transition-all font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-black text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-arrow-up"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all active:scale-90 group relative"
        >
          <i className="fas fa-shield-halved text-2xl"></i>
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-red-700 border-2 border-white"></span>
          </span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
