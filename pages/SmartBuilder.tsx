import React from 'react';
import { LayoutGrid, Plus, FileText, Settings, Database } from 'lucide-react';

export const SmartBuilder: React.FC = () => {
    const apps = [
        { name: 'Store Performance', type: 'Form', users: 120, icon: FileText, color: 'bg-orange-500' },
        { name: 'Travel Expenses', type: 'Workflow', users: 450, icon: Settings, color: 'bg-blue-500' },
        { name: 'Asset Tracking', type: 'Database', users: 85, icon: Database, color: 'bg-emerald-500' },
    ];

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Smart Builder (aPaaS)</h1>
                    <p className="text-slate-500">Build custom apps and workflows without code.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200">
                    <Plus size={18} />
                    <span className="text-sm font-medium">Create App</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Create New Card */}
                <div className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors cursor-pointer bg-slate-50 hover:bg-white h-64">
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                        <Plus size={24} />
                    </div>
                    <h3 className="font-semibold text-lg">Blank Application</h3>
                    <p className="text-sm">Start from scratch</p>
                </div>

                {/* Existing Apps */}
                {apps.map((app, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 h-64 flex flex-col justify-between">
                        <div>
                            <div className={`w-12 h-12 rounded-lg ${app.color} flex items-center justify-center text-white mb-4 shadow-sm`}>
                                <app.icon size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800">{app.name}</h3>
                            <p className="text-slate-500 text-sm">{app.type}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
                            <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{app.users} Users</span>
                            <button className="text-sm text-indigo-600 hover:underline">Edit App</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
