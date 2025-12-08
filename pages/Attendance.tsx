import React, { useState } from 'react';
import { 
  Calendar, Clock, AlertTriangle, CheckCircle, Download, 
  ChevronLeft, ChevronRight, Filter, Plus, PieChart as PieChartIcon, 
  MapPin, Smartphone, FileCheck, Moon, Sun, Coffee 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area
} from 'recharts';
import { MOCK_ATTENDANCE, SHIFT_DEFINITIONS, SCHEDULE_DATA, LEAVE_BALANCES, LEAVE_REQUESTS, OVERTIME_REQUESTS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { ShiftDefinition } from '../types';

type AttendanceTab = 'dashboard' | 'timesheets' | 'scheduling' | 'timeoff' | 'overtime';

export const Attendance: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<AttendanceTab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <AttendanceDashboard />;
      case 'timesheets': return <TimesheetsView />;
      case 'scheduling': return <SchedulingView />;
      case 'timeoff': return <TimeOffView />;
      case 'overtime': return <OvertimeView />;
      default: return <AttendanceDashboard />;
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header & Navigation */}
      <div className="flex flex-col gap-6 shrink-0">
        <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{t.attendance.title}</h1>
              <p className="text-slate-500">{t.attendance.subtitle}</p>
            </div>
            <div className="flex gap-3">
               <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 shadow-sm">
                 <Calendar size={18} /> <span className="text-sm">Mar 2024</span>
               </button>
               {activeTab === 'scheduling' && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm">
                    <Plus size={18} /> <span className="text-sm font-medium">Auto-Schedule</span>
                  </button>
               )}
            </div>
        </div>

        <div className="border-b border-slate-200 flex gap-6 overflow-x-auto">
            <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={PieChartIcon} label={t.attendance.tabs.dashboard} />
            <TabButton active={activeTab === 'scheduling'} onClick={() => setActiveTab('scheduling')} icon={Calendar} label={t.attendance.tabs.scheduling} />
            <TabButton active={activeTab === 'timesheets'} onClick={() => setActiveTab('timesheets')} icon={Clock} label={t.attendance.tabs.timesheets} />
            <TabButton active={activeTab === 'timeoff'} onClick={() => setActiveTab('timeoff')} icon={Coffee} label={t.attendance.tabs.timeoff} />
            <TabButton active={activeTab === 'overtime'} onClick={() => setActiveTab('overtime')} icon={Moon} label={t.attendance.tabs.overtime} />
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

