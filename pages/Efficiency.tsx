import React, { useState } from 'react';
import { 
  Users, TrendingUp, Target, Award, ArrowUpRight, ArrowDownRight, 
  UserCheck, Briefcase, ChevronRight, Zap, Crown, BarChart3, Grip
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, ComposedChart, Line
} from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

type EfficiencyTab = 'workforce' | 'talent' | 'org';

export const Efficiency: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<EfficiencyTab>('workforce');

  const renderContent = () => {
    switch (activeTab) {
      case 'workforce': return <WorkforceEfficiency />;
      case 'talent': return <TalentEfficiency />;
      case 'org': return <OrgEfficiency />;
      default: return <WorkforceEfficiency />;
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col gap-6 shrink-0">
        <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{t.efficiency.title}</h1>
              <p className="text-slate-500">{t.efficiency.subtitle}</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200">
                <BarChart3 size={18} />
                <span className="text-sm font-medium">{t.analytics.export}</span>
            </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 flex gap-6 overflow-x-auto">
            <TabButton active={activeTab === 'workforce'} onClick={() => setActiveTab('workforce')} icon={Briefcase} label={t.efficiency.tabs.workforce} />
            <TabButton active={activeTab === 'talent'} onClick={() => setActiveTab('talent')} icon={UserCheck} label={t.efficiency.tabs.talent} />
            <TabButton active={activeTab === 'org'} onClick={() => setActiveTab('org')} icon={Target} label={t.efficiency.tabs.org} />
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

// --- 1. Workforce Efficiency ---
const WorkforceEfficiency = () => {
    const { t } = useLanguage();
    const headcountData = [
        { month: 'Q1', budget: 120, actual: 115, efficiency: 98 },
        { month: 'Q2', budget: 130, actual: 125, efficiency: 96 },
        { month: 'Q3', budget: 145, actual: 148, efficiency: 95 },
        { month: 'Q4', budget: 160, actual: 155, efficiency: 99 },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-medium text-slate-500 mb-2">{t.efficiency.metrics.revenue}</h3>
                    <p className="text-3xl font-bold text-slate-800">$245k</p>
                    <span className="text-xs text-green-600 flex items-center gap-1 mt-2 font-medium bg-green-50 w-fit px-1.5 py-0.5 rounded">
                        <ArrowUpRight size={12}/> +12% vs last year
                    </span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-medium text-slate-500 mb-2">{t.efficiency.metrics.utilization}</h3>
                    <p className="text-3xl font-bold text-slate-800">96.8%</p>
                    <span className="text-xs text-orange-600 flex items-center gap-1 mt-2 font-medium bg-orange-50 w-fit px-1.5 py-0.5 rounded">
                        <ArrowDownRight size={12}/> -1.2% (Approaching Cap)
                    </span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-medium text-slate-500 mb-2">{t.efficiency.metrics.costRatio}</h3>
                    <p className="text-3xl font-bold text-slate-800">28%</p>
                    <span className="text-xs text-green-600 flex items-center gap-1 mt-2 font-medium bg-green-50 w-fit px-1.5 py-0.5 rounded">
                        <ArrowDownRight size={12}/> Optimized (-2%)
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                     <h3 className="font-bold text-slate-800 mb-6">{t.efficiency.metrics.budgetTitle}</h3>
                     <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={headcountData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} unit="%" />
                                <Tooltip />
                                <Bar yAxisId="left" dataKey="actual" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} name="Actual" />
                                <Line yAxisId="left" type="monotone" dataKey="budget" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" name="Budget" />
                                <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} name="Efficiency" />
                            </ComposedChart>
                        </ResponsiveContainer>
                     </div>
                 </div>

                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                     <h3 className="font-bold text-slate-800 mb-4">{t.efficiency.metrics.scheduleTitle}</h3>
                     <div className="space-y-6">
                         <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-between">
                             <div>
                                 <p className="text-sm font-medium text-indigo-900">{t.efficiency.metrics.matchRate}</p>
                                 <p className="text-2xl font-bold text-indigo-700">94%</p>
                             </div>
                             <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-indigo-600">
                                 <Zap size={20} />
                             </div>
                         </div>
                         <div>
                             <h4 className="text-sm font-semibold text-slate-700 mb-3">{t.efficiency.metrics.deviations}</h4>
                             <div className="space-y-3">
                                 {[
                                     { name: 'R&D', val: '2%', color: 'bg-green-500' },
                                     { name: 'Sales', val: '12%', color: 'bg-red-500' },
                                     { name: 'Operations', val: '5%', color: 'bg-yellow-500' },
                                 ].map((d, i) => (
                                     <div key={i} className="flex items-center justify-between text-sm">
                                         <span className="text-slate-600">{d.name}</span>
                                         <div className="flex items-center gap-2">
                                             <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                 <div className={`h-full ${d.color}`} style={{width: d.val.replace('%', '') + '0%'}}></div>
                                             </div>
                                             <span className="text-slate-700 font-medium w-8 text-right">{d.val}</span>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    );
};

// --- 2. Talent Efficiency (9-Box) ---
const TalentEfficiency = () => {
    const { t } = useLanguage();
    // Mock 9-Box Data
    const boxes = [
        { id: 9, label: 'Star', color: 'bg-green-100 border-green-200 text-green-800', employees: ['Sarah Lin', 'Alex J.'] },
        { id: 8, label: 'High Performer', color: 'bg-emerald-50 border-emerald-200 text-emerald-800', employees: ['Michael C.'] },
        { id: 7, label: 'High Potential', color: 'bg-emerald-50 border-emerald-200 text-emerald-800', employees: [] },
        { id: 6, label: 'Core Performer', color: 'bg-indigo-50 border-indigo-200 text-indigo-800', employees: ['David K.'] },
        { id: 5, label: 'Core Employee', color: 'bg-slate-50 border-slate-200 text-slate-600', employees: ['Sam S.', 'Linda W.'] },
        { id: 4, label: 'Inconsistent', color: 'bg-orange-50 border-orange-200 text-orange-800', employees: ['John D.'] },
        { id: 3, label: 'Potential Gem', color: 'bg-yellow-50 border-yellow-200 text-yellow-800', employees: [] },
        { id: 2, label: 'Risk', color: 'bg-red-50 border-red-200 text-red-800', employees: [] },
        { id: 1, label: 'Underperformer', color: 'bg-red-100 border-red-200 text-red-800', employees: ['Tom H.'] },
    ];

    return (
        <div className="space-y-6">
            <div className="flex gap-6 h-[600px]">
                {/* 9-Box Grid */}
                <div className="flex-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800">{t.efficiency.talent.grid}</h3>
                        <div className="flex gap-2">
                             <div className="text-xs flex items-center gap-1 text-slate-500"><span className="w-2 h-2 rounded-full bg-green-500"></span> {t.efficiency.talent.promote}</div>
                             <div className="text-xs flex items-center gap-1 text-slate-500"><span className="w-2 h-2 rounded-full bg-red-500"></span> {t.efficiency.talent.action}</div>
                        </div>
                    </div>
                    
                    <div className="flex-1 relative">
                        {/* Y-Axis Label */}
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-bold text-slate-400 tracking-widest uppercase">
                            {t.efficiency.talent.potential}
                        </div>
                        {/* X-Axis Label */}
                        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400 tracking-widest uppercase">
                            {t.efficiency.talent.performance}
                        </div>

                        <div className="grid grid-cols-3 grid-rows-3 gap-2 h-full w-full">
                             {[7, 8, 9, 4, 5, 6, 1, 2, 3].map(boxId => {
                                 const box = boxes.find(b => b.id === boxId)!;
                                 return (
                                     <div key={boxId} className={`rounded-lg border p-3 flex flex-col gap-2 transition-all hover:shadow-md ${box.color}`}>
                                         <span className="text-xs font-bold opacity-70 uppercase tracking-wider">{box.label}</span>
                                         <div className="flex flex-wrap gap-1">
                                             {box.employees.map((emp, i) => (
                                                 <div key={i} className="bg-white/80 px-2 py-1 rounded text-xs font-medium shadow-sm backdrop-blur-sm cursor-grab active:cursor-grabbing">
                                                     {emp}
                                                 </div>
                                             ))}
                                         </div>
                                     </div>
                                 )
                             })}
                        </div>
                    </div>
                </div>

                {/* Succession List */}
                <div className="w-80 bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-y-auto">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Crown size={18} className="text-yellow-500" /> {t.efficiency.talent.succession}
                    </h3>
                    <div className="space-y-6">
                        {[
                            { role: 'VP of Sales', holder: 'Amanda Lo', successors: [{ name: 'John Doe', readiness: 'Ready Now', score: 95 }, { name: 'Alice W.', readiness: '1-2 Years', score: 82 }] },
                            { role: 'CTO', holder: 'Eleanor Pena', successors: [{ name: 'Michael Chen', readiness: 'Ready Now', score: 98 }] },
                            { role: 'Head of Product', holder: 'Vacant', successors: [{ name: 'Sarah Lin', readiness: 'Ready < 1 Year', score: 88 }] },
                        ].map((item, i) => (
                            <div key={i} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                                <div className="mb-2">
                                    <p className="text-sm font-bold text-slate-800">{item.role}</p>
                                    <p className="text-xs text-slate-500">Current: {item.holder}</p>
                                </div>
                                <div className="space-y-2 pl-3 border-l-2 border-slate-100">
                                    {item.successors.map((succ, j) => (
                                        <div key={j} className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                 <div className="w-6 h-6 rounded-full bg-slate-200 text-[10px] flex items-center justify-center font-bold text-slate-600">
                                                     {succ.name.charAt(0)}
                                                 </div>
                                                 <span className="text-xs font-medium text-slate-700">{succ.name}</span>
                                            </div>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                                                succ.readiness.includes('Now') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                            }`}>{succ.readiness}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 3. Organizational Efficiency ---
const OrgEfficiency = () => {
    const { t } = useLanguage();
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* OKR Tracking */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Target size={18} className="text-red-500" /> {t.efficiency.org.okr}
                        </h3>
                        <span className="text-sm font-bold text-slate-700">Q1 Progress: 78%</span>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-slate-700">Objective 1: Market Expansion</span>
                                <span className="text-slate-500">85%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full w-[85%]"></div>
                            </div>
                            <div className="mt-2 space-y-1">
                                <p className="text-xs text-slate-500 flex items-center gap-1"><UserCheck size={10}/> KR1: Launch in 3 new cities (Done)</p>
                                <p className="text-xs text-slate-500 flex items-center gap-1"><UserCheck size={10}/> KR2: Acquire 10k users (90%)</p>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-slate-100">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-slate-700">Objective 2: Product Innovation</span>
                                <span className="text-slate-500">60%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-yellow-500 h-full w-[60%]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instant Incentives */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Award size={18} className="text-purple-500" /> {t.efficiency.org.incentive}
                        </h3>
                        <button className="text-xs font-medium text-indigo-600 border border-indigo-200 px-3 py-1 rounded hover:bg-indigo-50">Send Kudos</button>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex gap-4 items-start p-3 bg-slate-50 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-xl">🏆</div>
                            <div>
                                <p className="text-sm text-slate-800"><span className="font-bold">Sarah Lin</span> received "Customer Hero" badge.</p>
                                <p className="text-xs text-slate-500 mt-1">"For handling the critical outage with grace and speed."</p>
                                <p className="text-[10px] text-slate-400 mt-2">2 hours ago • +500 Points</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start p-3 bg-slate-50 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">💡</div>
                            <div>
                                <p className="text-sm text-slate-800"><span className="font-bold">David Kim</span> received "Innovator" badge.</p>
                                <p className="text-xs text-slate-500 mt-1">"Implemented a new caching layer reducing latency by 40%."</p>
                                <p className="text-[10px] text-slate-400 mt-2">Yesterday • +300 Points</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Multi-Dimensional Dashboard (Cockpit Snippet) */}
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <Grip size={150} />
                </div>
                <div className="relative z-10 flex justify-between items-end">
                     <div>
                         <h3 className="text-xl font-bold mb-2">{t.efficiency.org.cockpit}</h3>
                         <p className="text-slate-300 text-sm max-w-lg">
                             {t.efficiency.org.cockpitDesc}
                         </p>
                     </div>
                     <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all flex items-center gap-2">
                         <Zap size={18} /> {t.efficiency.org.launch}
                     </button>
                </div>
            </div>
        </div>
    );
};