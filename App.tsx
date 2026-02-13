
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CampaignCreator from './components/CampaignCreator';
import SalesPitcher from './components/SalesPitcher';
import MarketAnalyzer from './components/MarketAnalyzer';
import LeadScorer from './components/LeadScorer';
import ChatBot from './components/ChatBot';
import Auth from './components/Auth';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    setCurrentView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.CAMPAIGNS:
        return <CampaignCreator />;
      case AppView.SALES_PITCH:
        return <SalesPitcher />;
      case AppView.MARKET_ANALYSIS:
        return <MarketAnalyzer />;
      case AppView.LEAD_SCORING:
        return <LeadScorer />;
      case AppView.INSIGHTS:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
             <div className="w-20 h-20 bg-black text-white rounded-3xl flex items-center justify-center shadow-xl shadow-black/10">
               <i className="fas fa-atom text-3xl animate-spin-slow"></i>
             </div>
             <div className="space-y-2">
               <h2 className="text-3xl font-black text-black uppercase tracking-tighter">Predictive Core</h2>
               <p className="text-zinc-500 max-w-sm font-medium">Modeling engine is currently indexing deep sales archives. System availability expected shortly.</p>
             </div>
             <button 
              onClick={() => setCurrentView(AppView.DASHBOARD)} 
              className="bg-red-600 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-black transition-colors"
             >
               Return to Core
             </button>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  const getTitle = () => {
    return currentView.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  if (!isLoggedIn) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="ml-64 min-h-screen p-10 lg:p-14">
        <header className="mb-14 flex justify-between items-end border-b border-zinc-100 pb-8">
          <div className="flex items-center gap-6">
            {currentView !== AppView.DASHBOARD && (
              <button 
                onClick={() => setCurrentView(AppView.DASHBOARD)}
                className="w-12 h-12 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-red-600 hover:border-red-600 transition-all group shadow-sm"
                title="Back to Dashboard"
              >
                <i className="fas fa-chevron-left group-hover:-translate-x-1 transition-transform"></i>
              </button>
            )}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-1 bg-red-600"></span>
                <h2 className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em]">MarketMind Intelligence Portal</h2>
              </div>
              <h1 className="text-5xl font-black text-black tracking-tighter italic">{getTitle()}</h1>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <button 
              onClick={handleLogout}
              className="text-zinc-400 hover:text-red-600 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              <i className="fas fa-power-off"></i>
              Logout
            </button>
            <button className="relative w-12 h-12 rounded-2xl bg-white shadow-xl border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-red-600 transition-all hover:scale-110">
              <i className="fas fa-bell"></i>
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-4 pl-8 border-l border-zinc-200">
              <div className="text-right">
                <p className="text-xs font-black text-black uppercase tracking-tight truncate max-w-[120px]">{userEmail.split('@')[0]}</p>
                <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest mt-1">Growth Tier</p>
              </div>
              <div className="relative">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`} alt="Profile" className="w-14 h-14 rounded-2xl border-2 border-white shadow-2xl grayscale" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>

      <ChatBot />
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
