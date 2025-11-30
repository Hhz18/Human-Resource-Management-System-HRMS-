import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Ask Astra AI or search for employees..."
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <HelpCircle size={20} />
        </button>
        
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

        <button className="flex items-center gap-3 hover:bg-slate-50 p-1 pr-3 rounded-full transition-colors">
          <img 
            src="https://picsum.photos/100/100" 
            alt="User" 
            className="w-8 h-8 rounded-full border border-slate-200"
          />
          <div className="text-left hidden md:block">
            <p className="text-sm font-semibold text-slate-700">Eleanor Pena</p>
            <p className="text-xs text-slate-500">HR Director</p>
          </div>
        </button>
      </div>
    </header>
  );
};
