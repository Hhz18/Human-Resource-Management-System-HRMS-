import React from 'react';
import { Target, TrendingUp, CheckSquare, Award } from 'lucide-react';
import { MOCK_PERFORMANCE } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

export const Performance: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t.performance.title}</h1>
          <p className="text-slate-500">{t.performance.subtitle}</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm font-medium text-sm">
           {t.performance.newCycle}
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Target size={80}/></div>
            <h3 className="text-slate-500 font-medium text-sm mb-2">{t.performance.stats.completion}</h3>
            <p className="text-3xl font-bold text-slate-800">78%</p>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{width: '78%'}}></div>
            </div>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Award size={80}/></div>
            <h3 className="text-slate-500 font-medium text-sm mb-2">{t.performance.stats.topPerformer}</h3>
            <p className="text-3xl font-bold text-slate-800">Product Team</p>
            <p className="text-green-600 text-sm mt-2 flex items-center gap-1"><TrendingUp size={14}/> {t.performance.stats.vsLast}</p>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><CheckSquare size={80}/></div>
            <h3 className="text-slate-500 font-medium text-sm mb-2">{t.performance.stats.avgScore}</h3>
            <p className="text-3xl font-bold text-slate-800">4.2/5.0</p>
            <p className="text-slate-400 text-sm mt-2">{t.performance.stats.reviewsBase}</p>
         </div>
      </div>

      {/* Reviews Grid */}
      <div>
        <h3 className="font-bold text-slate-800 mb-4 text-lg">{t.performance.activeReviews}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_PERFORMANCE.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold">
                                {review.employeeName.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">{review.employeeName}</h4>
                                <p className="text-xs text-slate-500">{t.performance.reviewer}: {review.reviewer}</p>
                            </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-lg font-medium ${
                            review.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                            {review.status === 'Completed' ? 'Completed' : review.status === 'In Progress' ? 'In Progress' : review.status}
                        </span>
                    </div>
                    
                    <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-500">{t.performance.score}</span>
                            <span className="font-bold text-slate-800">{review.score > 0 ? review.score : '-'} / 100</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${review.score >= 90 ? 'bg-green-500' : review.score >= 75 ? 'bg-indigo-500' : 'bg-slate-300'}`} 
                                style={{width: `${review.score}%`}}
                            ></div>
                        </div>
                    </div>

                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg italic border border-slate-100">
                        "{review.feedback}"
                    </p>
                    
                    <button className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                        {t.performance.viewDetails}
                    </button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};