import React, { useState } from 'react';
import { SportsbookProvider, useSportsbook } from './context/SportsbookContext';
import { TopBar } from './components/layout/TopBar';
import { LeftNav } from './components/layout/LeftNav';
import { BetSlipPanel } from './components/betslip/BetSlipPanel';
import { MobileBetSlipBar } from './components/betslip/MobileBetSlipBar';
import { SportsHome } from './pages/SportsHome';
import { LivePage } from './pages/LivePage';
import { FootballPage } from './pages/FootballPage';
import { MatchPage } from './pages/MatchPage';
import { BetSlipPage } from './pages/BetSlipPage';
import {
  Menu,
  X,
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  Smartphone,
  Monitor,
  Flame,
} from 'lucide-react';

const MainShell: React.FC = () => {
  const {
    activePage,
    setActivePage,
    viewMode,
    setViewMode,
    toasts,
    dismissToast,
  } = useSportsbook();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Render the active page
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <SportsHome />;
      case 'live':
        return <LivePage />;
      case 'football':
        return <FootballPage />;
      case 'match':
        return <MatchPage />;
      case 'betslip':
        return <BetSlipPage />;
      default:
        return <SportsHome />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex flex-col font-sans">
      {/* Top Bar Site Shell Header */}
      <TopBar />

      {/* Mobile Nav Drawer Toggle Bar */}
      <div className="lg:hidden bg-[#0d121c] border-b border-slate-800 px-3 py-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsMobileNavOpen(true)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white px-2 py-1 rounded bg-[#141b28] border border-slate-800"
        >
          <Menu className="w-4 h-4 text-[#00e5c9]" />
          <span>Sports Navigation</span>
        </button>

        {/* Quick Page Links on Mobile */}
        <div className="flex items-center gap-1 text-[11px] font-semibold">
          <button
            onClick={() => setActivePage('home')}
            className={`px-2 py-1 rounded ${
              activePage === 'home' ? 'text-[#00e5c9] bg-[#00e5c9]/10' : 'text-slate-400'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActivePage('live')}
            className={`px-2 py-1 rounded flex items-center gap-1 ${
              activePage === 'live' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </button>
          <button
            onClick={() => setActivePage('football')}
            className={`px-2 py-1 rounded ${
              activePage === 'football' ? 'text-[#00e5c9] bg-[#00e5c9]/10' : 'text-slate-400'
            }`}
          >
            Football
          </button>
          <button
            onClick={() => setActivePage('betslip')}
            className={`px-2 py-1 rounded ${
              activePage === 'betslip' ? 'text-[#00e5c9] bg-[#00e5c9]/10' : 'text-slate-400'
            }`}
          >
            Slip
          </button>
        </div>
      </div>

      {/* Optional Mobile Left Nav Modal */}
      {isMobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="relative z-10 w-72 max-w-[85vw] h-full bg-[#0d121c] flex flex-col shadow-2xl">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
              <span className="font-bold text-xs text-white">Menu & Sports</span>
              <button
                onClick={() => setIsMobileNavOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <LeftNav
              className="flex-1 w-full border-r-0"
              onCloseMobile={() => setIsMobileNavOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Layout Container (Site Shell: Left Nav, Content Viewport, Right Bet Slip Panel) */}
      <div className="flex-1 flex justify-center w-full">
        <div
          className={`w-full flex transition-all duration-300 ${
            viewMode === 'mobile'
              ? 'max-w-[420px] my-4 rounded-3xl border-4 border-slate-700 overflow-hidden shadow-2xl bg-[#0b0e14] min-h-[820px]'
              : viewMode === 'desktop'
              ? 'max-w-[1440px]'
              : 'max-w-[1600px]'
          }`}
        >
          {/* Left Navigation: Visible on desktop, drawer on phone */}
          {viewMode !== 'mobile' && (
            <LeftNav className="hidden lg:flex shrink-0 w-60 xl:w-64" />
          )}

          {/* Central Content Column */}
          <main className="flex-1 min-w-0 p-3 sm:p-5 md:p-6 overflow-y-auto">
            {renderPage()}
          </main>

          {/* Right Panel: Bet Slip + My Bets (Permanent on Desktop) */}
          {viewMode !== 'mobile' && (
            <aside className="hidden lg:flex shrink-0 w-80 xl:w-96 flex-col">
              <BetSlipPanel className="h-full" />
            </aside>
          )}
        </div>
      </div>

      {/* Mobile Sticky Bottom Bet Slip Bar (Phone Viewports) */}
      <MobileBetSlipBar />

      {/* Toast Notification Container */}
      <div className="fixed bottom-16 lg:bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => dismissToast(toast.id)}
            className={`pointer-events-auto p-3 rounded-xl shadow-2xl border flex items-start gap-2.5 text-xs transition-all animate-slide-up cursor-pointer ${
              toast.type === 'success'
                ? 'bg-[#10231e] border-emerald-500/50 text-emerald-200'
                : toast.type === 'error'
                ? 'bg-[#291417] border-rose-500/50 text-rose-200'
                : toast.type === 'warning'
                ? 'bg-[#2a2010] border-amber-500/50 text-amber-200'
                : 'bg-[#141b28] border-slate-700 text-slate-200'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
            {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-[#00e5c9] shrink-0 mt-0.5" />}

            <div className="flex-1">
              <div className="font-bold text-white">{toast.title}</div>
              {toast.description && (
                <div className="text-[11px] opacity-80 mt-0.5">{toast.description}</div>
              )}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                dismissToast(toast.id);
              }}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <SportsbookProvider>
      <MainShell />
    </SportsbookProvider>
  );
}
