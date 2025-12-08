import React from 'react';
import { Users, TrendingDown, Clock, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { TURNOVER_DATA } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t.dashboard.title}</h1>
          <p className="text-slate-500">{t.dashboard.welcome}</p>
        </div>
        <div className="text-sm text-slate-400">
          {t.dashboard.updated}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: t.dashboard.stats.headcount, value: '1,284', trend: '+12%', trendUp: true, icon: Users, color: 'bg-blue-500' },
          { label: t.dashboard.stats.turnover, value: '1.2%', trend: '-0.5%', trendUp: false, icon: TrendingDown, color: 'bg-green-500' },
          { label: t.dashboard.stats.positions, value: '42', trend: '+5', trendUp: true, icon: Clock, color: 'bg-purple-500' },
          { label: t.dashboard.stats.approvals, value: '18', trend: 'Urgent', trendUp: true, icon: AlertCircle, color: 'bg-amber-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon size={24} className={stat.color.replace('bg-', 'text-')} />
              </div>
              <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                  (stat.trendUp && stat.label !== t.dashboard.stats.turnover) || (!stat.trendUp && stat.label === t.dashboard.stats.turnover) 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
                }`}>
                {stat.trendUp ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
                {stat.trend}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Analytics */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-slate-800">{t.dashboard.charts.turnover}</h3>
              <button className="text-sm text-indigo-600 font-medium">{t.dashboard.charts.viewReport}</button>
            </div>
            <div className="h-72 w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TURNOVER_DATA}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} unit="%" />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Col: Quick Actions & Tasks */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">{t.dashboard.tasks.title}</h3>
            <div className="space-y-4">
              {[
                { title: 'Approve Payroll (March)', due: 'Today', type: 'Finance' },
                { title: 'Review J. Doe Promotion', due: 'Tomorrow', type: 'HR' },
                { title: 'Sign Contract: S. Lin', due: '2 days left', type: 'Legal' },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg group hover:bg-indigo-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-500' : 'bg-indigo-500'}`} />
                    <span className="text-sm font-medium text-slate-700">{task.title}</span>
                  </div>
                  <span className="text-xs text-slate-500">{task.due}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              {t.dashboard.tasks.viewAll}
            </button>
          </div>

          <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Users size={120} />
            </div>
            <h3 className="text-lg font-bold mb-2">{t.dashboard.promo.title}</h3>
            <p className="text-indigo-200 text-sm mb-4">{t.dashboard.promo.desc}</p>
            <button className="bg-white text-indigo-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors">
              {t.dashboard.promo.btn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};