import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Lock,
  TrendingUp,
  AlertCircle,
  Activity,
  Flame,
  Star,
  Sliders,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { OddsButton } from '../components/common/OddsButton';
import { MarketGroup } from '../types/sportsbook';

export const MatchPage: React.FC = () => {
  const {
    matches,
    selectedMatchId,
    betSlip,
    toggleOddsSelection,
    setActivePage,
    oddsFlashMap,
    simulateOddsShift,
    simulateSuspensionToggle,
    simulateGoalScore,
    followedTeams,
    toggleFollowTeam,
  } = useSportsbook();

  const [activeMarketGroup, setActiveMarketGroup] = useState<MarketGroup | 'all'>('popular');
  const [collapsedMarkets, setCollapsedMarkets] = useState<Record<string, boolean>>({});

  // Locate the match (defaulting to arsenal-brighton as required)
  const match = matches.find((m) => m.id === selectedMatchId) || matches[0];

  const MARKET_GROUPS: { id: MarketGroup | 'all'; label: string; count?: number }[] = [
    { id: 'all', label: 'All Markets' },
    { id: 'popular', label: 'Popular' },
    { id: 'goals', label: 'Goals' },
    { id: 'halves', label: 'Halves' },
    { id: 'handicaps', label: 'Handicaps' },
    { id: 'goalscorers', label: 'Goalscorers' },
    { id: 'corners_cards', label: 'Corners & cards' },
  ];

  const filteredMarkets = match.markets.filter(
    (mkt) => activeMarketGroup === 'all' || mkt.group === activeMarketGroup
  );

  const toggleMarketCollapse = (marketId: string) => {
    setCollapsedMarkets((prev) => ({
      ...prev,
      [marketId]: !prev[marketId],
    }));
  };

  const isHomeFollowed = followedTeams.has(match.homeTeam.name);
  const isAwayFollowed = followedTeams.has(match.awayTeam.name);

  return (
    <div className="space-y-6 pb-24 lg:pb-8">
      {/* Back to Hub Nav & Quick Controls Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setActivePage('football')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Football Hub</span>
        </button>

        {/* In-Page Testing Toolbar */}
        <div className="flex items-center gap-1.5 bg-[#141b28] p-1 rounded-lg border border-slate-800 text-[11px]">
          <span className="text-slate-400 font-medium px-1.5 hidden sm:inline">Simulators:</span>
          <button
            type="button"
            onClick={simulateOddsShift}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 font-medium flex items-center gap-1 transition-colors"
            title="Flash moving odds"
          >
            <TrendingUp className="w-3 h-3" />
            <span>Shift Odds</span>
          </button>
          <button
            type="button"
            onClick={simulateSuspensionToggle}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 font-medium flex items-center gap-1 transition-colors"
            title="Toggle suspended market"
          >
            <Lock className="w-3 h-3" />
            <span>Toggle Suspended</span>
          </button>
          {match.isLive && (
            <button
              type="button"
              onClick={simulateGoalScore}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-orange-400 font-medium flex items-center gap-1 transition-colors"
              title="Simulate Saka 74' Goal"
            >
              <Flame className="w-3 h-3" />
              <span>Goal (3-1)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Live Scoreboard */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#141d2e] via-[#0f1624] to-[#0b0f17] border border-slate-800 shadow-2xl p-4 sm:p-6">
        {/* Match Header Info */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wide">{match.competition}</span>
            <span>·</span>
            <span className="text-slate-400">{match.venue || 'Premier League Arena'}</span>
          </div>

          <div className="flex items-center gap-2">
            {match.isLive ? (
              <span className="flex items-center gap-1.5 font-mono text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{match.period} {match.clock}</span>
              </span>
            ) : (
              <span className="text-cyan-400 font-medium">{match.startTime}</span>
            )}
          </div>
        </div>

        {/* Score & Teams Arena */}
        <div className="grid grid-cols-3 items-center py-2 sm:py-4">
          {/* Home Team */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-black text-lg sm:text-2xl text-white shadow-xl border border-white/10"
              style={{ backgroundColor: match.homeTeam.crestColor }}
            >
              {match.homeTeam.code}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base text-white">
                {match.homeTeam.name}
              </span>
              <button
                type="button"
                onClick={() => toggleFollowTeam(match.homeTeam.name)}
                className={`p-1 rounded ${isHomeFollowed ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}
                title="Follow team"
              >
                <Star className={`w-3.5 h-3.5 ${isHomeFollowed ? 'fill-amber-400' : ''}`} />
              </button>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Home</span>
          </div>

          {/* Center Score & Match Clock */}
          <div className="flex flex-col items-center justify-center text-center">
            {match.isLive ? (
              <>
                <div className="flex items-center gap-2 sm:gap-4 font-mono font-black text-3xl sm:text-5xl text-white tracking-tight">
                  <span className="p-2 bg-[#172030] rounded-xl border border-slate-700/80 min-w-[48px] sm:min-w-[64px]">
                    {match.score.home}
                  </span>
                  <span className="text-slate-600">:</span>
                  <span className="p-2 bg-[#172030] rounded-xl border border-slate-700/80 min-w-[48px] sm:min-w-[64px]">
                    {match.score.away}
                  </span>
                </div>
                <div className="mt-2 text-xs font-mono font-semibold text-emerald-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>{match.clock} elapsed</span>
                </div>
              </>
            ) : (
              <>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-300">VS</div>
                <div className="text-xs text-cyan-400 mt-1 font-medium">{match.startTime}</div>
              </>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-black text-lg sm:text-2xl text-white shadow-xl border border-white/10"
              style={{ backgroundColor: match.awayTeam.crestColor }}
            >
              {match.awayTeam.code}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base text-white">
                {match.awayTeam.name}
              </span>
              <button
                type="button"
                onClick={() => toggleFollowTeam(match.awayTeam.name)}
                className={`p-1 rounded ${isAwayFollowed ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}
                title="Follow team"
              >
                <Star className={`w-3.5 h-3.5 ${isAwayFollowed ? 'fill-amber-400' : ''}`} />
              </button>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Away</span>
          </div>
        </div>

        {/* Live Timeline Events (Goals, Cards) */}
        {match.events && match.events.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Match Timeline Events
            </div>
            <div className="flex flex-wrap gap-2">
              {match.events.map((evt, idx) => (
                <div
                  key={idx}
                  className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                    evt.type === 'goal'
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 font-medium'
                      : 'bg-[#182030] border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="font-mono font-bold text-white">{evt.minute}'</span>
                  <span>{evt.type === 'goal' ? '⚽' : evt.type === 'yellow' ? '🟨' : '🚩'}</span>
                  <span className="font-bold text-white">{evt.player}</span>
                  {evt.detail && <span className="text-[10px] text-slate-400">({evt.detail})</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Market Group Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none border-b border-slate-800">
        {MARKET_GROUPS.map((grp) => {
          const isActive = activeMarketGroup === grp.id;
          return (
            <button
              key={grp.id}
              type="button"
              onClick={() => setActiveMarketGroup(grp.id)}
              className={`px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                isActive
                  ? 'border-[#00e5c9] text-[#00e5c9]'
                  : 'border-transparent text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {grp.label}
            </button>
          );
        })}
      </div>

      {/* Market Cards Feed */}
      <div className="space-y-4">
        {filteredMarkets.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 bg-[#121824] rounded-xl border border-slate-800">
            No markets in this group. Select another market group above.
          </div>
        ) : (
          filteredMarkets.map((market) => {
            const isCollapsed = collapsedMarkets[market.id];

            return (
              <div
                key={market.id}
                className="bg-[#121824] border border-slate-800 rounded-xl overflow-hidden shadow-md"
              >
                {/* Market Card Header */}
                <div
                  onClick={() => toggleMarketCollapse(market.id)}
                  className="px-4 py-3 bg-[#151c2a] flex items-center justify-between cursor-pointer hover:bg-[#182233] transition-colors border-b border-slate-800/80"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{market.name}</span>
                    {market.suspended && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded uppercase">
                        <Lock className="w-3 h-3" />
                        <span>Suspended</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-[11px] font-mono">{market.selections.length} selections</span>
                    {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </div>
                </div>

                {/* Selections Grid */}
                {!isCollapsed && (
                  <div className="p-3">
                    <div
                      className={`grid gap-2 ${
                        market.selections.length <= 2
                          ? 'grid-cols-2'
                          : market.selections.length === 3
                          ? 'grid-cols-3'
                          : 'grid-cols-2 sm:grid-cols-3'
                      }`}
                    >
                      {market.selections.map((selection) => {
                        const slipId = `${match.id}-${selection.id}`;
                        const isSelected = betSlip.some((i) => i.id === slipId);
                        const isSuspended = market.suspended || selection.suspended;

                        return (
                          <OddsButton
                            key={selection.id}
                            label={selection.label}
                            odds={selection.odds}
                            isSelected={isSelected}
                            isSuspended={isSuspended}
                            flashDirection={oddsFlashMap[`${match.id}-${selection.id}`]}
                            onClick={() =>
                              toggleOddsSelection(match, market.name, {
                                id: selection.id,
                                label: selection.label,
                                odds: selection.odds,
                                suspended: isSuspended,
                              })
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
