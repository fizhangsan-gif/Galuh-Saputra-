import React from 'react';
import {
  Flame,
  Radio,
  Trophy,
  Activity,
  Star,
  RefreshCw,
  AlertTriangle,
  Lock,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import { useSportsbook } from '../../context/SportsbookContext';
import { TOP_COMPETITIONS } from '../../data/mockMatches';
import { SportId } from '../../types/sportsbook';

interface LeftNavProps {
  className?: string;
  onCloseMobile?: () => void;
}

export const LeftNav: React.FC<LeftNavProps> = ({ className = '', onCloseMobile }) => {
  const {
    activePage,
    setActivePage,
    selectedSportFilter,
    setSelectedSportFilter,
    followedCompetitions,
    toggleFollowCompetition,
    followedTeams,
    simulateOddsShift,
    simulateSuspensionToggle,
    simulateGoalScore,
    toggleSimulatedFailure,
    isSimulatingFailure,
    toggleSimulatedNoLive,
    isSimulatingNoLive,
    resetDemoData,
    navigateToMatch,
  } = useSportsbook();

  const SPORTS_LIST: { id: SportId | 'all'; label: string; icon: string; count: number }[] = [
    { id: 'all', label: 'All Sports', icon: '🌐', count: 18 },
    { id: 'football', label: 'Football', icon: '⚽', count: 12 },
    { id: 'basketball', label: 'Basketball', icon: '🏀', count: 4 },
    { id: 'tennis', label: 'Tennis', icon: '🎾', count: 6 },
    { id: 'esports', label: 'Esports', icon: '🎮', count: 3 },
    { id: 'hockey', label: 'Ice Hockey', icon: '🏒', count: 2 },
    { id: 'cricket', label: 'Cricket', icon: '🏏', count: 1 },
    { id: 'mma', label: 'MMA', icon: '🥊', count: 1 },
  ];

  const handleNavClick = (callback: () => void) => {
    callback();
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`w-64 bg-[#0d121c] border-r border-slate-800/80 flex flex-col h-full overflow-y-auto select-none ${className}`}
    >
      {/* Quick Navigation Sections */}
      <div className="p-3 space-y-1 border-b border-slate-800/60">
        <button
          type="button"
          onClick={() => handleNavClick(() => setActivePage('home'))}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activePage === 'home'
              ? 'bg-[#00e5c9]/15 text-[#00e5c9]'
              : 'text-slate-300 hover:bg-[#141c2b] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Sports Home</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick(() => setActivePage('live'))}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activePage === 'live'
              ? 'bg-[#00e5c9]/15 text-[#00e5c9]'
              : 'text-slate-300 hover:bg-[#141c2b] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Live In-Play</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
            {isSimulatingNoLive ? '0' : '5 LIVE'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick(() => setActivePage('football'))}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activePage === 'football'
              ? 'bg-[#00e5c9]/15 text-[#00e5c9]'
              : 'text-slate-300 hover:bg-[#141c2b] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Football Hub</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">5 Leagues</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick(() => navigateToMatch('arsenal-brighton'))}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activePage === 'match'
              ? 'bg-[#00e5c9]/15 text-[#00e5c9]'
              : 'text-slate-300 hover:bg-[#141c2b] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-[#00e5c9]" />
            <span>Match: Arsenal v BHA</span>
          </div>
          <span className="text-[10px] text-[#00e5c9] font-bold">LIVE</span>
        </button>
      </div>

      {/* Sports Navigation */}
      <div className="p-3 border-b border-slate-800/60">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2">
          Sports Navigation
        </div>
        <div className="space-y-0.5">
          {SPORTS_LIST.map((sport) => {
            const isActive = selectedSportFilter === sport.id;
            return (
              <button
                key={sport.id}
                type="button"
                onClick={() =>
                  handleNavClick(() => {
                    setSelectedSportFilter(sport.id);
                    if (activePage !== 'home' && activePage !== 'live') {
                      setActivePage(sport.id === 'football' ? 'football' : 'home');
                    }
                  })
                }
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  isActive
                    ? 'bg-[#182335] text-[#00e5c9] font-bold'
                    : 'text-slate-300 hover:bg-[#131b28] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{sport.icon}</span>
                  <span>{sport.label}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{sport.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Competitions */}
      <div className="p-3 border-b border-slate-800/60">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2">
          <span>Top Competitions</span>
          <span className="text-[10px] text-slate-400 lowercase font-normal">tap star to follow</span>
        </div>
        <div className="space-y-0.5">
          {TOP_COMPETITIONS.slice(0, 5).map((comp) => {
            const isFollowed = followedCompetitions.has(comp.id);
            return (
              <div
                key={comp.id}
                className="group flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-[#131b28] transition-colors"
              >
                <button
                  type="button"
                  onClick={() =>
                    handleNavClick(() => {
                      setActivePage('football');
                    })
                  }
                  className="flex items-center gap-2 text-xs text-slate-300 group-hover:text-white truncate text-left"
                >
                  <span className="text-xs">{comp.badge}</span>
                  <span className="truncate">{comp.name}</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFollowCompetition(comp.id);
                  }}
                  className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                    isFollowed ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
                  }`}
                  title={isFollowed ? 'Unfollow competition' : 'Follow competition'}
                >
                  <Star className={`w-3.5 h-3.5 ${isFollowed ? 'fill-amber-400' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Followed Teams Shortcut */}
      {followedTeams.size > 0 && (
        <div className="p-3 border-b border-slate-800/60">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2 flex items-center gap-1.5">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>Followed Teams ({followedTeams.size})</span>
          </div>
          <div className="flex flex-wrap gap-1 px-3">
            {Array.from(followedTeams).map((team) => (
              <button
                key={team}
                onClick={() => handleNavClick(() => setActivePage('football'))}
                className="text-[11px] bg-[#141d2c] hover:bg-[#1a2538] text-amber-300/90 border border-amber-500/20 rounded px-2 py-0.5 truncate transition-colors"
              >
                {team}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Prototype Controls */}
      <div className="p-3 mt-auto bg-[#0a0d14]/70">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#00e5c9] px-2 pb-2">
          <Sliders className="w-3 h-3" />
          <span>Prototype Simulators</span>
        </div>
        <p className="text-[10px] text-slate-400 px-2 pb-2 leading-tight">
          Test interactive edge cases requested in brief:
        </p>

        <div className="space-y-1.5">
          <button
            type="button"
            onClick={simulateOddsShift}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#141b28] hover:bg-[#1c2638] text-slate-200 text-[11px] font-medium border border-slate-800 transition-colors"
            title="Update live odds up/down to test odds movement & bet slip player acceptance"
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <div className="flex flex-col text-left">
              <span>Simulate Odds Shift</span>
              <span className="text-[9px] text-slate-500 leading-none">Triggers slip "Player must accept"</span>
            </div>
          </button>

          <button
            type="button"
            onClick={simulateSuspensionToggle}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#141b28] hover:bg-[#1c2638] text-slate-200 text-[11px] font-medium border border-slate-800 transition-colors"
            title="Toggle market suspension in Arsenal v Brighton"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <div className="flex flex-col text-left">
              <span>Toggle Market Suspended</span>
              <span className="text-[9px] text-slate-500 leading-none">Locks market & blocks placement</span>
            </div>
          </button>

          <button
            type="button"
            onClick={simulateGoalScore}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#141b28] hover:bg-[#1c2638] text-slate-200 text-[11px] font-medium border border-slate-800 transition-colors"
            title="Trigger goal in Arsenal v Brighton: Arsenal 3 - 1 Brighton"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <div className="flex flex-col text-left">
              <span>Simulate Goal (3 - 1)</span>
              <span className="text-[9px] text-slate-500 leading-none">Updates clock, score & cash-outs</span>
            </div>
          </button>

          <button
            type="button"
            onClick={toggleSimulatedFailure}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${
              isSimulatingFailure
                ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                : 'bg-[#141b28] hover:bg-[#1c2638] text-slate-200 border-slate-800'
            }`}
            title="Toggle bet placement rejection to test failure modal and retry"
          >
            <AlertTriangle className={`w-3.5 h-3.5 ${isSimulatingFailure ? 'text-rose-400' : 'text-slate-400'}`} />
            <div className="flex flex-col text-left">
              <span>Simulate Bet Failed {isSimulatingFailure ? '(ON)' : ''}</span>
              <span className="text-[9px] text-slate-500 leading-none">Tests error handling state</span>
            </div>
          </button>

          <button
            type="button"
            onClick={toggleSimulatedNoLive}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${
              isSimulatingNoLive
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                : 'bg-[#141b28] hover:bg-[#1c2638] text-slate-200 border-slate-800'
            }`}
            title="Test 'Nothing live: show Starting soon' requirement"
          >
            <Radio className={`w-3.5 h-3.5 ${isSimulatingNoLive ? 'text-amber-400' : 'text-slate-400'}`} />
            <div className="flex flex-col text-left">
              <span>Simulate No Live Matches</span>
              <span className="text-[9px] text-slate-500 leading-none">Tests starting soon fallback</span>
            </div>
          </button>

          <button
            type="button"
            onClick={resetDemoData}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 mt-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Demo Prototype</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
