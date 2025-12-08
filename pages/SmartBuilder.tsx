import React from 'react';
import { 
  Plus, TrendingUp, Clock, ClipboardCheck, Gift, Plane, Calendar, Search, 
  LayoutTemplate, Users
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const SmartBuilder: React.FC = () => {
    const { t } = useLanguage();

    // Define strict types for keys based on LanguageContext structure
    const templates: {
        id: string;
        key: 'storePerf' | 'piecework' | 'inspection' | 'bonus' | 'travel' | 'timesheet';
        icon: any;
        color: string;
        type: string;
        users: string;
    }[] = [
        { id: 't1', key: 'storePerf', icon: TrendingUp, color: 'bg-orange-500', type: 'Form', users: '1.2k' },
        { id: 't2', key: 'piecework', icon: Clock, color: 'bg-blue-500', type: 'Calculation', users: '850' },
        { id: 't3', key: 'inspection', icon: ClipboardCheck, color: 'bg-emerald-500', type: 'Workflow', users: '2.4k' },
        { id: 't4', key: 'bonus', icon: Gift, color: 'bg-pink-500', type: 'Finance', users: '500' },
        { id: 't5', key: 'travel', icon: Plane, color: 'bg-purple-500', type: 'Approval', users: '3.1k' },
        { id: 't6', key: 'timesheet', icon: Calendar, color: 'bg-indigo-500', type: 'Project', users: '920' },
    ];

    return (
        <div className="space-y-6">
             {/* Header */}
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">{t.apaas.title}</h1>
                    <p className="text-slate-500">{t.apaas.subtitle}</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500" placeholder="Search templates..." />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200">
                        <Plus size={18} />
                        <span className="text-sm font-medium">{t.apaas.create}</span>
                    </button>
                </div>
            </div>

            {/* Banner/Canvas Area */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white flex justify-between items-center shadow-lg">
                <div>
                    <h2 className="text-2xl font-bold mb-2">{t.apaas.banner.title}</h2>
                    <p className="text-slate-300 max-w-lg mb-6">
                        {t.apaas.banner.desc}
                    </p>
                    <button className="bg-white text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                        {t.apaas.banner.btn}
                    </button>
                </div>
                <div className="hidden md:block opacity-80">
                    <LayoutTemplate size={120} strokeWidth={1} />
                </div>
            </div>

            <div className="flex items-center justify-between mt-8">
                <h3 className="font-bold text-slate-800 text-lg">{t.apaas.market}</h3>
                <button className="text-sm text-indigo-600 font-medium">{t.apaas.viewAll}</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Create New Card */}
                <div className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors cursor-pointer bg-slate-50 hover:bg-white h-56">
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                        <Plus size={24} />
                    </div>
                    <h3 className="font-semibold text-base">{t.apaas.blank}</h3>
                    <p className="text-xs">{t.apaas.start}</p>
                </div>

                {/* Template Cards */}
                {templates.map((app) => (
                    <div key={app.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 h-56 flex flex-col justify-between group">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-10 h-10 rounded-lg ${app.color} flex items-center justify-center text-white shadow-sm`}>
                                    <app.icon size={20} />
                                </div>
                                <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{app.type}</span>
                            </div>
                            <h3 className="font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                                {t.apaas.templates[app.key]}
                            </h3>
                            <p className="text-slate-400 text-xs line-clamp-2">Pre-configured template with workflows and reporting dashboards.</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                <Users size={12} /> {app.users} installs
                            </span>
                            <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                {t.apaas.install}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};