import React, { useState } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  LayoutDashboard, FileText, PenTool, AlertTriangle, 
  Users, DollarSign, Activity, TrendingUp, ChevronDown, 
  Filter, Download, Plus, Search, BrainCircuit, Sparkles,
  ArrowUpRight, ArrowDownRight, BarChart3
} from 'lucide-react';
import { HEADCOUNT_DATA, TURNOVER_DATA } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981'];

// Mock Data for new charts
const COST_DATA = [
  { name: 'Q1', salaries: 4000, benefits: 2400 },
  { name: 'Q2', salaries: 3000, benefits: 1398 },
  { name: 'Q3', salaries: 2000, benefits: 9800 },
  { name: 'Q4', salaries: 2780, benefits: 3908 },
];

const EFFICIENCY_DATA = [
  { subject: 'Revenue/Emp', A: 120, fullMark: 150 },
  { subject: 'Attendance', A: 98, fullMark: 150 },
  { subject: 'Engagement', A: 86, fullMark: 150 },
  { subject: 'Retention', A: 99, fullMark: 150 },
  { subject: 'Training', A: 85, fullMark: 150 },
  { subject: 'Innovation', A: 65, fullMark: 150 },
];

const ALERTS = [
    { id: 1, severity: 'high', title: 'High Turnover Risk', desc: 'Sales Dept predicted turnover > 15% next quarter based on engagement scores.', date: 'Today' },
    { id: 2, severity: 'medium', title: 'Overtime Budget Warning', desc: 'R&D Dept has utilized 92% of Q1 overtime budget.', date: 'Yesterday' },
    { id: 3, severity: 'low', title: 'Compliance Gap', desc: '12 New hires have not completed "Data Privacy" training.', date: 'Mar 12' },
];

type AnalyticsTab = 'dashboard' | 'reports' | 'custom' | 'warnings';
type UserRole = 'CEO' | 'HRD' | 'Manager';

