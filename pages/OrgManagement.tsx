import React, { useState } from 'react';
import { LayoutList, LayoutGrid, Filter, Plus, MoreHorizontal } from 'lucide-react';
import { MOCK_EMPLOYEES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

export const OrgManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t.org.title}</h1>
          <p className="text-slate-500">{t.org.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-lg border border-slate-200 flex">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <LayoutList size={18} />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <LayoutGrid size={18} />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">
            <Filter size={18} />
            <span className="text-sm font-medium">{t.org.filter}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200">
            <Plus size={18} />
            <span className="text-sm font-medium">{t.org.add}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_EMPLOYEES.map((emp) => (
            <div key={emp.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
              <div className="p-6 flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img src={emp.avatar} alt={emp.name} className="w-20 h-20 rounded-full object-cover border-4 border-slate-50" />
                  <span className={`absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full ${
                    emp.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'
                  }`}></span>
                </div>
                <h3 className="font-bold text-slate-800">{emp.name}</h3>
                <p className="text-sm text-indigo-600 font-medium mb-1">{emp.role}</p>
                <p className="text-xs text-slate-500">{emp.department}</p>
                
                <div className="mt-6 flex gap-2 w-full">
                  <button className="flex-1 py-2 bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-100">Profile</button>
                  <button className="flex-1 py-2 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg hover:bg-indigo-100">Org Chart</button>
                </div>
              </div>
            </div>
          ))}
          {/* Add New Card Placeholder */}
          <button className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors h-full min-h-[250px]">
            <Plus size={32} className="mb-2" />
            <span className="font-medium">{t.org.hire}</span>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_EMPLOYEES.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={emp.avatar} alt="" className="w-8 h-8 rounded-full" />
                    <span className="font-semibold text-slate-700">{emp.name}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{emp.role}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs">{emp.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      emp.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{emp.joinDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};