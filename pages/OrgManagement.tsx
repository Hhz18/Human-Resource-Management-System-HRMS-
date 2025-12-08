import React, { useState } from 'react';
import { 
  LayoutList, LayoutGrid, Filter, Plus, MoreHorizontal, X, Save, 
  Users, GitBranch, GitPullRequest, FileText, Shield, Search, 
  ChevronRight, ChevronDown, Clock, AlertCircle, CheckCircle, Upload, PenTool,
  FileDown, RefreshCw, XCircle, Eye, Camera, Move, Building, Share2, Mail, MapPin, Calendar, Smartphone
} from 'lucide-react';
import { MOCK_EMPLOYEES, MOCK_ORG_TREE, MOCK_PROJECT_ORG_TREE, MOCK_HR_PROCESSES, MOCK_CONTRACTS, MOCK_ROLES } from '../constants';
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

// --- Structure View Components ---

const OrgNode: React.FC<{ node: DepartmentNode, showLegal: boolean }> = ({ node, showLegal }) => {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col items-center">
            <div className={`bg-white border shadow-sm rounded-lg p-3 w-56 text-center relative z-10 hover:shadow-md transition-all cursor-pointer group
                ${showLegal && node.isLegalEntity ? 'border-amber-400 ring-2 ring-amber-100' : 'border-slate-200 hover:border-indigo-300'}
            `}>
                {/* Legal Entity Badge */}
                {showLegal && node.isLegalEntity && (
                    <div className="absolute -top-2 -right-2 bg-amber-100 text-amber-700 p-1 rounded-full border border-amber-200" title={t.org.structure.legalEntity}>
                        <Building size={12} />
                    </div>
                )}

                <div className="font-bold text-slate-800 text-sm truncate">{node.name}</div>
                {node.entityCode && showLegal && <div className="text-[10px] text-amber-600 font-mono mb-1">{node.entityCode}</div>}
                
                <div className="text-xs text-indigo-600 mb-1">{node.manager}</div>
                
                {/* Dotted Line / Secondary Manager */}
                {node.secondaryManager && (
                    <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-2 border-t border-dashed border-slate-200 pt-1 mt-1">
                        <Share2 size={10} /> 
                        <span className="truncate max-w-[120px]">{node.secondaryManager}</span>
                    </div>
                )}

                <div className="text-[10px] text-slate-400 bg-slate-50 rounded-full px-2 py-0.5 inline-block">
                    {node.headcount} Members
                </div>
                {/* Connector Line Top */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-slate-300"></div>
            </div>
            
            {node.children && node.children.length > 0 && (
                <div className="relative pt-8 flex gap-8">
                     {/* Horizontal Line Connector */}
                     <div className="absolute top-4 left-0 right-0 h-px bg-slate-300 mx-10"></div>
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-slate-300"></div>
                     
                    {node.children.map(child => (
                        <OrgNode key={child.id} node={child} showLegal={showLegal} />
                    ))}
                </div>
            )}
        </div>
    );
};

