import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, X, Send, Bot, PenTool, BarChart3, Users, Scale, 
  MessageSquare, FileText, ChevronRight, RefreshCw, LayoutGrid
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { AIMessage } from '../types';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<AIMessage[]>([
    { 
      id: '1', 
      role: 'ai', 
      type: 'text', 
      content: 'Hello! I am Astra, your Digital Human AI Assistant. I can help with Content Generation, Policy Q&A, Data Analysis, and Talent Intelligence. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);

  const [showMenu, setShowMenu] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showMenu]);

  const CAPABILITIES = [
    {
      title: 'Content Gen',
      icon: PenTool,
      color: 'bg-blue-100 text-blue-600',
      actions: [
        { label: 'Generate JD', prompt: 'Draft a Job Description for a Senior Product Manager.' },
        { label: 'Interview Qs', prompt: 'Generate 5 behavioral interview questions for a Sales Director.' },
        { label: 'OKR Coach', prompt: 'Help me formulate SMART OKRs for Q3 Engineering.' },
      ]
    },
    {
      title: 'Assistant',
      icon: Bot,
      color: 'bg-purple-100 text-purple-600',
      actions: [
        { label: 'Legal Policy', prompt: 'What is the company policy on remote work and overtime?' },
        { label: 'System Help', prompt: 'How do I manually override a payroll anomaly?' },
      ]
    },
    {
      title: 'Data Analysis',
      icon: BarChart3,
      color: 'bg-orange-100 text-orange-600',
      actions: [
        { label: 'Turnover Analysis', prompt: 'Show me the turnover rate trend for the R&D department.' },
        { label: 'Salary Benchmarking', prompt: 'Compare our L3 Engineer salary against market median.' },
      ]
    },
    {
      title: 'Talent Intel',
      icon: Sparkles,
      color: 'bg-emerald-100 text-emerald-600',
      actions: [
        { label: '9-Box Grid', prompt: 'Generate a 9-Box talent grid for the Marketing team.' },
        { label: 'Succession Map', prompt: 'Identify potential successors for the VP of Sales.' },
      ]
    }
  ];

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    
    const newMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      type: 'text',
      content: text,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setShowMenu(false);

    // Simulate AI Processing
    setTimeout(() => {
      let aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        type: 'text',
        content: "I'm processing your request...",
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };

      const lowerText = text.toLowerCase();

      if (lowerText.includes('9-box') || lowerText.includes('grid')) {
        aiResponse = {
            ...aiResponse,
            type: 'grid-9box',
            content: "Here is the generated 9-Box Grid for the Marketing Team based on recent performance reviews and potential assessments.",
            data: [
                { name: 'Alice', box: 9, color: 'bg-green-500' }, // Star
                { name: 'Bob', box: 8, color: 'bg-green-400' },
                { name: 'Charlie', box: 5, color: 'bg-yellow-400' },
                { name: 'David', box: 3, color: 'bg-orange-400' },
                { name: 'Eve', box: 1, color: 'bg-red-400' },
            ]
        };
      } else if (lowerText.includes('turnover') || lowerText.includes('trend')) {
         aiResponse = {
            ...aiResponse,
            type: 'chart-turnover',
            content: "I've analyzed the R&D turnover data. There is a slight downward trend over the last 3 months, currently at 1.2%.",
            data: [
                { month: 'Jan', value: 2.5 },
                { month: 'Feb', value: 1.8 },
                { month: 'Mar', value: 1.2 },
            ]
        };
      } else if (lowerText.includes('job description') || lowerText.includes('jd')) {
         aiResponse = {
            ...aiResponse,
            type: 'jd-draft',
            content: "Here is a draft JD for the Senior Product Manager role. I've optimized it for inclusivity and SEO.",
            data: {
                title: "Senior Product Manager",
                summary: "We are looking for a visionary PM to lead our core platform...",
                responsibilities: [
                    "Define product strategy and roadmap",
                    "Collaborate with engineering and design",
                    "Analyze market trends and user feedback"
                ]
            }
        };
      } else {
        aiResponse.content = "I understand. I'm retrieving the relevant information from the knowledge base to assist you with: " + text;
      }

      setMessages(prev => [...prev, aiResponse]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 h-[600px]">
          {/* Digital Human Header */}
          <div className="bg-slate-900 p-4 flex justify-between items-center text-white relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px]">
                 <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Astra" alt="Astra" className="w-full h-full" />
                 </div>
              </div>
              <div>
                <h3 className="font-bold text-base flex items-center gap-1">
                    Astra AI
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                </h3>
                <p className="text-xs text-slate-400">Digital HCM Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
                <button onClick={() => setMessages([])} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800" title="Clear Chat">
                    <RefreshCw size={16} />
                </button>
                <button onClick={toggleOpen} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800">
                    <X size={20} />
                </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 bg-slate-50 overflow-y-auto scroll-smooth">
            <div className="p-4 space-y-6">
                {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                    <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        {msg.role === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-1">
                                <Bot size={16} className="text-indigo-600" />
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            {/* Text Bubble */}
                            <div className={`px-4 py-3 text-sm shadow-sm ${
                                msg.role === 'user' 
                                    ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none' 
                                    : 'bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-none'
                            }`}>
                                {msg.content}
                            </div>

                            {/* Rich Content Renderers */}
                            {msg.type === 'grid-9box' && msg.data && (
                                <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm mt-2 w-64">
                                    <div className="grid grid-cols-3 gap-1 h-48">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
                                            // Mock logic to place dots in grid
                                            const active = msg.data.find((d: any) => d.box === (10-i)); // Reverse index for visual match
                                            return (
                                                <div key={i} className={`bg-slate-100 rounded flex items-center justify-center relative ${i === 2 ? 'bg-green-50' : i === 6 ? 'bg-orange-50' : ''}`}>
                                                    <span className="text-[8px] text-slate-300 absolute top-0.5 left-1">{(10-i)}</span>
                                                    {active && <div className={`w-3 h-3 rounded-full ${active.color}`} title={active.name}></div>}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <p className="text-xs text-slate-500 text-center mt-2">Potential vs Performance</p>
                                </div>
                            )}

                            {msg.type === 'chart-turnover' && msg.data && (
                                <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm mt-2 h-40 w-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={msg.data}>
                                            <XAxis dataKey="month" tick={{fontSize: 10}} axisLine={false} tickLine={false}/>
                                            <Tooltip cursor={{fill: 'transparent'}} />
                                            <Bar dataKey="value" fill="#6366f1" radius={[4,4,0,0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}

                             {msg.type === 'jd-draft' && msg.data && (
                                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mt-2 w-72">
                                    <h4 className="font-bold text-slate-800 mb-2">{msg.data.title}</h4>
                                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">{msg.data.summary}</p>
                                    <ul className="text-xs text-slate-600 list-disc pl-4 space-y-1">
                                        {msg.data.responsibilities.map((r: string, idx: number) => (
                                            <li key={idx}>{r}</li>
                                        ))}
                                    </ul>
                                    <button className="w-full mt-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-medium rounded hover:bg-indigo-100">
                                        Copy to Clipboard
                                    </button>
                                </div>
                            )}

                            <span className="text-[10px] text-slate-400 px-1">
                                {msg.timestamp}
                            </span>
                        </div>
                    </div>
                </div>
                ))}
                
                {showMenu && messages.length > 0 && (
                     <div className="grid grid-cols-2 gap-2 mt-4 animate-in fade-in slide-in-from-bottom-4">
                        {CAPABILITIES.map((cap, idx) => (
                            <div key={idx} className="col-span-2">
                                <div className="flex items-center gap-2 mb-2 px-1">
                                    <cap.icon size={12} className="text-slate-400"/>
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{cap.title}</span>
                                </div>
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    {cap.actions.map((action, actionIdx) => (
                                        <button 
                                            key={actionIdx}
                                            onClick={() => handleSend(action.prompt)}
                                            className="whitespace-nowrap px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-sm transition-all text-left flex items-center gap-2"
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-100">
             {/* Quick reset menu button if hidden */}
             {!showMenu && (
                <div className="flex gap-2 mb-2 overflow-x-auto">
                    <button onClick={() => setShowMenu(true)} className="flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600 hover:bg-slate-200">
                        <LayoutGrid size={12} /> Menu
                    </button>
                    {/* Contextual suggestions could go here */}
                </div>
             )}
            
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-2 py-2">
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-full transition-colors">
                    <Sparkles size={18} />
                </button>
                <input 
                className="flex-1 bg-transparent text-sm focus:outline-none text-slate-700 placeholder:text-slate-400"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                onClick={() => handleSend()}
                className={`p-2 rounded-full transition-all duration-200 ${
                    input.trim() ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700' : 'bg-slate-200 text-slate-400'
                }`}
                disabled={!input.trim()}
                >
                <Send size={16} />
                </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-2">
                Astra AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      )}

      {/* Trigger Button - Digital Human Avatar Style */}
      <button 
        onClick={toggleOpen}
        className={`relative group transition-all duration-300 ${isOpen ? 'rotate-0' : 'hover:-translate-y-1'}`}
      >
        <div className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-4 border-white 
          ${isOpen ? 'bg-slate-200' : 'bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600'}
        `}>
             {isOpen ? (
                 <X size={24} className="text-slate-600" />
             ) : (
                <div className="relative w-full h-full rounded-full overflow-hidden">
                    <img 
                        src="https://api.dicebear.com/7.x/bottts/svg?seed=Astra" 
                        alt="AI" 
                        className="w-full h-full object-cover p-1"
                    />
                    <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors"></div>
                </div>
             )}
        </div>
        
        {/* Status Indicator */}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
            </span>
        )}

        {/* Tooltip Label */}
        {!isOpen && (
            <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
                Ask Astra AI
                {/* Arrow */}
                <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
            </div>
        )}
      </button>
    </div>
  );
};