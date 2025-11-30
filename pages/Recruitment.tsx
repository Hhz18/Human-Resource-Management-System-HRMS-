import React from 'react';
import { MOCK_CANDIDATES } from '../constants';
import { MoreHorizontal, MessageSquare, Star, Paperclip, Plus } from 'lucide-react';
import { Candidate } from '../types';

const columns = [
  { id: 'New', label: 'New Applied', color: 'border-blue-500' },
  { id: 'Screening', label: 'Screening', color: 'border-purple-500' },
  { id: 'Interview', label: 'Interview', color: 'border-orange-500' },
  { id: 'Offer', label: 'Offer Sent', color: 'border-green-500' },
];

export const Recruitment: React.FC = () => {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Recruitment Pipeline</h1>
          <p className="text-slate-500">Track candidates from application to offer.</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">
            <span className="text-sm font-medium">Job: Sr. Designer</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200">
            <Plus size={18} />
            <span className="text-sm font-medium">Add Candidate</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max h-full">
          {columns.map((col) => {
            const candidates = MOCK_CANDIDATES.filter(c => c.stage === col.id);
            return (
              <div key={col.id} className="w-80 flex flex-col bg-slate-100/50 rounded-xl border border-slate-200 h-full">
                {/* Column Header */}
                <div className={`p-4 border-t-4 ${col.color} bg-white rounded-t-xl border-b border-slate-100 flex justify-between items-center`}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-700">{col.label}</h3>
                    <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">{candidates.length}</span>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button>
                </div>

                {/* Cards Container */}
                <div className="p-3 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                  {candidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                  <button className="w-full py-2 text-sm text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg border border-dashed border-slate-300 hover:border-indigo-300 transition-all flex items-center justify-center gap-2">
                    <Plus size={14} /> Add Card
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:shadow-md cursor-pointer transition-all group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded">{candidate.source}</span>
        <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600"><MoreHorizontal size={14} /></button>
      </div>
      <h4 className="font-bold text-slate-800">{candidate.name}</h4>
      <p className="text-xs text-indigo-600 mb-3">{candidate.role}</p>
      
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
