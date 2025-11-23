import React, { useState } from 'react';
import { Scanner } from './components/Scanner/Scanner';
import { History } from './components/History/History';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Admin } from './components/Admin/Admin';
import { Scan, List, PieChart, Settings } from 'lucide-react';
import { AppTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('scan');

  const renderContent = () => {
    switch (activeTab) {
      case 'scan': return <Scanner />;
      case 'history': return <History />;
      case 'data': return <Dashboard />;
      case 'admin': return <Admin />;
      default: return <Scanner />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200 font-sans max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {renderContent()}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="bg-slate-900 border-t border-slate-800 h-[60px] flex items-center justify-around px-2 pb-safe z-20">
        <NavButton 
          active={activeTab === 'history'} 
          onClick={() => setActiveTab('history')} 
          icon={<List size={22} />} 
          label="Buscar" 
        />
        <NavButton 
          active={activeTab === 'scan'} 
          onClick={() => setActiveTab('scan')} 
          icon={<Scan size={26} />} 
          label="Escanear" 
          isMain 
        />
        <NavButton 
          active={activeTab === 'data'} 
          onClick={() => setActiveTab('data')} 
          icon={<PieChart size={22} />} 
          label="Datos" 
        />
        <NavButton 
          active={activeTab === 'admin'} 
          onClick={() => setActiveTab('admin')} 
          icon={<Settings size={22} />} 
          label="Admin" 
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  isMain?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label, isMain }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full h-full transition-all duration-200 
        ${active ? 'text-amber-500' : 'text-slate-500 hover:text-slate-400'}`}
    >
      <div className={`${isMain ? 'mb-1 p-1.5 bg-slate-800 rounded-full border border-slate-700 shadow-md' : ''} ${active && isMain ? 'border-amber-500/50 text-amber-500' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
};

export default App;