export const Analytics: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('HRD');

  const renderContent = () => {
      switch(activeTab) {
          case 'dashboard': return <DashboardOverview role={currentRole} />;
          case 'reports': return <StandardReports />;
          case 'custom': return <CustomBI />;
          case 'warnings': return <WarningCenter />;
          default: return <DashboardOverview role={currentRole} />;
      }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
       {/* Header with Role Switcher */}
       <div className="flex flex-col gap-6 shrink-0">
        <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{t.analytics.title}</h1>
              <p className="text-slate-500">{t.analytics.subtitle}</p>
            </div>
            
            {/* Role Switcher for Demo */}
            <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">{t.analytics.viewAs}:</span>
                <div className="relative group">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">
                        <Users size={16} className="text-indigo-600"/>
                        {currentRole}
                        <ChevronDown size={14} className="text-slate-400"/>
                    </button>
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-slate-100 rounded-lg shadow-xl hidden group-hover:block z-20 animate-in fade-in slide-in-from-top-2">
                        {(['CEO', 'HRD', 'Manager'] as UserRole[]).map(role => (
                            <button 
                                key={role}
                                onClick={() => setCurrentRole(role)}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg ${currentRole === role ? 'text-indigo-600 font-medium bg-indigo-50' : 'text-slate-600'}`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 flex gap-6 overflow-x-auto">
            <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={LayoutDashboard} label={t.analytics.tabs.dashboard} />
            <TabButton active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} icon={FileText} label={t.analytics.tabs.reports} />
            <TabButton active={activeTab === 'custom'} onClick={() => setActiveTab('custom')} icon={PenTool} label={t.analytics.tabs.custom} />
            <TabButton active={activeTab === 'warnings'} onClick={() => setActiveTab('warnings')} icon={AlertTriangle} label={t.analytics.tabs.warnings} />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pt-2">
         {renderContent()}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 pb-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
            active ? 'border-indigo-600 text-indigo-600 font-medium' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
        }`}
    >
        <Icon size={18} />
        <span className="text-sm">{label}</span>
    </button>
);

// --- 1. Dashboard Overview ---
const DashboardOverview = ({ role }: { role: UserRole }) => {
    const { t } = useLanguage();
    const getMetrics = () => {
        switch(role) {
            case 'CEO': return [
                { label: 'Human Capital ROI', value: '3.2x', trend: '+5.4%', up: true, icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
                { label: 'Total Headcount', value: '1,248', trend: '+12%', up: true, icon: Users, color: 'text-blue-600 bg-blue-50' },
                { label: 'Org Efficiency', value: '92%', trend: '+2.1%', up: true, icon: Activity, color: 'text-indigo-600 bg-indigo-50' },
                { label: 'Turnover Rate', value: '1.2%', trend: '-0.5%', up: true, icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
            ];
            case 'Manager': return [
                { label: 'Team Attendance', value: '98%', trend: '-1.2%', up: false, icon: Users, color: 'text-blue-600 bg-blue-50' },
                { label: 'Tasks Completed', value: '142', trend: '+15%', up: true, icon: FileText, color: 'text-emerald-600 bg-emerald-50' },
                { label: 'Team Mood', value: '8.5', trend: '+0.2', up: true, icon: Activity, color: 'text-orange-600 bg-orange-50' },
                { label: 'Open Positions', value: '2', trend: 'Urgent', up: false, icon: Users, color: 'text-purple-600 bg-purple-50' },
            ];
            default: return [ // HRD
                { label: t.analytics.metrics.timeToHire, value: '18d', trend: '-2d', up: true, icon: Users, color: 'text-blue-600 bg-blue-50' },
                { label: t.analytics.metrics.costPerHire, value: '$2.4k', trend: '-$150', up: true, icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
                { label: t.analytics.metrics.enps, value: '42', trend: '+5', up: true, icon: Activity, color: 'text-orange-600 bg-orange-50' },
                { label: t.analytics.metrics.risk, value: 'High', trend: 'Sales', up: false, icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
            ];
        }
    };

    const metrics = getMetrics();

    return (
        <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${m.color}`}>
                                <m.icon size={24} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${m.up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {m.up ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
                                {m.trend}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800">{m.value}</h3>
                        <p className="text-sm text-slate-500 mt-1">{m.label}</p>
                    </div>
                ))}
            </div>

            {/* Main Chart Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-6">
                        {role === 'CEO' ? 'Labor Cost vs Efficiency Trend' : role === 'Manager' ? 'Team Performance Trend' : t.analytics.charts.trend}
                    </h3>
                    <div className="h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={COST_DATA}>
                                <defs>
                                    <linearGradient id="colorSal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorBen" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <Tooltip />
                                <Area type="monotone" dataKey="salaries" stroke="#6366f1" fillOpacity={1} fill="url(#colorSal)" />
                                <Area type="monotone" dataKey="benefits" stroke="#10b981" fillOpacity={1} fill="url(#colorBen)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-6">{t.analytics.charts.composition}</h3>
                    <div className="h-48 w-full mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                            data={HEADCOUNT_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            >
                            {HEADCOUNT_DATA.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                         {HEADCOUNT_DATA.slice(0, 3).map((entry, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                    <span className="text-slate-600">{entry.name}</span>
                                </div>
                                <span className="font-bold text-slate-800">{entry.value}</span>
                            </div>
                         ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ... existing code for other sub-components ...
const StandardReports = () => {
    const reports = [
        { title: 'Org Profile', desc: 'Headcount, diversity, span of control', icon: Users, color: 'bg-blue-100 text-blue-600' },
        { title: 'Turnover Analysis', desc: 'Voluntary vs Involuntary, tenure analysis', icon: TrendingUp, color: 'bg-red-100 text-red-600' },
        { title: 'Labor Cost', desc: 'Total cost of workforce, overtime trends', icon: DollarSign, color: 'bg-emerald-100 text-emerald-600' },
        { title: 'Efficiency Health', desc: 'Revenue per employee, engagement score', icon: Activity, color: 'bg-purple-100 text-purple-600' },
    ];

    return (
        <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {reports.map((report, i) => (
                    <button key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-left group">
                        <div className={`w-12 h-12 rounded-lg ${report.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <report.icon size={24} />
                        </div>
                        <h3 className="font-bold text-slate-800 mb-1">{report.title}</h3>
                        <p className="text-xs text-slate-500">{report.desc}</p>
                    </button>
                ))}
             </div>

             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div className="flex justify-between items-center mb-6">
                     <h3 className="font-bold text-slate-800">Org Health Radar</h3>
                     <button className="text-sm text-indigo-600 font-medium">Download PDF</button>
                 </div>
                 <div className="h-80 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={EFFICIENCY_DATA}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 12}} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar
                            name="Astra"
                            dataKey="A"
                            stroke="#8b5cf6"
                            fill="#8b5cf6"
                            fillOpacity={0.5}
                        />
                        <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                 </div>
             </div>
        </div>
    );
};

const CustomBI = () => {
    return (
        <div className="flex h-[600px] gap-6">
             {/* Builder Sidebar */}
             <div className="w-64 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col p-4">
                 <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                     <PenTool size={18} className="text-indigo-600"/> Data Fields
                 </h3>
                 <div className="relative mb-4">
                     <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                     <input className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-xs" placeholder="Search fields..." />
                 </div>
                 <div className="flex-1 overflow-y-auto space-y-2">
                     {['Department', 'Join Date', 'Salary', 'Performance Score', 'Attendance Rate', 'Age Group', 'Gender', 'Location'].map(field => (
                         <div key={field} className="p-2 border border-slate-100 rounded bg-slate-50 text-sm text-slate-600 cursor-move hover:border-indigo-300 hover:text-indigo-600">
                             {field}
                         </div>
                     ))}
                 </div>
             </div>

             {/* Main Canvas */}
             <div className="flex-1 flex flex-col gap-6">
                 {/* AI Prompt */}
                 <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-1 rounded-xl shadow-lg">
                     <div className="bg-white rounded-[10px] p-2 flex items-center gap-3">
                         <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                             <BrainCircuit size={20} />
                         </div>
                         <input 
                            className="flex-1 text-sm focus:outline-none placeholder:text-slate-400" 
                            placeholder="Ask AI: 'Show me the average salary by department compared to market median...'"
                         />
                         <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
                             <Sparkles size={16} /> Generate
                         </button>
                     </div>
                 </div>

                 {/* Chart Area */}
                 <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center border-dashed border-2 border-slate-200 relative">
                     <div className="text-center">
                         <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                             <BarChart3 size={32} />
                         </div>
                         <h3 className="text-slate-800 font-medium">Canvas Empty</h3>
                         <p className="text-slate-400 text-sm mt-1">Drag fields here or ask AI to generate a chart</p>
                     </div>
                 </div>
             </div>
        </div>
    );
};

const WarningCenter = () => {
    return (
        <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-red-50 border border-red-100 p-6 rounded-xl">
                     <h3 className="text-red-800 font-bold text-lg mb-1">3 High Risks</h3>
                     <p className="text-red-600 text-sm opacity-80">Requires immediate attention</p>
                 </div>
                 <div className="bg-orange-50 border border-orange-100 p-6 rounded-xl">
                     <h3 className="text-orange-800 font-bold text-lg mb-1">5 Medium Risks</h3>
                     <p className="text-orange-600 text-sm opacity-80">Monitor closely</p>
                 </div>
                 <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
                     <h3 className="text-blue-800 font-bold text-lg mb-1">12 Low Risks</h3>
                     <p className="text-blue-600 text-sm opacity-80">Regular housekeeping</p>
                 </div>
             </div>

             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                 <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                     <h3 className="font-bold text-slate-800">Active Alerts</h3>
                     <button className="text-sm text-slate-500 flex items-center gap-1 hover:text-indigo-600"><Filter size={14}/> Filter</button>
                 </div>
                 <div className="divide-y divide-slate-100">
                     {ALERTS.map(alert => (
                         <div key={alert.id} className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                             <div className={`mt-1 p-2 rounded-full ${
                                 alert.severity === 'high' ? 'bg-red-100 text-red-600' :
                                 alert.severity === 'medium' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                             }`}>
                                 <AlertTriangle size={20} />
                             </div>
                             <div className="flex-1">
                                 <div className="flex justify-between items-start mb-1">
                                     <h4 className="font-bold text-slate-800">{alert.title}</h4>
                                     <span className="text-xs text-slate-400">{alert.date}</span>
                                 </div>
                                 <p className="text-sm text-slate-600 mb-3">{alert.desc}</p>
                                 <div className="flex gap-3">
                                     <button className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded hover:bg-indigo-700">Investigate</button>
                                     <button className="px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-medium rounded hover:bg-slate-50">Dismiss</button>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        </div>
    );
};