const TileNode: React.FC<{ node: DepartmentNode, showLegal: boolean }> = ({ node, showLegal }) => {
    return (
        <div className={`bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-all flex flex-col gap-2 relative
            ${showLegal && node.isLegalEntity ? 'border-amber-400 bg-amber-50/10' : 'border-slate-200'}
        `}>
             {showLegal && node.isLegalEntity && (
                <div className="absolute top-3 right-3 text-amber-500">
                    <Building size={16} />
                </div>
            )}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold text-lg">
                    {node.name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{node.name}</h4>
                    <p className="text-xs text-slate-500">{node.type}</p>
                </div>
            </div>
            <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Manager:</span>
                    <span className="text-slate-700 font-medium">{node.manager}</span>
                </div>
                {node.secondaryManager && (
                    <div className="flex justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Share2 size={10}/> Matrix:</span>
                        <span className="truncate max-w-[100px]">{node.secondaryManager}</span>
                    </div>
                )}
                <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Headcount:</span>
                    <span className="bg-slate-100 px-1.5 rounded text-slate-600">{node.headcount}</span>
                </div>
            </div>
        </div>
    );
}

const StructureView = () => {
    const { t } = useLanguage();
    const [viewLayout, setViewLayout] = useState<'tree' | 'tile'>('tree');
    const [structureType, setStructureType] = useState<'admin' | 'project' | 'matrix'>('admin');
    const [showLegal, setShowLegal] = useState(false);

    // Map different views to data sources
    const data = structureType === 'admin' ? MOCK_ORG_TREE : 
                 structureType === 'project' ? MOCK_PROJECT_ORG_TREE :
                 MOCK_ORG_TREE; // Fallback for Matrix, in real app this would be a matrix structure

    // Helper to flatten tree for tile view
    const getAllNodes = (nodes: DepartmentNode[]): DepartmentNode[] => {
        let all: DepartmentNode[] = [];
        nodes.forEach(node => {
            all.push(node);
            if (node.children) {
                all = all.concat(getAllNodes(node.children));
            }
        });
        return all;
    };

    const flatNodes = getAllNodes(data);

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[600px] flex flex-col relative overflow-hidden">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-8 sticky top-0 bg-white z-20 pb-4 border-b border-slate-100">
                <div className="flex gap-4 items-center">
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button 
                            onClick={() => setViewLayout('tree')}
                            className={`p-1.5 rounded-md transition-colors ${viewLayout === 'tree' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                            title={t.org.structure.viewTree}
                        >
                            <GitBranch size={18} />
                        </button>
                        <button 
                            onClick={() => setViewLayout('tile')}
                            className={`p-1.5 rounded-md transition-colors ${viewLayout === 'tile' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                            title={t.org.structure.viewTile}
                        >
                            <LayoutGrid size={18} />
                        </button>
                    </div>
                    
                    <div className="h-6 w-px bg-slate-200"></div>

                    <select 
                        value={structureType}
                        onChange={(e) => setStructureType(e.target.value as any)}
                        className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    >
                        <option value="admin">{t.org.structure.typeAdmin}</option>
                        <option value="project">{t.org.structure.typeProject}</option>
                        <option value="matrix">{t.org.structure.typeMatrix}</option>
                    </select>

                    <button 
                        onClick={() => setShowLegal(!showLegal)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                            showLegal ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        <Building size={16} />
                        {t.org.structure.showLegal}
                    </button>
                </div>

                <div className="flex gap-2">
                     <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                         <Move size={16} /> {t.org.structure.batch}
                     </button>
                     <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                         <Camera size={16} /> {t.org.structure.snapshot}
                     </button>
                </div>
            </div>
            
            {/* View Area */}
            <div className="flex-1 overflow-auto">
                {viewLayout === 'tree' ? (
                    <div className="flex flex-col items-center pt-4 min-w-max">
                        {data.map(node => <OrgNode key={node.id} node={node} showLegal={showLegal} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-200">
                        {flatNodes.map(node => <TileNode key={node.id} node={node} showLegal={showLegal} />)}
                    </div>
                )}
            </div>
        </div>
    );
};

const WorkflowsView = () => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                 <h3 className="font-bold text-slate-800">HR Process Workflows</h3>
                 <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
                     <Plus size={16}/> New Workflow
                 </button>
             </div>
             <table className="w-full text-sm text-left">
                 <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                     <tr>
                         <th className="px-6 py-4">Process Name</th>
                         <th className="px-6 py-4">Owner</th>
                         <th className="px-6 py-4">Steps</th>
                         <th className="px-6 py-4">Last Updated</th>
                         <th className="px-6 py-4">Status</th>
                         <th className="px-6 py-4">Actions</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                     {MOCK_HR_PROCESSES.map(proc => (
                         <tr key={proc.id} className="hover:bg-slate-50">
                             <td className="px-6 py-4 font-bold text-slate-700">{proc.name}</td>
                             <td className="px-6 py-4 text-slate-600">{proc.owner}</td>
                             <td className="px-6 py-4 text-slate-600">{proc.steps}</td>
                             <td className="px-6 py-4 text-slate-500">{proc.lastUpdated}</td>
                             <td className="px-6 py-4">
                                 <span className={`px-2 py-1 rounded text-xs font-medium ${
                                     proc.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                                 }`}>
                                     {proc.status}
                                 </span>
                             </td>
                             <td className="px-6 py-4">
                                 <button className="text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
        </div>
    );
};

const ContractsView = () => {
    const { t } = useLanguage();
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: t.org.contracts.totalActive, value: 120, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: t.org.contracts.perm, value: 95, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: t.org.contracts.fixed, value: 20, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: t.org.contracts.expiring, value: 5, color: 'text-red-600', bg: 'bg-red-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                         <div className={`p-3 rounded-lg ${stat.bg} ${stat.color} font-bold`}>{stat.value}</div>
                         <div className="text-sm font-medium text-slate-600">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Contract List</h3>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-slate-200 rounded text-sm hover:bg-slate-50">{t.org.contracts.remindAll}</button>
                    </div>
                </div>
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4">{t.org.contracts.table.employee}</th>
                            <th className="px-6 py-4">{t.org.contracts.table.type}</th>
                            <th className="px-6 py-4">{t.org.contracts.table.endDate}</th>
                            <th className="px-6 py-4">{t.org.contracts.table.status}</th>
                            <th className="px-6 py-4 text-right">{t.org.contracts.table.actions}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {MOCK_CONTRACTS.map(contract => (
                            <tr key={contract.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-bold text-slate-700">{contract.employeeName}</td>
                                <td className="px-6 py-4 text-slate-600">{contract.type}</td>
                                <td className="px-6 py-4 text-slate-600">{contract.endDate || '-'}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        contract.status === 'Active' ? 'bg-green-100 text-green-700' :
                                        contract.status === 'Expiring' ? 'bg-red-100 text-red-700' : 'bg-slate-100'
                                    }`}>
                                        {contract.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={16}/></button>
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
             <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                 <h3 className="font-bold text-slate-800">Role & Permissions</h3>
                 <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
                     <Plus size={16}/> New Role
                 </button>
             </div>
             <table className="w-full text-sm text-left">
                 <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                     <tr>
                         <th className="px-6 py-4">Role Name</th>
                         <th className="px-6 py-4">Assigned Users</th>
                         <th className="px-6 py-4">Module Access</th>
                         <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                     {MOCK_ROLES.map(role => (
                         <tr key={role.id} className="hover:bg-slate-50">
                             <td className="px-6 py-4 font-bold text-slate-700">{role.role}</td>
                             <td className="px-6 py-4 text-slate-600">{role.usersCount}</td>
                             <td className="px-6 py-4">
                                 <div className="flex gap-2">
                                     {role.modules.map((m, i) => (
                                         <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">{m}</span>
                                     ))}
                                 </div>
                             </td>
                             <td className="px-6 py-4 text-right">
                                 <button className="text-indigo-600 hover:underline">Edit</button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
        </div>
    );
};

const ProfileModal = ({ employee, onClose }: { employee: Employee, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600">
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="px-8 pb-8">
                    <div className="relative -mt-16 mb-6 flex justify-between items-end">
                        <img src={employee.avatar} alt={employee.name} className="w-32 h-32 rounded-xl border-4 border-white shadow-md bg-white" />
                        <div className="flex gap-3 mb-2">
                             <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm font-medium text-sm">
                                 <Mail size={16} /> Message
                             </button>
                             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
                                 <MoreHorizontal size={16} />
                             </button>
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">{employee.name}</h2>
                        <p className="text-slate-500 font-medium">{employee.role} • {employee.department}</p>
                        
                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Contact Info</h3>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Mail size={16} className="text-slate-400" /> {employee.email}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Smartphone size={16} className="text-slate-400" /> +1 (555) 000-0000
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <MapPin size={16} className="text-slate-400" /> {employee.location}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Employment</h3>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Calendar size={16} className="text-slate-400" /> Joined {employee.joinDate}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Building size={16} className="text-slate-400" /> ID: {employee.id.toUpperCase()}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle size={16} className="text-green-500" /> {employee.status}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};