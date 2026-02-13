
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: 'fa-chart-line' },
    { id: AppView.CAMPAIGNS, label: 'Campaigns', icon: 'fa-bullhorn' },
    { id: AppView.SALES_PITCH, label: 'Sales Pitches', icon: 'fa-handshake' },
    { id: AppView.MARKET_ANALYSIS, label: 'Market Analysis', icon: 'fa-globe' },
    { id: AppView.LEAD_SCORING, label: 'Lead Scoring', icon: 'fa-users' },
    { id: AppView.INSIGHTS, label: 'Business Insights', icon: 'fa-lightbulb' },
  ];

  return (
    <div className="w-64 bg-black h-screen fixed left-0 top-0 text-white flex flex-col z-20">
      <div className="p-6 flex items-center gap-3 border-b border-zinc-900">
        <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
          <i className="fas fa-bolt text-sm"></i>
        </div>
        <span className="text-xl font-black tracking-tighter italic">Market<span className="text-red-600">Mind</span></span>
      </div>
      
      <nav className="flex-1 mt-6 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentView === item.id 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                  : 'text-zinc-500 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <i className={`fas ${item.icon} w-5`}></i>
                <span className="font-semibold">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-zinc-900 text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
        <p>MarketMind v1.0</p>
        <p className="mt-1">Powered by Gemini 3</p>
      </div>
    </div>
  );
};

export default Sidebar;