import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './pages/Dashboard';
import { OrgManagement } from './pages/OrgManagement';
import { Recruitment } from './pages/Recruitment';
import { Analytics } from './pages/Analytics';
import { SmartBuilder } from './pages/SmartBuilder';
import { Attendance } from './pages/Attendance';
import { Payroll } from './pages/Payroll';
import { Performance } from './pages/Performance';
import { Settings } from './pages/Settings';
import { Efficiency } from './pages/Efficiency';
import { AIAssistant } from './components/AIAssistant';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'org': return <OrgManagement />;
      case 'recruitment': return <Recruitment />;
      case 'analytics': return <Analytics />;
      case 'efficiency': return <Efficiency />;
      case 'apaas': return <SmartBuilder />;
      case 'attendance': return <Attendance />;
      case 'payroll': return <Payroll />;
      case 'performance': return <Performance />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setView={setView} 
        collapsed={sidebarCollapsed}
        toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          <div className="max-w-7xl mx-auto h-full">
            {renderContent()}
          </div>
        </main>
      </div>

      <AIAssistant />
    </div>
  );
};

export default App;