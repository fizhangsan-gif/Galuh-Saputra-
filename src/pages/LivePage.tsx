import React, { useState } from 'react';
import {
  Radio,
  Clock,
  Filter,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { OddsButton } from '../components/common/OddsButton';
import { SportId } from '../types/sportsbook';

export const LivePage: React.FC = () => {
  const {
    matches,
    betSlip,
    toggleOddsSelection,
    navigateToMatch,
    oddsFlashMap,
    isSimulatingNoLive,
    toggleSimulatedNoLive,
  } = useSportsbook();

  const [liveSportFilter, setLiveSportFilter] = useState<SportId | 'all'>('all');
  const [selectedCompetition, setSelectedCompetition] = useState<string>('all');

  // Filter live matches
  const allLive = isSimulatingNoLive ? [] : matches.filter((m) => m.isLive);

  const filteredLiveMatches = allLive.filter((m) => {
    const sportMatch = liveSportFilter === 'all' || m.sportId === liveSportFilter;
    const compMatch = selectedCompetition === 'all' || m.competitionId === selectedCompetition;
    return sportMatch && compMatch;
  });

  // Starting soon matches for fallback or preview
  const startingSoonMatches = matches.filter((m) => !m.isLive);

  // Available competitions for live matches
  const liveCompetitions = Array.from(
    new Set(allLive.map((m) => ({ id: m.competitionId, name: m.competition })))
  );

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Page Title & Live Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Live In-Play
            </h1>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {filteredLiveMatches.length} Active
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time live scores, match clocks, and moving in-play market odds.
          </p>
        </div>

        {/* Prototype simulation toggle for evaluation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSimulatedNoLive}
            className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
              isSimulatingNoLive
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-[#141b28] border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            {isSimulatingNoLive ? 'Disable Empty Live State' : 'Simulate Nothing Live'}
          </button>
        </div>
      </div>

      {/* Sport and Competition Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#121824] p-3 rounded-xl border border-slate-800">
        {/* Sport Segmented Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'All In-Play', count: allLive.length },
            { id: 'football', label: 'Football', count: allLive.filter((m) => m.sportId === 'football').length },
            { id: 'basketball', label: 'Basketball', count: allLive.filter((m) => m.sportId === 'basketball').length },
            { id: 'tennis', label: 'Tennis', count: allLive.filter((m) => m.sportId === 'tennis').length },
            { id: 'esports', label: 'Esports', count: allLive.filter((m) => m.sportId === 'esports').length },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setLiveSportFilter(tab.id as any);
                setSelectedCompetition('all');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                liveSportFilter === tab.id
                  ? 'bg-[#00e5c9] text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1 rounded ${
                  liveSportFilter === tab.id ? 'bg-slate-950 text-[#00e5c9]' : 'text-slate-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Competition Dropdown filter */}
        {liveCompetitions.length > 0 && (
          <div className="flex items-center gap-2 text-xs shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCompetition}
              onChange={(e) => setSelectedCompetition(e.target.value)}
              className="bg-[#182030] border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#00e5c9]"
            >
              <option value="all">All Competitions</option>
              {liveCompetitions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Case 1: Active Live Matches */}
      {filteredLiveMatches.length > 0 ? (
        <div className="space-y-3">
          {filteredLiveMatches.map((m) => {
            const homeSelected = betSlip.some((i) => i.id.startsWith(`${m.id}`) && i.selectionLabel === m.homeTeam.shortName);
            const drawSelected = betSlip.some((i) => i.id.startsWith(`${m.id}`) && i.selectionLabel === 'Draw');
            const awaySelected = betSlip.some((i) => i.id.startsWith(`${m.id}`) && i.selectionLabel === m.awayTeam.shortName);

            return (
              <div
                key={m.id}
                className="bg-[#121824] hover:bg-[#141d2c] border border-slate-800 rounded-xl p-4 transition-all shadow-md group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Competition, Teams, Live Clock & Score */}
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => navigateToMatch(m.id)}
                  >
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                      <span className="font-semibold text-slate-300">{m.competition}</span>
                      <span>·</span>
                      <span className="text-emerald-400 font-mono font-bold flex items-center gap-1 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{m.period} {m.clock}</span>
                      </span>
                      {m.venue && (
                        <>
                          <span className="text-slate-600 hidden sm:inline">·</span>
                          <span className="text-slate-400 text-[10px] hidden sm:inline">{m.venue}</span>
                        </>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg">
                      <div className="flex items-center justify-between bg-[#172030] px-3 py-2 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: m.homeTeam.crestColor }}
                          />
                          <span className="font-bold text-xs text-white group-hover:text-[#00e5c9] transition-colors">
                            {m.homeTeam.name}
                          </span>
                        </div>
                        <span className="font-mono tabular-nums font-extrabold text-base text-white">
                          {m.score.home}
                        </span>
                      </div>

                      <div className="flex items-center justify-between bg-[#172030] px-3 py-2 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: m.awayTeam.crestColor }}
                          />
                          <span className="font-bold text-xs text-white group-hover:text-[#00e5c9] transition-colors">
                            {m.awayTeam.name}
                          </span>
                        </div>
                        <span className="font-mono tabular-nums font-extrabold text-base text-white">
                          {m.score.away}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: In-Play Match Result Odds & Deep link */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                    <div className="grid grid-cols-3 gap-2 w-full sm:w-72">
                      <OddsButton
                        compact
                        label={m.homeTeam.shortName}
                        odds={m.matchResultOdds.home}
                        isSelected={homeSelected}
                        isSuspended={m.matchResultOdds.homeSuspended}
                        flashDirection={oddsFlashMap[`${m.id}-home`]}
                        onClick={() =>
                          toggleOddsSelection(m, 'Match Result (1X2)', {
                            id: `${m.id}-home`,
                            label: m.homeTeam.shortName,
                            odds: m.matchResultOdds.home,
                          })
                        }
                      />
                      <OddsButton
                        compact
                        label="Draw"
                        odds={m.matchResultOdds.draw}
                        isSelected={drawSelected}
                        isSuspended={m.matchResultOdds.drawSuspended}
                        flashDirection={oddsFlashMap[`${m.id}-draw`]}
                        onClick={() =>
                          toggleOddsSelection(m, 'Match Result (1X2)', {
                            id: `${m.id}-draw`,
                            label: 'Draw',
                            odds: m.matchResultOdds.draw,
                          })
                        }
                      />
                      <OddsButton
                        compact
                        label={m.awayTeam.shortName}
                        odds={m.matchResultOdds.away}
                        isSelected={awaySelected}
                        isSuspended={m.matchResultOdds.awaySuspended}
                        flashDirection={oddsFlashMap[`${m.id}-away`]}
                        onClick={() =>
                          toggleOddsSelection(m, 'Match Result (1X2)', {
                            id: `${m.id}-away`,
                            label: m.awayTeam.shortName,
                            odds: m.matchResultOdds.away,
                          })
                        }
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => navigateToMatch(m.id)}
                      className="px-3 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                      title="View all markets"
                    >
                      <span>+{m.markets.length * 3}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Case 2: Nothing Live State -> Seamlessly Show Starting Soon */
        <div className="space-y-6">
          <div className="p-8 rounded-2xl bg-[#121824] border border-slate-800 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center mb-3">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              No Matches Currently in Play
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              There are no live games matching your current filter right now. Explore upcoming matches scheduled to kick off shortly below!
            </p>
            {isSimulatingNoLive && (
              <button
                type="button"
                onClick={toggleSimulatedNoLive}
                className="px-4 py-2 bg-[#00e5c9] hover:bg-[#00f5d4] text-slate-950 font-bold text-xs rounded-lg transition-colors"
              >
                Restore Live Matches Feed
              </button>
            )}
          </div>

          {/* Starting Soon Section Promoted to Forefront */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#00e5c9]" />
              <h2 className="text-base font-bold text-white tracking-tight">
                Starting Soon (Upcoming Fixtures)
              </h2>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#121824] divide-y divide-slate-800/80 overflow-hidden">
              {startingSoonMatches.map((match) => {
                const isHomeSelected = betSlip.some((i) => i.id === `${match.id}-1`);
                const isDrawSelected = betSlip.some((i) => i.id === `${match.id}-x`);
                const isAwaySelected = betSlip.some((i) => i.id === `${match.id}-2`);

                return (
                  <div
                    key={match.id}
                    className="p-3 sm:p-4 hover:bg-[#151c2a] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => navigateToMatch(match.id)}
                    >
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                        <span className="font-semibold text-slate-300">{match.competition}</span>
                        <span>·</span>
                        <span className="text-cyan-400 font-medium">{match.clock}</span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white">
                        {match.homeTeam.name} <span className="text-slate-500 font-normal">v</span> {match.awayTeam.name}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 w-full md:w-80 shrink-0">
                      <OddsButton
                        compact
                        label="1"
                        odds={match.matchResultOdds.home}
                        isSelected={isHomeSelected}
                        onClick={() =>
                          toggleOddsSelection(match, 'Match Result (1X2)', {
                            id: '1',
                            label: match.homeTeam.shortName,
                            odds: match.matchResultOdds.home,
                          })
                        }
                      />
                      <OddsButton
                        compact
                        label="X"
                        odds={match.matchResultOdds.draw}
                        isSelected={isDrawSelected}
                        onClick={() =>
                          toggleOddsSelection(match, 'Match Result (1X2)', {
                            id: 'x',
                            label: 'Draw',
                            odds: match.matchResultOdds.draw,
                          })
                        }
                      />
                      <OddsButton
                        compact
                        label="2"
                        odds={match.matchResultOdds.away}
                        isSelected={isAwaySelected}
                        onClick={() =>
                          toggleOddsSelection(match, 'Match Result (1X2)', {
                            id: '2',
                            label: match.awayTeam.shortName,
                            odds: match.matchResultOdds.away,
                          })
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
