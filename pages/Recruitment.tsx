import React, { useState } from 'react';
import { MOCK_CANDIDATES, MOCK_JOBS, MOCK_INTERVIEWS, MOCK_TALENT_POOL } from '../constants';
import { 
  MoreHorizontal, MessageSquare, Star, Paperclip, Plus, ArrowRight, X, 
  Briefcase, Kanban, Calendar, PieChart as PieChartIcon, Sparkles, Filter,
  Users, Video, MapPin, Search, Clock, Database, RefreshCw, Tag, Globe, CheckSquare
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area
} from 'recharts';
import { Candidate, JobPosting, Interview, TalentProfile } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

type Tab = 'pipeline' | 'jobs' | 'interviews' | 'pool' | 'analytics';

export const Recruitment: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('pipeline');

  const renderContent = () => {
      switch(activeTab) {
          case 'pipeline': return <PipelineView />;
          case 'jobs': return <JobsView />;
          case 'interviews': return <InterviewsView />;
          case 'pool': return <TalentPoolView />;
          case 'analytics': return <RecruitmentAnalytics />;
          default: return <PipelineView />;
      }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col gap-6 shrink-0">
        <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{t.recruitment.title}</h1>
              <p className="text-slate-500">{t.recruitment.subtitle}</p>
            </div>
            {activeTab === 'pipeline' && (
               <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200">
                <Plus size={18} />
                <span className="text-sm font-medium">{t.recruitment.add}</span>
              </button>
            )}
             {activeTab === 'jobs' && (
               <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200">
                <Plus size={18} />
                <span className="text-sm font-medium">Create Job</span>
              </button>
            )}
             {activeTab === 'pool' && (
               <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-sm shadow-emerald-200">
                <RefreshCw size={18} />
                <span className="text-sm font-medium">Auto-Activate Talent</span>
              </button>
            )}
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 flex gap-6 overflow-x-auto">
            <TabButton active={activeTab === 'pipeline'} onClick={() => setActiveTab('pipeline')} icon={Kanban} label={t.recruitment.tabs.pipeline} />
            <TabButton active={activeTab === 'jobs'} onClick={() => setActiveTab('jobs')} icon={Briefcase} label={t.recruitment.tabs.jobs} />
            <TabButton active={activeTab === 'interviews'} onClick={() => setActiveTab('interviews')} icon={Calendar} label={t.recruitment.tabs.interviews} />
            <TabButton active={activeTab === 'pool'} onClick={() => setActiveTab('pool')} icon={Database} label={t.recruitment.tabs.pool} />
            <TabButton active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={PieChartIcon} label={t.recruitment.tabs.analytics} />
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

// --- 1. Pipeline View (Kanban) ---
const PipelineView = () => {
    const { t } = useLanguage();
    const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);

    const columns: { id: Candidate['stage'], label: string, color: string }[] = [
        { id: 'New', label: t.recruitment.cols.new, color: 'border-blue-500' },
        { id: 'Screening', label: t.recruitment.cols.screening, color: 'border-purple-500' },
        { id: 'Interview', label: t.recruitment.cols.interview, color: 'border-orange-500' },
        { id: 'Offer', label: t.recruitment.cols.offer, color: 'border-green-500' },
    ];

    const advanceCandidate = (id: string, currentStage: Candidate['stage']) => {
        const stages: Candidate['stage'][] = ['New', 'Screening', 'Interview', 'Offer', 'Hired'];
        const currIdx = stages.indexOf(currentStage);
        if(currIdx < stages.length - 1) {
            const nextStage = stages[currIdx + 1];
            setCandidates(candidates.map(c => c.id === id ? {...c, stage: nextStage} : c));
        }
    };

    return (
        <div className="h-full flex flex-col relative overflow-hidden">
             <div className="flex gap-4 mb-4 items-center">
                 <div className="relative max-w-xs w-full">
                     <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm" placeholder={t.recruitment.searchPlaceholder} />
                 </div>
                 <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                     <Filter size={16} /> Filter
                 </button>
                 <div className="flex items-center gap-2 ml-auto text-sm text-slate-500">
                     <Sparkles size={16} className="text-indigo-500" />
                     <span>{t.recruitment.aiMatching}</span>
                 </div>
             </div>
             
             <div className="flex-1 overflow-x-auto pb-4">
                <div className="flex gap-6 min-w-max h-full">
                {columns.map((col) => {
                    const colCandidates = candidates.filter(c => c.stage === col.id);
                    return (
                    <div key={col.id} className="w-80 flex flex-col bg-slate-100/50 rounded-xl border border-slate-200 h-full">
                        {/* Column Header */}
                        <div className={`p-4 border-t-4 ${col.color} bg-white rounded-t-xl border-b border-slate-100 flex justify-between items-center`}>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-700">{col.label}</h3>
                            <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">{colCandidates.length}</span>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button>
                        </div>

                        {/* Cards Container */}
                        <div className="p-3 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                        {colCandidates.map((candidate) => (
                            <CandidateCard 
                                key={candidate.id} 
                                candidate={candidate} 
                                onAdvance={() => advanceCandidate(candidate.id, candidate.stage)}
                            />
                        ))}
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
        </div>
    );
};

const CandidateCard: React.FC<{ candidate: Candidate; onAdvance: () => void }> = ({ candidate, onAdvance }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-all group relative">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded">{candidate.source}</span>
        <button 
            onClick={(e) => { e.stopPropagation(); onAdvance(); }}
            title="Advance to next stage"
            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 p-1 rounded transition-all"
        >
            <ArrowRight size={14} />
        </button>
      </div>
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-slate-800">{candidate.name}</h4>
        {candidate.matchScore && (
            <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                <Sparkles size={10} /> {candidate.matchScore}%
            </div>
        )}
      </div>
      <p className="text-xs text-slate-500 mb-3">{candidate.role}</p>
      
      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                    key={star} 
                    size={12} 
                    className={`${star <= candidate.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} 
                />
            ))}
        </div>
        <div className="flex gap-3 text-slate-400">
            <MessageSquare size={14} />
            <Paperclip size={14} />
        </div>
      </div>
    </div>
  );
};

// --- 2. Jobs View ---
const JobsView = () => {
    return (
        <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_JOBS.map(job => (
                    <div key={job.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg ${job.status === 'Published' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                                <Briefcase size={20} />
                            </div>
                            <div className="flex gap-1">
                                {job.channels.length > 0 && (
                                    <span className="flex items-center gap-1 text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">
                                        <Globe size={12} /> {job.channels.length}
                                    </span>
                                )}
                                <button className="text-slate-400 hover:text-indigo-600"><MoreHorizontal size={18} /></button>
                            </div>
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg mb-1">{job.title}</h3>
                        <p className="text-sm text-slate-500 mb-4">{job.department} • {job.location}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
                            <div className="flex items-center gap-1.5">
                                <Users size={16} className="text-slate-400" />
                                <span className="font-semibold">{job.applicantsCount}</span> Applicants
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar size={16} className="text-slate-400" />
                                <span>{job.postedDate}</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                             <button className="flex-1 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">View</button>
                             <button className="flex-1 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 flex items-center justify-center gap-2">
                                 <Globe size={14} /> 1-Click Publish
                             </button>
                        </div>
                    </div>
                ))}
             </div>
        </div>
    );
};

// ... remaining sub-components ...
const InterviewsView = () => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                 <h3 className="font-bold text-slate-800">Upcoming Interviews</h3>
                 <div className="flex gap-2">
                     <button className="text-xs font-medium bg-white border border-slate-200 px-3 py-1.5 rounded text-slate-600">Sync Calendar</button>
                 </div>
            </div>
            <div className="divide-y divide-slate-100">
                {MOCK_INTERVIEWS.map(interview => (
                    <div key={interview.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center justify-center w-12 h-12 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100">
                                <span className="text-xs font-bold uppercase">{interview.date.split('-')[1]}</span>
                                <span className="text-lg font-bold">{interview.date.split('-')[2]}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">{interview.candidateName}</h4>
                                <p className="text-sm text-slate-500">{interview.jobTitle} • {interview.type}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                             <div className="flex items-center gap-2 text-sm text-slate-600">
                                 <Clock size={16} className="text-slate-400" />
                                 {interview.time}
                             </div>
                             <div className="flex items-center gap-2 text-sm text-slate-600">
                                 <Users size={16} className="text-slate-400" />
                                 Interviewer: {interview.interviewer}
                             </div>
                             <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium hover:bg-indigo-100 border border-indigo-100">
                                 <CheckSquare size={14} /> Evaluate
                             </button>
                             {interview.meetingLink && (
                                 <a href={interview.meetingLink} target="_blank" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-full">
                                     <Video size={18} />
                                 </a>
                             )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TalentPoolView = () => {
    return (
        <div className="flex h-full gap-6">
            {/* Sidebar Filters */}
            <div className="w-64 flex flex-col gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-3 text-sm">Talent Segments</h3>
                    <ul className="space-y-1">
                        <li className="flex items-center justify-between p-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium text-sm cursor-pointer">
                            <span>All Candidates</span>
                            <span className="bg-indigo-200 px-2 py-0.5 rounded-full text-xs">1,240</span>
                        </li>
                         <li className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-600 text-sm cursor-pointer">
                            <span>Silver Medalists</span>
                            <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs text-slate-400">45</span>
                        </li>
                         <li className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-600 text-sm cursor-pointer">
                            <span>Future Leaders</span>
                            <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs text-slate-400">12</span>
                        </li>
                         <li className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-600 text-sm cursor-pointer">
                            <span>Alumni</span>
                            <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs text-slate-400">88</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-xl text-white shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={20} className="text-emerald-100" />
                        <h3 className="font-bold text-lg">AI Wake-Up</h3>
                    </div>
                    <p className="text-xs text-emerald-100 mb-4 opacity-90">
                        Automatically re-engage passive candidates who match your current open roles.
                    </p>
                    <button className="w-full py-2 bg-white text-emerald-700 rounded-lg text-sm font-bold hover:bg-emerald-50 shadow-sm">
                        Start Campaign
                    </button>
                </div>
            </div>

            {/* Main List */}
            <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Filter size={16} />
                        <span>Sort by: </span>
                        <select className="bg-transparent font-medium text-slate-700 focus:outline-none">
                            <option>AI Match Score</option>
                            <option>Last Contacted</option>
                            <option>Experience</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Search skills, companies..." className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                    {MOCK_TALENT_POOL.map((talent) => (
                        <div key={talent.id} className="p-4 hover:bg-slate-50 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-lg">
                                {talent.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-slate-800">{talent.name}</h4>
                                        <p className="text-sm text-slate-500">{talent.role} • {talent.experience}y Exp • {talent.location}</p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                            <Sparkles size={12} /> {talent.aiActivationScore}% Activation
                                        </div>
                                        <span className="text-xs text-slate-400 mt-1">Last contacted: {talent.lastContact}</span>
                                    </div>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {talent.skills.map(skill => (
                                        <span key={skill} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">
                                            {skill}
                                        </span>
                                    ))}
                                    {talent.tags.map(tag => (
                                        <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded border border-indigo-100">
                                            <Tag size={10} /> {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const RecruitmentAnalytics = () => {
    const funnelData = [
        { name: 'Applied', value: 120 },
        { name: 'Screened', value: 85 },
        { name: 'Interviewed', value: 45 },
        { name: 'Offered', value: 12 },
        { name: 'Hired', value: 8 },
    ];

    const sourceData = [
        { name: 'LinkedIn', value: 45 },
        { name: 'Indeed', value: 25 },
        { name: 'Referral', value: 20 },
        { name: 'Website', value: 10 },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-slate-800 mb-6">Recruitment Funnel</h3>
                 <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={funnelData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} />
                            <Tooltip cursor={{fill: 'transparent'}} />
                            <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={30} label={{position: 'right', fill: '#64748b'}} />
                        </BarChart>
                    </ResponsiveContainer>
                 </div>
             </div>

             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-slate-800 mb-6">Source ROI (Hires)</h3>
                 <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sourceData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{fill: 'transparent'}} />
                            <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                 </div>
             </div>
        </div>
    );
};