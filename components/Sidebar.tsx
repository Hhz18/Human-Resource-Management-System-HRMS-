import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarClock, 
  Banknote, 
  UserPlus, 
  TrendingUp, 
  BrainCircuit, 
  BarChart3, 
  LayoutGrid, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { ViewState } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  collapsed: boolean;
  toggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, collapsed, toggleCollapse }) => {
  const { t } = useLanguage();
  
  const navItems = [
    { id: 'dashboard', label: t.sidebar.dashboard, icon: LayoutDashboard },
    { id: 'org', label: t.sidebar.org, icon: Users },
    { id: 'attendance', label: t.sidebar.attendance, icon: CalendarClock },
    { id: 'payroll', label: t.sidebar.payroll, icon: Banknote },
    { id: 'recruitment', label: t.sidebar.recruitment, icon: UserPlus },
    { id: 'performance', label: t.sidebar.performance, icon: TrendingUp },
    { id: 'analytics', label: t.sidebar.analytics, icon: BarChart3 },
    { id: 'apaas', label: t.sidebar.apaas, icon: LayoutGrid },
    { id: 'settings', label: t.sidebar.settings, icon: Settings },
  ];

  return (
    <div className={`h-screen bg-slate-900 text-slate-300 transition-all duration-300 ease-in-out flex flex-col ${collapsed ? 'w-20' : 'w-64'} border-r border-slate-800`}>
      {/* Brand */}
      <div className="h-16 flex items-center justify-center border-b border-slate-800">
        <div className="flex items-center gap-3 font-bold text-white text-xl">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <BrainCircuit size={20} className="text-white" />
          </div>
          {!collapsed && <span>Astra HCM</span>}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewState)}
              className={`w-full flex items-center px-4 py-3 transition-colors relative
                ${isActive ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-slate-800 hover:text-white'}
              `}
            >
              {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full" />}
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {!collapsed && (
                <span className={`ml-3 text-sm font-medium ${isActive ? 'text-indigo-400' : ''}`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Toggle */}
      <button 
        onClick={toggleCollapse}
        className="h-12 border-t border-slate-800 flex items-center justify-center hover:bg-slate-800 text-slate-500"
      >
         <ChevronRight size={20} className={`transition-transform duration-300 ${!collapsed ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
};