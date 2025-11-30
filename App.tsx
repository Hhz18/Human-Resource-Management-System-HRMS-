import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './pages/Dashboard';
import { OrgManagement } from './pages/OrgManagement';
import { Recruitment } from './pages/Recruitment';
import { Analytics } from './pages/Analytics';
import { SmartBuilder } from './pages/SmartBuilder';
import { Settings } from './pages/Settings';
import { AIAssistant } from './components/AIAssistant';
import { ViewState } from './types';
import { Construction } from 'lucide-react';

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-full text-slate-400 p-12">
    <Construction size={64} className="mb-4 opacity-20" />
    <h2 className="text-2xl font-bold text-slate-300">{title} Module</h2>
    <p className="mt-2">This module is under development for the demo.</p>
  </div>
);

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'org': return <OrgManagement />;
      case 'recruitment': return <Recruitment />;
      case 'analytics': return <Analytics />;
      case 'apaas': return <SmartBuilder />;
      case 'attendance': return <PlaceholderPage title="Time & Attendance" />;
      case 'payroll': return <PlaceholderPage title="Payroll Management" />;
      case 'performance': return <PlaceholderPage title="Performance" />;
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