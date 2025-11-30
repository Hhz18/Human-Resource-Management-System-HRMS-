import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot } from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: 'Hi Eleanor! I am Astra, your digital HR assistant. How can I help with recruitment or policy today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    const userQ = input;
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      let response = "I can help you navigate to that module.";
      if (userQ.toLowerCase().includes('policy')) {
        response = "According to the 2024 handbook, employees are entitled to 15 days of paid leave annually. Would you like to draft an update?";
      } else if (userQ.toLowerCase().includes('candidate') || userQ.toLowerCase().includes('hire')) {
        response = "I found 3 highly qualified candidates for the 'Senior Product Manager' role. Shall I schedule screenings?";
      } else if (userQ.toLowerCase().includes('turnover')) {
        response = "Turnover in the R&D department has decreased by 2% this quarter. The main factor seems to be the new flexible work policy.";
      }
      
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Astra AI</h3>
                <p className="text-xs text-indigo-100">Digital Assistant</p>
              </div>
            </div>
            <button onClick={toggleOpen} className="text-white/80 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 bg-slate-50 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input 
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button 
        onClick={toggleOpen}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 
          ${isOpen ? 'bg-slate-200 text-slate-600 rotate-90' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'}
        `}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </button>
    </div>
  );
};
