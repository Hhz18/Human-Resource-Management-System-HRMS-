import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, Bell, Moon } from 'lucide-react';

export const Settings: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t.settings.title}</h1>
        <p className="text-slate-500">{t.settings.subtitle}</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Language Section */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Globe size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{t.settings.language}</h3>
              <p className="text-sm text-slate-500">{language === 'en' ? 'English' : '中文 (Chinese)'}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${language === 'en' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              English
            </button>
            <button 
              onClick={() => setLanguage('zh')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${language === 'zh' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              中文
            </button>
          </div>
        </div>

        {/* Mock Other Settings */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-4">
             <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
              <Bell size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{t.settings.notifications}</h3>
              <p className="text-sm text-slate-500">Email & Push</p>
            </div>
          </div>
          <div className="w-12 h-6 bg-slate-200 rounded-full"></div>
        </div>

        <div className="p-6 flex items-center justify-between opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-4">
             <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
              <Moon size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{t.settings.theme}</h3>
              <p className="text-sm text-slate-500">Light Mode</p>
            </div>
          </div>
           <div className="w-12 h-6 bg-slate-200 rounded-full"></div>
        </div>

      </div>
    </div>
  );
};