// --- 1. Dashboard View ---
const AttendanceDashboard = () => {
    const { t } = useLanguage();
    const dailyStats = [
        { label: t.attendance.stats.present, value: 142, color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
        { label: t.attendance.stats.late, value: 12, color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock },
        { label: t.attendance.stats.leave, value: 8, color: 'text-blue-600', bg: 'bg-blue-50', icon: Coffee },
        { label: t.attendance.stats.absent, value: 3, color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle },
    ];

    const chartData = [
        { day: 'Mon', present: 145, late: 5 },
        { day: 'Tue', present: 142, late: 8 },
        { day: 'Wed', present: 148, late: 2 },
        { day: 'Thu', present: 140, late: 10 },
        { day: 'Fri', present: 138, late: 12 },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {dailyStats.map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                            <p className="text-xs text-slate-500">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-6">{t.attendance.trends}</h3>
                    <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Bar dataKey="present" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                                <Bar dataKey="late" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Anomaly Insights</h3>
                    <div className="space-y-4">
                        <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                             <div className="flex items-center gap-2 mb-1">
                                 <AlertTriangle size={16} className="text-red-600"/>
                                 <span className="font-semibold text-red-900 text-sm">High Absenteeism</span>
                             </div>
                             <p className="text-xs text-red-700">Sales Dept absenteeism is 5% higher than average this week.</p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                             <div className="flex items-center gap-2 mb-1">
                                 <Clock size={16} className="text-yellow-600"/>
                                 <span className="font-semibold text-yellow-900 text-sm">Consistent Lateness</span>
                             </div>
                             <p className="text-xs text-yellow-700">3 employees have been late more than 3 times.</p>
                        </div>
                         <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                             <div className="flex items-center gap-2 mb-1">
                                 <Moon size={16} className="text-blue-600"/>
                                 <span className="font-semibold text-blue-900 text-sm">Excessive Overtime</span>
                             </div>
                             <p className="text-xs text-blue-700">Engineering team exceeded OT budget by 12%.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ... other sub-components remain unchanged for brevity but inherit context ...
const SchedulingView = () => {
    const days = Array.from({length: 7}, (_, i) => i + 1);

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-white rounded-lg border border-slate-300 p-1">
                        <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft size={16}/></button>
                        <span className="px-3 text-sm font-medium">Mar 01 - Mar 07, 2024</span>
                        <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight size={16}/></button>
                    </div>
                    <div className="h-6 w-px bg-slate-300"></div>
                    <div className="flex gap-2">
                        {SHIFT_DEFINITIONS.slice(0, 3).map(shift => (
                            <div key={shift.id} className="flex items-center gap-1">
                                <span className={`w-3 h-3 rounded-full ${shift.color.split(' ')[0].replace('text', 'bg')}`}></span>
                                <span className="text-xs text-slate-600">{shift.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="text-xs font-medium text-indigo-600 px-3 py-1.5 bg-indigo-50 rounded-lg border border-indigo-100">Publish Schedule</button>
                    <button className="text-xs font-medium text-slate-600 px-3 py-1.5 bg-white rounded-lg border border-slate-300">Export</button>
                </div>
            </div>

            {/* Grid Header */}
            <div className="grid grid-cols-[200px_repeat(7,1fr)] border-b border-slate-200 bg-slate-50">
                <div className="p-3 text-xs font-semibold text-slate-500 uppercase">Employee</div>
                {days.map(d => (
                    <div key={d} className="p-3 text-center border-l border-slate-200">
                        <div className="text-xs font-semibold text-slate-500 uppercase">Day {d}</div>
                    </div>
                ))}
            </div>

            {/* Grid Body */}
            <div className="overflow-y-auto flex-1">
                {SCHEDULE_DATA.map((row) => (
                    <div key={row.employeeId} className="grid grid-cols-[200px_repeat(7,1fr)] border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <div className="p-3 flex items-center gap-3 border-r border-slate-100 bg-white sticky left-0 z-10">
                            <img src={row.avatar} className="w-8 h-8 rounded-full" alt="" />
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-slate-800 truncate">{row.employeeName}</p>
                                <p className="text-xs text-slate-500 truncate">{row.role}</p>
                            </div>
                        </div>
                        {days.map(d => {
                            const dayKey = d.toString().padStart(2, '0');
                            const shiftId = row.shifts[dayKey as keyof typeof row.shifts];
                            const shift = SHIFT_DEFINITIONS.find(s => s.id === shiftId);
                            return (
                                <div key={d} className="p-2 border-l border-slate-100 relative group cursor-pointer">
                                    {shift ? (
                                        <div className={`h-full w-full rounded-md flex items-center justify-center text-xs font-bold ${shift.color} border border-transparent group-hover:border-slate-300`}>
                                            {shift.code}
                                        </div>
                                    ) : (
                                        <div className="h-full w-full rounded-md flex items-center justify-center text-slate-300 group-hover:bg-slate-100 text-lg">+</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

const TimesheetsView = () => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                 <div className="flex items-center gap-2">
                     <Filter size={16} className="text-slate-400"/>
                     <span className="text-sm font-medium text-slate-600">All Departments</span>
                 </div>
                 <button className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100">
                     <FileCheck size={14}/> Sign & Confirm
                 </button>
             </div>
             <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                    <th className="px-6 py-4">Employee</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Check In</th>
                    <th className="px-6 py-4">Check Out</th>
                    <th className="px-6 py-4">Work Hours</th>
                    <th className="px-6 py-4">Location/Method</th>
                    <th className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {MOCK_ATTENDANCE.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-semibold text-slate-700">{record.employeeName}</td>
                        <td className="px-6 py-4 text-slate-500">{record.date}</td>
                        <td className="px-6 py-4 text-slate-600">{record.checkIn}</td>
                        <td className="px-6 py-4 text-slate-600">{record.checkOut}</td>
                        <td className="px-6 py-4 text-slate-600 font-mono">{record.workHours > 0 ? `${record.workHours}h` : '-'}</td>
                        <td className="px-6 py-4 text-slate-500 text-xs">
                             {record.location !== '-' && (
                                <div className="flex flex-col gap-0.5">
                                    <span className="flex items-center gap-1"><MapPin size={10}/> {record.location}</span>
                                    <span className="flex items-center gap-1"><Smartphone size={10}/> {record.device}</span>
                                </div>
                             )}
                        </td>
                        <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                            ${record.status === 'On Time' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                            ${record.status === 'Late' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                            ${record.status === 'Early Leave' ? 'bg-orange-50 text-orange-700 border-orange-200' : ''}
                            ${record.status === 'Absent' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                        `}>
                            {record.status}
                        </span>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const TimeOffView = () => {
    return (
        <div className="space-y-6">
            {/* Balances */}
            <h3 className="font-bold text-slate-800">My Leave Balances</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {LEAVE_BALANCES.map((bal, i) => {
                    const percentage = (bal.total - bal.used) / bal.total * 100;
                    return (
                        <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">
                             <div className={`absolute top-0 left-0 w-1 h-full ${bal.color}`}></div>
                             <div className="flex justify-between items-start mb-4">
                                 <div>
                                     <h4 className="font-semibold text-slate-700">{bal.type}</h4>
                                     <p className="text-xs text-slate-500">Valid until Dec 31</p>
                                 </div>
                                 <span className="text-2xl font-bold text-slate-800">{bal.total - bal.used} <span className="text-sm text-slate-400 font-normal">/ {bal.total} {bal.unit}</span></span>
                             </div>
                             <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                 <div className={`h-full rounded-full ${bal.color}`} style={{width: `${percentage}%`}}></div>
                             </div>
                             <p className="text-right text-xs text-slate-400 mt-2">{bal.used} {bal.unit} used</p>
                        </div>
                    );
                })}
            </div>

            {/* Requests Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm mt-8">
                 <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                     <h3 className="font-bold text-slate-800">Leave Requests</h3>
                     <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
                         <Plus size={16}/> New Request
                     </button>
                 </div>
                 <table className="w-full text-sm text-left">
                     <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                         <tr>
                             <th className="px-6 py-4">Employee</th>
                             <th className="px-6 py-4">Leave Type</th>
                             <th className="px-6 py-4">Duration</th>
                             <th className="px-6 py-4">Reason</th>
                             <th className="px-6 py-4">Status</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                         {LEAVE_REQUESTS.map(req => (
                             <tr key={req.id} className="hover:bg-slate-50">
                                 <td className="px-6 py-4 font-semibold text-slate-700">{req.employeeName}</td>
                                 <td className="px-6 py-4 text-slate-600">{req.type}</td>
                                 <td className="px-6 py-4">
                                     <div className="flex flex-col">
                                         <span className="text-slate-700 font-medium">{req.days} Days</span>
                                         <span className="text-xs text-slate-400">{req.startDate} - {req.endDate}</span>
                                     </div>
                                 </td>
                                 <td className="px-6 py-4 text-slate-500 italic">"{req.reason}"</td>
                                 <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                     req.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                     req.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                     {req.status}
                                    </span>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
            </div>
        </div>
    );
};

const OvertimeView = () => {
    return (
        <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg">
                     <h3 className="text-indigo-100 text-sm font-medium mb-1">OT Budget Usage (March)</h3>
                     <p className="text-3xl font-bold">142 hrs <span className="text-sm font-normal opacity-70">/ 200 hrs limit</span></p>
                     <div className="w-full bg-indigo-800/50 h-1.5 rounded-full mt-4 overflow-hidden">
                         <div className="bg-white h-full rounded-full" style={{width: '71%'}}></div>
                     </div>
                 </div>
                 <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                     <h3 className="text-slate-500 text-sm font-medium mb-1">Pending Approvals</h3>
                     <p className="text-3xl font-bold text-slate-800">5 Requests</p>
                     <p className="text-xs text-slate-400 mt-2">Requires Manager or HR approval</p>
                 </div>
             </div>

             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                 <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                     <h3 className="font-bold text-slate-800">Overtime Log</h3>
                     <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-medium">
                         Export Report
                     </button>
                 </div>
                 <table className="w-full text-sm text-left">
                     <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                         <tr>
                             <th className="px-6 py-4">Employee</th>
                             <th className="px-6 py-4">Date</th>
                             <th className="px-6 py-4">Hours</th>
                             <th className="px-6 py-4">Project/Reason</th>
                             <th className="px-6 py-4">Compensation</th>
                             <th className="px-6 py-4">Status</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                         {OVERTIME_REQUESTS.map(req => (
                             <tr key={req.id} className="hover:bg-slate-50">
                                 <td className="px-6 py-4 font-semibold text-slate-700">{req.employeeName}</td>
                                 <td className="px-6 py-4 text-slate-500">{req.date}</td>
                                 <td className="px-6 py-4 font-mono font-medium">{req.hours}h</td>
                                 <td className="px-6 py-4 text-slate-600">{req.project}</td>
                                 <td className="px-6 py-4">
                                     <span className={`px-2 py-1 rounded text-xs font-medium border ${
                                         req.compensation === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-purple-50 text-purple-700 border-purple-200'
                                     }`}>
                                         {req.compensation}
                                     </span>
                                 </td>
                                 <td className="px-6 py-4">
                                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                     req.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                    }`}>
                                     {req.status}
                                    </span>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
            </div>
        </div>
    );
};
