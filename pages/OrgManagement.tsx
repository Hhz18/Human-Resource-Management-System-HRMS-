import React, { useState } from 'react';
import { 
  LayoutList, LayoutGrid, Filter, Plus, MoreHorizontal, X, Save, 
  Users, GitBranch, GitPullRequest, FileText, Shield, Search, 
  ChevronRight, ChevronDown, Clock, AlertCircle, CheckCircle, Upload, PenTool
} from 'lucide-react';
import { MOCK_EMPLOYEES, MOCK_ORG_TREE, MOCK_HR_PROCESSES, MOCK_CONTRACTS, MOCK_ROLES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { Employee, DepartmentNode, HRProcess, Contract, RolePermission } from '../types';

type Tab = 'directory' | 'structure' | 'workflows' | 'contracts' | 'permissions';

export const OrgManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('directory');
  const { t } = useLanguage();

  const renderContent = () => {
    switch(activeTab) {
      case 'directory': return <DirectoryView />;
      case 'structure': return <StructureView />;
      case 'workflows': return <WorkflowsView />;
      case 'contracts': return <ContractsView />;
      case 'permissions': return <PermissionsView />;
      default: return <DirectoryView />;
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-6 shrink-0">
        <div className="flex justify-between items-center">
            <div>
            <h1 className="text-2xl font-bold text-slate-800">{t.org.title}</h1>
            <p className="text-slate-500">{t.org.subtitle}</p>
            </div>
            {activeTab === 'directory' && (
                 <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200">
                    <Plus size={18} />
                    <span className="text-sm font-medium">{t.org.add}</span>
                </button>
            )}
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 flex gap-6 overflow-x-auto">
            <TabItem 
                active={activeTab === 'directory'} 
                onClick={() => setActiveTab('directory')} 
                icon={Users} label={t.org.tabs.directory} 
            />
            <TabItem 
                active={activeTab === 'structure'} 
                onClick={() => setActiveTab('structure')} 
                icon={GitBranch} label={t.org.tabs.structure} 
            />
            <TabItem 
                active={activeTab === 'workflows'} 
                onClick={() => setActiveTab('workflows')} 
                icon={GitPullRequest} label={t.org.tabs.workflows} 
            />
            <TabItem 
                active={activeTab === 'contracts'} 
                onClick={() => setActiveTab('contracts')} 
                icon={FileText} label={t.org.tabs.contracts} 
            />
            <TabItem 
                active={activeTab === 'permissions'} 
                onClick={() => setActiveTab('permissions')} 
                icon={Shield} label={t.org.tabs.permissions} 
            />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto pt-2">
         {renderContent()}
      </div>
    </div>
  );
};

const TabItem = ({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
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

// --- 1. Directory View ---
const DirectoryView = () => {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const { t } = useLanguage();

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder={t.org.searchPlaceholder} 
                        className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50'}`}><LayoutList size={20}/></button>
                    <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50'}`}><LayoutGrid size={20}/></button>
                    <div className="w-px h-8 bg-slate-200 mx-1"></div>
                    <button className="flex items-center gap-2 px-3 py-2 text-slate-600 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">
                        <Filter size={16}/> {t.org.filter}
                    </button>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {MOCK_EMPLOYEES.map(emp => (
                        <div key={emp.id} onClick={() => setSelectedEmployee(emp)} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group p-6 flex flex-col items-center text-center">
                            <div className="relative mb-4">
                                <img src={emp.avatar} alt={emp.name} className="w-20 h-20 rounded-full object-cover border-4 border-slate-50" />
                                <span className={`absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full ${emp.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                            </div>
                            <h3 className="font-bold text-slate-800">{emp.name}</h3>
                            <p className="text-sm text-indigo-600 font-medium mb-1">{emp.role}</p>
                            <p className="text-xs text-slate-500">{emp.department}</p>
                        </div>
                    ))}
                    <button className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors h-full min-h-[200px]">
                        <Plus size={32} className="mb-2" />
                        <span className="font-medium">Quick Hire</span>
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Join Date</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_EMPLOYEES.map(emp => (
                                <tr key={emp.id} onClick={() => setSelectedEmployee(emp)} className="hover:bg-slate-50 cursor-pointer">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <img src={emp.avatar} className="w-8 h-8 rounded-full"/>
                                        <span className="font-semibold text-slate-700">{emp.name}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{emp.role}</td>
                                    <td className="px-6 py-4 text-slate-600">{emp.department}</td>
                                    <td className="px-6 py-4"><span className={`px-2 py-0.5 rounded text-xs font-medium ${emp.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100'}`}>{emp.status}</span></td>
                                    <td className="px-6 py-4 text-slate-500">{emp.joinDate}</td>
                                    <td className="px-6 py-4 text-right"><MoreHorizontal size={16} className="text-slate-400"/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedEmployee && (
                <ProfileModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
            )}
        </div>
    );
};

// ... existing code for other components ...
const OrgNode: React.FC<{ node: DepartmentNode }> = ({ node }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-white border border-slate-200 shadow-sm rounded-lg p-3 w-48 text-center relative z-10 hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer">
                <div className="font-bold text-slate-800 text-sm truncate">{node.name}</div>
                <div className="text-xs text-indigo-600 mb-2">{node.manager}</div>
                <div className="text-[10px] text-slate-400 bg-slate-50 rounded-full px-2 py-0.5 inline-block">
                    {node.headcount} Members
                </div>
                {/* Connector Line Top */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-slate-300"></div>
            </div>
            
            {node.children && node.children.length > 0 && (
                <div className="relative pt-8 flex gap-8">
                     {/* Horizontal Line Connector */}
                     <div className="absolute top-4 left-0 right-0 h-px bg-slate-300 mx-24"></div>
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-slate-300"></div>
                     
                    {node.children.map(child => (
                        <OrgNode key={child.id} node={child} />
                    ))}
                </div>
            )}
        </div>
    );
};

const StructureView = () => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[600px] relative overflow-hidden">
            <div className="absolute top-4 right-4 flex gap-2">
                 <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">Snapshot</button>
                 <select className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 bg-white">
                     <option>View: Administrative</option>
                     <option>View: Project Based</option>
                 </select>
            </div>
            
            <div className="flex flex-col items-center pt-8 overflow-x-auto">
                {MOCK_ORG_TREE.map(node => <OrgNode key={node.id} node={node} />)}
            </div>
        </div>
    );
};

const WorkflowsView = () => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                 <h3 className="font-semibold text-slate-800">Process Center</h3>
                 <button className="text-xs text-indigo-600 font-medium">View All History</button>
             </div>
             <table className="w-full text-sm text-left">
                <thead className="text-slate-500 font-medium border-b border-slate-100 bg-white">
                    <tr>
                        <th className="px-6 py-4">Process Type</th>
                        <th className="px-6 py-4">Employee</th>
                        <th className="px-6 py-4">Request Date</th>
                        <th className="px-6 py-4">Current Step</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {MOCK_HR_PROCESSES.map(proc => (
                        <tr key={proc.id} className="hover:bg-slate-50">
                             <td className="px-6 py-4">
                                 <div className="flex items-center gap-2">
                                     <div className={`p-1.5 rounded-md ${
                                         proc.type === 'Onboarding' ? 'bg-blue-100 text-blue-600' : 
                                         proc.type === 'Promotion' ? 'bg-purple-100 text-purple-600' :
                                         proc.type === 'Resignation' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                                     }`}>
                                         <GitPullRequest size={14} />
                                     </div>
                                     <span className="font-medium text-slate-700">{proc.type}</span>
                                 </div>
                             </td>
                             <td className="px-6 py-4">
                                 <div>
                                     <p className="font-medium text-slate-800">{proc.employeeName}</p>
                                     <p className="text-xs text-slate-500">{proc.department}</p>
                                 </div>
                             </td>
                             <td className="px-6 py-4 text-slate-500">{proc.requestDate}</td>
                             <td className="px-6 py-4 text-slate-600">
                                 <div className="flex items-center gap-2">
                                     <Clock size={14} className="text-slate-400"/>
                                     {proc.currentStep}
                                 </div>
                             </td>
                             <td className="px-6 py-4">
                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                     proc.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                     proc.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                     proc.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                                 }`}>
                                     {proc.status}
                                 </span>
                             </td>
                             <td className="px-6 py-4 text-right">
                                 <button className="text-indigo-600 hover:text-indigo-700 font-medium text-xs">Details</button>
                             </td>
                        </tr>
                    ))}
                </tbody>
             </table>
        </div>
    );
};

const ContractsView = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg">
                     <h3 className="font-medium opacity-90 mb-2">Total Active Contracts</h3>
                     <p className="text-3xl font-bold">1,248</p>
                     <div className="mt-4 flex gap-2 text-xs opacity-75">
                         <span className="bg-white/20 px-2 py-1 rounded">Perm: 1,100</span>
                         <span className="bg-white/20 px-2 py-1 rounded">Fixed: 148</span>
                     </div>
                 </div>
                 <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                     <div>
                         <h3 className="text-slate-500 font-medium mb-1">Expiring Soon (30 days)</h3>
                         <p className="text-3xl font-bold text-amber-500">12</p>
                         <button className="text-xs text-indigo-600 font-medium mt-2">View List</button>
                     </div>
                     <AlertCircle size={40} className="text-amber-100" />
                 </div>
                 <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                     <div>
                         <h3 className="text-slate-500 font-medium mb-1">Pending Signatures</h3>
                         <p className="text-3xl font-bold text-blue-500">5</p>
                         <button className="text-xs text-indigo-600 font-medium mt-2">Remind All</button>
                     </div>
                     <PenTool size={40} className="text-blue-100" />
                 </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4">Employee</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Duration</th>
                            <th className="px-6 py-4">End Date</th>
                            <th className="px-6 py-4">E-Signature</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {MOCK_CONTRACTS.map(ct => (
                            <tr key={ct.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-semibold text-slate-700">{ct.employeeName}</td>
                                <td className="px-6 py-4 text-slate-600">{ct.contractType}</td>
                                <td className="px-6 py-4 text-slate-500 text-xs">{ct.startDate} ~ {ct.endDate}</td>
                                <td className="px-6 py-4 font-medium text-slate-700">{ct.endDate}</td>
                                <td className="px-6 py-4">
                                    {ct.digitalSignature ? (
                                        <span className="flex items-center gap-1 text-green-600 text-xs"><CheckCircle size={14}/> Signed</span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-slate-400 text-xs"><Clock size={14}/> Pending</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                        ct.status === 'Active' ? 'bg-green-100 text-green-700' :
                                        ct.status === 'Expiring Soon' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                    }`}>{ct.status}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-indigo-600"><MoreHorizontal size={16}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PermissionsView = () => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-100">
                 <h2 className="text-lg font-bold text-slate-800">Role-Based Access Control (RBAC)</h2>
                 <p className="text-slate-500 text-sm">Manage user roles and data access permissions.</p>
             </div>
             <table className="w-full text-sm text-left">
                 <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                     <tr>
                         <th className="px-6 py-4">Role Name</th>
                         <th className="px-6 py-4">Description</th>
                         <th className="px-6 py-4">Users Assigned</th>
                         <th className="px-6 py-4">Access Level</th>
                         <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                     {MOCK_ROLES.map(role => (
                         <tr key={role.id} className="hover:bg-slate-50">
                             <td className="px-6 py-4 font-bold text-slate-700 flex items-center gap-2">
                                 <Shield size={16} className="text-indigo-500" />
                                 {role.roleName}
                             </td>
                             <td className="px-6 py-4 text-slate-600">{role.description}</td>
                             <td className="px-6 py-4 text-slate-600">
                                 <div className="flex items-center gap-2">
                                     <Users size={14} className="text-slate-400"/>
                                     {role.usersCount}
                                 </div>
                             </td>
                             <td className="px-6 py-4">
                                 <span className={`px-2 py-1 rounded text-xs border ${
                                     role.accessLevel === 'Full' ? 'bg-red-50 text-red-700 border-red-200' :
                                     role.accessLevel === 'Read/Write' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 text-slate-700 border-slate-200'
                                 }`}>
                                     {role.accessLevel}
                                 </span>
                             </td>
                             <td className="px-6 py-4 text-right">
                                 <button className="text-indigo-600 font-medium hover:underline text-xs">Edit Permissions</button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
        </div>
    );
};

const ProfileModal = ({ employee, onClose }: { employee: Employee, onClose: () => void }) => {
    const [tab, setTab] = useState<'info' | 'timeline' | 'docs'>('info');

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
            <div className="w-full max-w-lg bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                    <div className="flex gap-4">
                        <img src={employee.avatar} className="w-16 h-16 rounded-full border-4 border-white shadow-sm" />
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">{employee.name}</h2>
                            <p className="text-indigo-600 font-medium">{employee.role}</p>
                            <p className="text-sm text-slate-500">{employee.department} • {employee.location}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={24}/></button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-200 px-6">
                    <button onClick={() => setTab('info')} className={`py-3 px-4 text-sm font-medium border-b-2 ${tab === 'info' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'}`}>Profile Info</button>
                    <button onClick={() => setTab('timeline')} className={`py-3 px-4 text-sm font-medium border-b-2 ${tab === 'timeline' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'}`}>Timeline</button>
                    <button onClick={() => setTab('docs')} className={`py-3 px-4 text-sm font-medium border-b-2 ${tab === 'docs' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'}`}>Documents</button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {tab === 'info' && (
                        <div className="space-y-6">
                             <div className="grid grid-cols-2 gap-4">
                                 <div>
                                     <label className="block text-xs text-slate-500 uppercase font-semibold mb-1">Email</label>
                                     <p className="text-slate-800">{employee.email}</p>
                                 </div>
                                 <div>
                                     <label className="block text-xs text-slate-500 uppercase font-semibold mb-1">Phone</label>
                                     <p className="text-slate-800">{employee.phone}</p>
                                 </div>
                                 <div>
                                     <label className="block text-xs text-slate-500 uppercase font-semibold mb-1">Employee ID</label>
                                     <p className="text-slate-800">EMP-{employee.id.padStart(4, '0')}</p>
                                 </div>
                                 <div>
                                     <label className="block text-xs text-slate-500 uppercase font-semibold mb-1">Join Date</label>
                                     <p className="text-slate-800">{employee.joinDate}</p>
                                 </div>
                             </div>
                             
                             <div className="pt-6 border-t border-slate-100">
                                 <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                     <Users size={18} className="text-indigo-500"/> Team & Reporting
                                 </h3>
                                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-3">
                                     <div className="flex items-center gap-3">
                                         <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">MP</div>
                                         <div>
                                             <p className="text-sm font-medium text-slate-800">Michael Chen</p>
                                             <p className="text-xs text-slate-500">Direct Manager</p>
                                         </div>
                                     </div>
                                 </div>
                             </div>

                             {/* AI Profile Section */}
                             <div className="pt-6 border-t border-slate-100">
                                 <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100">
                                     <h3 className="font-bold text-indigo-900 mb-2 text-sm flex items-center gap-2">
                                         ✨ AI Talent Hologram
                                     </h3>
                                     <p className="text-xs text-indigo-800 leading-relaxed">
                                         High potential employee with strong leadership traits. Consistently exceeds project deliverables. Recommended for "Senior Lead" track in Q3 2024.
                                     </p>
                                 </div>
                             </div>
                        </div>
                    )}
                    
                    {tab === 'timeline' && (
                        <div className="relative pl-4 border-l-2 border-slate-200 space-y-8">
                             <div className="relative">
                                 <div className="absolute -left-[21px] top-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                 <p className="text-xs text-slate-500 mb-1">Mar 2024</p>
                                 <p className="font-bold text-slate-800">Annual Performance Review</p>
                                 <p className="text-sm text-slate-600">Rated "Exceeds Expectations" (4.5/5)</p>
                             </div>
                             <div className="relative">
                                 <div className="absolute -left-[21px] top-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white"></div>
                                 <p className="text-xs text-slate-500 mb-1">Jan 2023</p>
                                 <p className="font-bold text-slate-800">Promotion to Senior UX Designer</p>
                                 <p className="text-sm text-slate-600">Approved by Michael Chen</p>
                             </div>
                             <div className="relative">
                                 <div className="absolute -left-[21px] top-1 w-3 h-3 bg-slate-400 rounded-full border-2 border-white"></div>
                                 <p className="text-xs text-slate-500 mb-1">{employee.joinDate}</p>
                                 <p className="font-bold text-slate-800">Joined Astra Inc.</p>
                                 <p className="text-sm text-slate-600">Onboarding Completed</p>
                             </div>
                        </div>
                    )}

                    {tab === 'docs' && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-50 text-red-600 rounded"><FileText size={18}/></div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">Employment Contract.pdf</p>
                                        <p className="text-xs text-slate-500">Signed on {employee.joinDate}</p>
                                    </div>
                                </div>
                                <Upload size={16} className="text-slate-400"/>
                            </div>
                            <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded"><FileText size={18}/></div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">NDA Agreement.pdf</p>
                                        <p className="text-xs text-slate-500">Signed on {employee.joinDate}</p>
                                    </div>
                                </div>
                                <Upload size={16} className="text-slate-400"/>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Footer */}
                <div className="p-4 border-t border-slate-200 bg-slate-50 flex gap-3">
                    <button className="flex-1 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Edit Profile</button>
                    <button className="flex-1 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700">Actions</button>
                </div>
            </div>
        </div>
    );
};