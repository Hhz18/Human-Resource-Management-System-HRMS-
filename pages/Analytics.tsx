import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { HEADCOUNT_DATA, TURNOVER_DATA } from '../constants';

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981'];

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Smart Analytics</h1>
          <p className="text-slate-500">Data-driven insights for workforce planning.</p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
            Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Headcount by Dept */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Headcount Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={HEADCOUNT_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {HEADCOUNT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
             {HEADCOUNT_DATA.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-xs text-slate-600">{entry.name}</span>
                </div>
             ))}
          </div>
        </div>

        {/* Recruitment Funnel - Using Bar Chart horizontal */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Retention Rate (Last 6 Months)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TURNOVER_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0"/>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* AI Insight Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-4 rounded-xl flex gap-4 items-start">
         <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
            <span className="text-xl">✨</span>
         </div>
         <div>
            <h4 className="font-bold text-blue-900 text-sm">AI Insight</h4>
            <p className="text-blue-800 text-sm mt-1">Based on current trends, the <strong>Sales Department</strong> is at risk of under-staffing next quarter. Consider opening 2 new reqs for Account Executives.</p>
         </div>
      </div>
    </div>
  );
};
