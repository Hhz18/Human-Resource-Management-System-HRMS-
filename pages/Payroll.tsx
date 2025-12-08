import React, { useState } from 'react';
import { 
  DollarSign, CreditCard, Send, FileText, BarChart3, 
  Settings, CheckCircle, AlertTriangle, Play, FileCheck, Layers
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { MOCK_PAYROLL, MOCK_SALARY_BANDS, MOCK_PAYROLL_BATCHES, MOCK_PAYROLL_ANOMALIES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { PayrollRecord } from '../types';

type PayrollTab = 'overview' | 'run' | 'structure' | 'payslips';

export const Payroll: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<PayrollTab>('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const renderContent = () => {
      switch(activeTab) {
          case 'overview': return <PayrollOverview formatCurrency={formatCurrency} />;
          case 'run': return <PayrollRun formatCurrency={formatCurrency} />;
          case 'structure': return <SalaryStructure formatCurrency={formatCurrency} />;
          case 'payslips': return <PayslipsView formatCurrency={formatCurrency} />;
          default: return <PayrollOverview formatCurrency={formatCurrency} />;
      }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col gap-6 shrink-0">
        <div className="flex justify-between items-center">
            <div>
            <h1 className="text-2xl font-bold text-slate-800">{t.payroll.title}</h1>
            <p className="text-slate-500">{t.payroll.subtitle}</p>
            </div>
            {activeTab === 'run' && (
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200">
                    <Play size={18} fill="currentColor" />
                    <span className="text-sm font-medium">{t.payroll.run.start}</span>
                </button>
            )}
        </div>

        <div className="border-b border-slate-200 flex gap-6 overflow-x-auto">
            <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={BarChart3} label={t.payroll.tabs.overview} />
            <TabButton active={activeTab === 'run'} onClick={() => setActiveTab('run')} icon={DollarSign} label={t.payroll.tabs.run} />
            <TabButton active={activeTab === 'structure'} onClick={() => setActiveTab('structure')} icon={Layers} label={t.payroll.tabs.structure} />
            <TabButton active={activeTab === 'payslips'} onClick={() => setActiveTab('payslips')} icon={FileText} label={t.payroll.tabs.payslips} />
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

// --- 1. Overview View ---
const PayrollOverview = ({ formatCurrency }: { formatCurrency: (v: number) => string }) => {
    const { t } = useLanguage();
    const costTrend = [
        { month: 'Oct', actual: 320000, budget: 330000 },
        { month: 'Nov', actual: 325000, budget: 330000 },
        { month: 'Dec', actual: 345000, budget: 330000 },
        { month: 'Jan', actual: 330000, budget: 340000 },
        { month: 'Feb', actual: 338100, budget: 340000 },
        { month: 'Mar', actual: 342850, budget: 340000 },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg lg:col-span-1">
                    <div className="flex items-center gap-3 mb-4 opacity-80">
                        <CreditCard size={24} />
                        <span className="font-medium">{t.payroll.overview.totalDisbursement}</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-2">$342,850.00</h2>
                    <p className="text-sm opacity-70">{t.payroll.overview.processingStatus}</p>
                    <div className="mt-8 pt-6 border-t border-white/20 flex justify-between">
                        <div>
                            <p className="text-xs opacity-60">{t.payroll.overview.avgSalary}</p>
                            <p className="font-bold text-lg">$6,200</p>
                        </div>
                         <div>
                            <p className="text-xs opacity-60">{t.payroll.overview.variance}</p>
                            <p className="font-bold text-lg text-red-200">+0.8%</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:col-span-2">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-800">{t.payroll.overview.laborCost}</h3>
                        <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-indigo-500 rounded-full"></div> {t.payroll.overview.actual}</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-300 rounded-full"></div> {t.payroll.overview.budget}</div>
                        </div>
                     </div>
                     <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={costTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val/1000}k`} />
                                <Tooltip cursor={{fill: 'transparent'}} formatter={(value: number) => formatCurrency(value)} />
                                <Bar dataKey="actual" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} />
                                <Bar dataKey="budget" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                     </div>
                </div>
            </div>

            {/* AI Cost Analysis */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-6 rounded-xl flex gap-4">
                 <div className="p-3 bg-emerald-100 rounded-full h-fit text-emerald-600">
                     <BarChart3 size={24} />
                 </div>
                 <div className="flex-1">
                     <h3 className="font-bold text-emerald-900 mb-1">AI Cost Optimization Insights</h3>
                     <p className="text-emerald-800 text-sm mb-3">
                         Overtime costs have risen by 12% in the R&D department due to the "Project Apollo" sprint. 
                         Consider hiring 2 contractors to balance the load, potentially saving <span className="font-bold">$4,500</span> per month.
                     </p>
                     <button className="text-xs font-semibold text-emerald-700 bg-white border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-50">
                         View Simulation
                     </button>
                 </div>
            </div>
        </div>
    );
};

// ... other sub-components ...
const PayrollRun = ({ formatCurrency }: { formatCurrency: (v: number) => string }) => {
    return (
        <div className="space-y-6">
            {/* Status Steps */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-800">Current Run: March 2024</h3>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">Processing</span>
                </div>
                <div className="relative flex justify-between">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0"></div>
                    <Step status="completed" label="Sync Data" />
                    <Step status="completed" label="Calculate" />
                    <Step status="active" label="AI Audit" />
                    <Step status="pending" label="Approval" />
                    <Step status="pending" label="Distribute" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Anomalies Panel */}
                <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-fit">
                    <div className="p-4 bg-orange-50 border-b border-orange-100 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-orange-600" />
                        <h3 className="font-bold text-orange-900">Smart Audit Results</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {MOCK_PAYROLL_ANOMALIES.map(anomaly => (
                            <div key={anomaly.id} className="p-4 hover:bg-slate-50">
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                                        anomaly.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>{anomaly.severity}</span>
                                    <button className="text-xs text-indigo-600 font-medium">Fix</button>
                                </div>
                                <p className="font-medium text-slate-800 text-sm mb-1">{anomaly.type}</p>
                                <p className="text-xs text-slate-500 mb-2">{anomaly.description}</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-600">
                                        {anomaly.employeeName.charAt(0)}
                                    </div>
                                    <span className="text-xs text-slate-600">{anomaly.employeeName}</span>
                                </div>
                            </div>
                        ))}
                         <div className="p-4 text-center">
                            <button className="text-sm text-slate-500 hover:text-indigo-600">View all 2 issues</button>
                        </div>
                    </div>
                </div>

                {/* Main Table */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                         <h3 className="font-bold text-slate-800">Calculation Preview</h3>
                         <div className="flex gap-2">
                             <button className="text-xs font-medium bg-white border border-slate-200 px-3 py-1.5 rounded text-slate-600">Export</button>
                         </div>
                    </div>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Employee</th>
                                <th className="px-6 py-4">Base</th>
                                <th className="px-6 py-4">Bonus/OT</th>
                                <th className="px-6 py-4">Deductions</th>
                                <th className="px-6 py-4">Net Pay</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_PAYROLL.map(record => (
                                <tr key={record.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-700">{record.employeeName}</td>
                                    <td className="px-6 py-4 text-slate-600">{formatCurrency(record.baseSalary)}</td>
                                    <td className="px-6 py-4 text-green-600">+{formatCurrency(record.bonus)}</td>
                                    <td className="px-6 py-4 text-red-500">-{formatCurrency(record.deductions)}</td>
                                    <td className="px-6 py-4 font-bold text-slate-800">{formatCurrency(record.netPay)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const Step = ({ status, label }: { status: 'completed' | 'active' | 'pending', label: string }) => {
    let bg = 'bg-slate-200';
    let text = 'text-slate-400';
    let icon = <span className="w-2 h-2 rounded-full bg-slate-400"></span>;

    if (status === 'completed') {
        bg = 'bg-green-600';
        text = 'text-green-700';
        icon = <CheckCircle size={16} className="text-white" />;
    } else if (status === 'active') {
        bg = 'bg-indigo-600';
        text = 'text-indigo-700';
        icon = <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>;
    }

    return (
        <div className="flex flex-col items-center gap-2 relative z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bg} shadow-sm border-2 border-white`}>
                {icon}
            </div>
            <span className={`text-xs font-medium ${text}`}>{label}</span>
        </div>
    );
};

const SalaryStructure = ({ formatCurrency }: { formatCurrency: (v: number) => string }) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Job Levels & Salary Bands</h3>
                <button className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100">
                    Auto-Adjust Bands
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                 <table className="w-full text-sm text-left">
                     <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                         <tr>
                             <th className="px-6 py-4">Level</th>
                             <th className="px-6 py-4">Min Salary</th>
                             <th className="px-6 py-4">Midpoint</th>
                             <th className="px-6 py-4">Max Salary</th>
                             <th className="px-6 py-4">Spread</th>
                             <th className="px-6 py-4 text-right">Actions</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                         {MOCK_SALARY_BANDS.map(band => {
                             const spread = Math.round(((band.max - band.min) / band.min) * 100);
                             return (
                                 <tr key={band.id} className="hover:bg-slate-50">
                                     <td className="px-6 py-4 font-bold text-slate-700">{band.level}</td>
                                     <td className="px-6 py-4 text-slate-600">{formatCurrency(band.min)}</td>
                                     <td className="px-6 py-4 text-indigo-600 font-medium">{formatCurrency(band.mid)}</td>
                                     <td className="px-6 py-4 text-slate-600">{formatCurrency(band.max)}</td>
                                     <td className="px-6 py-4">
                                         <span className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600">{spread}%</span>
                                     </td>
                                     <td className="px-6 py-4 text-right">
                                         <button className="text-indigo-600 hover:underline">Edit</button>
                                     </td>
                                 </tr>
                             );
                         })}
                     </tbody>
                 </table>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
                <Settings className="text-blue-600 shrink-0 mt-1" size={20} />
                <div>
                    <h4 className="font-bold text-blue-900 text-sm">Auto-Sync Enabled</h4>
                    <p className="text-blue-800 text-sm mt-1">
                        Salary bands are automatically synchronized with the latest market data and internal performance ratings. 
                        Next sync scheduled for: April 1st.
                    </p>
                </div>
            </div>
        </div>
    );
};

