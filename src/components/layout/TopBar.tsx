import React, { useState, useRef, useEffect } from 'react';
import { Search, Wallet, Receipt, X, ChevronRight, PlusCircle, Smartphone, Monitor } from 'lucide-react';
import { useSportsbook } from '../../context/SportsbookContext';

export const TopBar: React.FC = () => {
  const {
    userBalance,
    betSlip,
    myBets,
    activePage,
    setActivePage,
    navigateToMatch,
    matches,
    searchQuery,
    setSearchQuery,
    depositFunds,
    setIsBetSlipOpenOnMobile,
    viewMode,
    setViewMode,
  } = useSportsbook();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState<number>(100);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Search results aggregation
  const filteredMatches = searchQuery.trim()
    ? matches.filter((m) => {
        const query = searchQuery.toLowerCase();
        const homeMatch = m.homeTeam.name.toLowerCase().includes(query);
        const awayMatch = m.awayTeam.name.toLowerCase().includes(query);
        const compMatch = m.competition.toLowerCase().includes(query);
        const playerMatch = m.events?.some((e) => e.player.toLowerCase().includes(query)) || false;
        const marketMatch = m.markets.some(
          (mkt) =>
            mkt.name.toLowerCase().includes(query) ||
            mkt.selections.some((s) => s.label.toLowerCase().includes(query))
        );
        return homeMatch || awayMatch || compMatch || playerMatch || marketMatch;
      })
    : [];

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-14 bg-[#0b0e14]/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-6 flex items-center justify-between gap-3 sm:gap-6">
        {/* Zone 1: Brand Wordmark with Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setActivePage('home')}
            className="group flex items-center gap-2 focus:outline-none"
            title="Housebets Sportsbook"
          >
            {/* Logo image from attached brand pack */}
            <div className="h-8 overflow-hidden rounded flex items-center bg-transparent">
              <img
                src="/assets/aistudio/1793948757037_ebe2ee16.jpg"
                alt="Housebets Logo"
                referrerPolicy="no-referrer"
                className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <span className="hidden sm:inline-block font-extrabold text-base tracking-tight text-white">
              <span className="text-[#00e5c9]">House</span>bets
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links & Search */}
        <div className="flex items-center gap-2 md:gap-5 flex-1 max-w-2xl justify-center">
          {/* Main Desktop Links */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            <button
              onClick={() => setActivePage('home')}
              className={`whitespace-nowrap transition-colors py-1 ${
                activePage === 'home'
                  ? 'text-[#00e5c9] border-b-2 border-[#00e5c9] font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Sports
            </button>
            <button
              onClick={() => setActivePage('live')}
              className={`whitespace-nowrap transition-colors py-1 flex items-center gap-1.5 ${
                activePage === 'live'
                  ? 'text-[#00e5c9] border-b-2 border-[#00e5c9] font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live In-Play
            </button>
            <button
              onClick={() => setActivePage('football')}
              className={`whitespace-nowrap transition-colors py-1 ${
                activePage === 'football'
                  ? 'text-[#00e5c9] border-b-2 border-[#00e5c9] font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Football
            </button>
            <button
              onClick={() => navigateToMatch('arsenal-brighton')}
              className={`whitespace-nowrap transition-colors py-1 ${
                activePage === 'match'
                  ? 'text-[#00e5c9] border-b-2 border-[#00e5c9] font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Arsenal v Brighton
            </button>
          </nav>

          {/* Quick Search Bar */}
          <div className="relative w-full max-w-xs md:max-w-sm">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search teams, players, leagues..."
                className="w-full bg-[#141a24] text-xs text-slate-200 placeholder-slate-500 rounded-lg pl-8 pr-7 py-1.5 border border-slate-800 focus:border-[#00e5c9] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Instant Search Results Dropdown */}
            {isSearchOpen && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#121824] border border-slate-700 rounded-xl shadow-2xl p-2 z-50 max-h-80 overflow-y-auto">
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 px-2 text-[11px] text-slate-400">
                  <span>Results for "{searchQuery}"</span>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>

                {filteredMatches.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No matching teams, players, or competitions found.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredMatches.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          navigateToMatch(m.id);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="p-2 hover:bg-[#1a2233] rounded-lg cursor-pointer transition-colors flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-semibold text-white flex items-center gap-1.5">
                            <span>{m.homeTeam.name}</span>
                            <span className="text-slate-500">v</span>
                            <span>{m.awayTeam.name}</span>
                            {m.isLive && (
                              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.2 rounded">
                                LIVE
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {m.competition} · {m.isLive ? `${m.score.home}-${m.score.away} (${m.clock})` : m.startTime}
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Zone 3: Wallet Balance & Mobile Bet Slip Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Prototype Viewport Switcher */}
          <div className="hidden lg:flex items-center bg-[#141a24] rounded-lg p-0.5 border border-slate-800 text-[11px]">
            <button
              onClick={() => setViewMode('desktop')}
              className={`px-2 py-1 rounded flex items-center gap-1 ${
                viewMode === 'desktop' ? 'bg-[#1e293b] text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Preview at Desktop 1440px"
            >
              <Monitor className="w-3 h-3" />
              <span>1440px</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-2 py-1 rounded flex items-center gap-1 ${
                viewMode === 'mobile' ? 'bg-[#00e5c9] text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Preview at Mobile 390px"
            >
              <Smartphone className="w-3 h-3" />
              <span>390px</span>
            </button>
            <button
              onClick={() => setViewMode('responsive')}
              className={`px-2 py-1 rounded ${
                viewMode === 'responsive' ? 'bg-[#1e293b] text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Native Responsive"
            >
              Auto
            </button>
          </div>

          {/* USDT Wallet Balance */}
          <div className="flex items-center bg-[#141a24] hover:bg-[#1a2233] border border-slate-800 rounded-lg pl-2.5 pr-1 py-1 text-xs transition-colors">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-2 h-2 rounded-full bg-[#00e5c9]" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-400 leading-none">Balance</span>
                <span className="font-mono tabular-nums font-bold text-white text-xs leading-tight">
                  {userBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                  <span className="text-[#00e5c9] font-normal">USDT</span>
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowDepositModal(true)}
              className="p-1 rounded bg-[#00e5c9]/15 hover:bg-[#00e5c9]/25 text-[#00e5c9] transition-colors"
              title="Deposit USDT"
            >
              <PlusCircle className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Bet Slip Trigger Button */}
          <button
            type="button"
            onClick={() => setIsBetSlipOpenOnMobile(true)}
            className="lg:hidden relative p-2 bg-[#141a24] hover:bg-[#1a2233] border border-slate-800 rounded-lg text-slate-200 transition-colors"
            title="Open Bet Slip"
          >
            <Receipt className="w-4 h-4 text-[#00e5c9]" />
            {betSlip.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00e5c9] text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {betSlip.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Deposit Funds Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#121824] border border-slate-700 rounded-2xl p-5 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#00e5c9]/20 flex items-center justify-center text-[#00e5c9]">
                  <Wallet className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm">Demo USDT Deposit</h3>
              </div>
              <button
                onClick={() => setShowDepositModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-3">
              Add mock USDT to your demo balance to test singles betting and payouts.
            </p>

            <div className="grid grid-cols-3 gap-2 my-4">
              {[50, 100, 250, 500, 1000, 2500].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setDepositAmount(amt)}
                  className={`py-2 text-xs font-mono font-semibold rounded-lg border transition-all ${
                    depositAmount === amt
                      ? 'border-[#00e5c9] bg-[#00e5c9]/20 text-[#00e5c9]'
                      : 'border-slate-800 bg-[#161f30] text-slate-300 hover:border-slate-700'
                  }`}
                >
                  +{amt} USDT
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowDepositModal(false)}
                className="flex-1 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  depositFunds(depositAmount);
                  setShowDepositModal(false);
                }}
                className="flex-1 py-2 text-xs font-bold rounded-lg bg-[#00e5c9] hover:bg-[#00f5d4] text-slate-950 transition-colors"
              >
                Deposit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