const PayslipsView = ({ formatCurrency }: { formatCurrency: (v: number) => string }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-800">Payroll History & Slips</h3>
                    <div className="flex gap-2">
                        <select className="text-sm border border-slate-200 rounded px-2 py-1">
                            <option>2024</option>
                            <option>2023</option>
                        </select>
                    </div>
                </div>
                <table className="w-full text-sm text-left">
                     <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
                         <tr>
                             <th className="px-6 py-4">Period</th>
                             <th className="px-6 py-4">Run Date</th>
                             <th className="px-6 py-4">Total Cost</th>
                             <th className="px-6 py-4">Headcount</th>
                             <th className="px-6 py-4">Status</th>
                             <th className="px-6 py-4 text-right">Actions</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                         {MOCK_PAYROLL_BATCHES.map(batch => (
                             <tr key={batch.id} className="hover:bg-slate-50">
                                 <td className="px-6 py-4 font-bold text-slate-700">{batch.period}</td>
                                 <td className="px-6 py-4 text-slate-500">{batch.runDate}</td>
                                 <td className="px-6 py-4 text-slate-700">{formatCurrency(batch.totalCost)}</td>
                                 <td className="px-6 py-4 text-slate-600">{batch.employeesCount}</td>
                                 <td className="px-6 py-4">
                                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                         batch.status === 'Distributed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                     }`}>
                                         {batch.status}
                                     </span>
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                     <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs flex items-center gap-1 justify-end w-full">
                                         <FileCheck size={14} /> View Slips
                                     </button>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                </table>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex justify-between items-center">
                 <div>
                     <h3 className="font-bold text-slate-800">Digital Signature Tracking</h3>
                     <p className="text-sm text-slate-500">Track employee acknowledgement of received payslips.</p>
                 </div>
                 <div className="flex gap-8">
                     <div className="text-center">
                         <p className="text-2xl font-bold text-green-600">92%</p>
                         <p className="text-xs text-slate-400">Signed (Feb)</p>
                     </div>
                     <div className="text-center">
                         <p className="text-2xl font-bold text-slate-600">8%</p>
                         <p className="text-xs text-slate-400">Pending</p>
                     </div>
                 </div>
            </div>
        </div>
    );
};