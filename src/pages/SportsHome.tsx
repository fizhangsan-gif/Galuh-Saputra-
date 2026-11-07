import React from 'react';
import {
  Radio,
  Clock,
  ChevronRight,
  Star,
  Activity,
  Flame,
  Search,
  Sparkles,
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { OddsButton } from '../components/common/OddsButton';
import { TOP_COMPETITIONS } from '../data/mockMatches';
import { SportId } from '../types/sportsbook';

export const SportsHome: React.FC = () => {
  const {
    matches,
    betSlip,
    toggleOddsSelection,
    navigateToMatch,
    oddsFlashMap,
    isSimulatingNoLive,
    followedTeams,
    toggleFollowTeam,
    followedCompetitions,
    toggleFollowCompetition,
    selectedSportFilter,
    setSelectedSportFilter,
    setActivePage,
  } = useSportsbook();

  const liveMatches = isSimulatingNoLive
    ? []
    : matches.filter(
        (m) =>
          m.isLive &&
          (selectedSportFilter === 'all' || m.sportId === selectedSportFilter)
      );

  const startingSoonMatches = matches.filter(
    (m) =>
      !m.isLive &&
      (selectedSportFilter === 'all' || m.sportId === selectedSportFilter)
  );

  const SPORTS_CHIPS: { id: SportId | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Sports', icon: '🔥' },
    { id: 'football', label: 'Football', icon: '⚽' },
    { id: 'basketball', label: 'Basketball', icon: '🏀' },
    { id: 'tennis', label: 'Tennis', icon: '🎾' },
    { id: 'esports', label: 'Esports', icon: '🎮' },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Hero Banner / Highlight Carousel Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0c192c] via-[#10233b] to-[#0c1724] border border-slate-800 p-4 sm:p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                Featured Live In-Play
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-[11px] text-slate-300 font-medium">Premier League</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Arsenal v Brighton & Hove Albion
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Gunners lead 2-1 at the Emirates in the 68th minute. Full in-play markets open.
            </p>

            <div className="flex items-center gap-2 mt-4">
              <button
                type="button"
                onClick={() => navigateToMatch('arsenal-brighton')}
                className="px-4 py-2 bg-[#00e5c9] hover:bg-[#00f5d4] text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-lg shadow-[#00e5c9]/15"
              >
                <span>Open Match Page</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setActivePage('live')}
                className="px-3.5 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-semibold text-xs rounded-lg transition-colors"
              >
                View All Live Matches
              </button>
            </div>
          </div>

          {/* Quick Odds for Arsenal v Brighton */}
          <div className="w-full md:w-auto bg-[#0a0f18]/80 backdrop-blur-md border border-slate-800 rounded-xl p-3 shrink-0">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
              <span className="font-semibold text-white">Score: 2 - 1 (68')</span>
              <span className="text-slate-400">Match Result 1X2</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <OddsButton
                label="Arsenal"
                odds={1.42}
                isSelected={betSlip.some((i) => i.id === 'arsenal-brighton-ab-1x2-1')}
                flashDirection={oddsFlashMap['arsenal-brighton-ab-1x2-1']}
                onClick={() => {
                  const arsMatch = matches.find((m) => m.id === 'arsenal-brighton');
                  if (arsMatch) {
                    toggleOddsSelection(arsMatch, 'Match Result (1X2)', {
                      id: 'ab-1x2-1',
                      label: 'Arsenal',
                      odds: 1.42,
                    });
                  }
                }}
              />
              <OddsButton
                label="Draw"
                odds={4.50}
                isSelected={betSlip.some((i) => i.id === 'arsenal-brighton-ab-1x2-x')}
                flashDirection={oddsFlashMap['arsenal-brighton-ab-1x2-x']}
                onClick={() => {
                  const arsMatch = matches.find((m) => m.id === 'arsenal-brighton');
                  if (arsMatch) {
                    toggleOddsSelection(arsMatch, 'Match Result (1X2)', {
                      id: 'ab-1x2-x',
                      label: 'Draw',
                      odds: 4.50,
                    });
                  }
                }}
              />
              <OddsButton
                label="Brighton"
                odds={7.20}
                isSelected={betSlip.some((i) => i.id === 'arsenal-brighton-ab-1x2-2')}
                flashDirection={oddsFlashMap['arsenal-brighton-ab-1x2-2']}
                onClick={() => {
                  const arsMatch = matches.find((m) => m.id === 'arsenal-brighton');
                  if (arsMatch) {
                    toggleOddsSelection(arsMatch, 'Match Result (1X2)', {
                      id: 'ab-1x2-2',
                      label: 'Brighton',
                      odds: 7.20,
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sports Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {SPORTS_CHIPS.map((chip) => {
          const isActive = selectedSportFilter === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setSelectedSportFilter(chip.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#00e5c9] text-slate-950 font-bold shadow-sm'
                  : 'bg-[#141b28] text-slate-300 hover:bg-[#1a2334] hover:text-white border border-slate-800'
              }`}
            >
              <span>{chip.icon}</span>
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Live Now Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <h2 className="text-base font-bold text-white tracking-tight">Live Now</h2>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
              {liveMatches.length}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setActivePage('live')}
            className="text-xs text-[#00e5c9] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>See all live</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {liveMatches.length === 0 ? (
          /* Empty Live fallback */
          <div className="p-6 rounded-xl bg-[#121824] border border-slate-800 text-center">
            <p className="text-sm font-semibold text-white">No live matches in play right now</p>
            <p className="text-xs text-slate-400 mt-1">Check out upcoming fixtures starting soon below.</p>
          </div>
        ) : (
          /* Live Matches Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {liveMatches.map((m) => {
              const homeSelected = betSlip.some((i) => i.id === `${m.id}-ab-1x2-1` || i.id === `${m.id}-rb-1x2-1` || i.id === `${m.id}-cw-ml-1` || i.id === `${m.id}-as-mw-1` || i.id === `${m.id}-tg-mw-1`);
              const drawSelected = betSlip.some((i) => i.id === `${m.id}-ab-1x2-x` || i.id === `${m.id}-rb-1x2-x`);
              const awaySelected = betSlip.some((i) => i.id === `${m.id}-ab-1x2-2` || i.id === `${m.id}-rb-1x2-2` || i.id === `${m.id}-cw-ml-2` || i.id === `${m.id}-as-mw-2` || i.id === `${m.id}-tg-mw-2`);

              return (
                <div
                  key={m.id}
                  onClick={() => navigateToMatch(m.id)}
                  className="p-3.5 rounded-xl bg-[#121824] hover:bg-[#151c2a] border border-slate-800 transition-all cursor-pointer group shadow-md"
                >
                  {/* League & Live Clock */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <span className="font-semibold text-slate-300 truncate">{m.competition}</span>
                    <span className="flex items-center gap-1 font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{m.period} {m.clock}</span>
                    </span>
                  </div>

                  {/* Team Names & Live Score */}
                  <div className="space-y-1 my-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: m.homeTeam.crestColor }}
                        />
                        <span className="font-bold text-white group-hover:text-[#00e5c9] transition-colors">
                          {m.homeTeam.name}
                        </span>
                      </div>
                      <span className="font-mono tabular-nums font-extrabold text-sm text-white">
                        {m.score.home}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: m.awayTeam.crestColor }}
                        />
                        <span className="font-bold text-white group-hover:text-[#00e5c9] transition-colors">
                          {m.awayTeam.name}
                        </span>
                      </div>
                      <span className="font-mono tabular-nums font-extrabold text-sm text-white">
                        {m.score.away}
                      </span>
                    </div>
                  </div>

                  {/* Quick Odds 1X2 Row */}
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-800/80">
                    <OddsButton
                      compact
                      label="1"
                      odds={m.matchResultOdds.home}
                      isSelected={homeSelected}
                      isSuspended={m.matchResultOdds.homeSuspended}
                      flashDirection={oddsFlashMap[`${m.id}-home`]}
                      onClick={() =>
                        toggleOddsSelection(m, 'Match Result (1X2)', {
                          id: `${m.id === 'arsenal-brighton' ? 'ab-1x2-1' : m.id === 'real-bayern' ? 'rb-1x2-1' : 'cw-ml-1'}`,
                          label: m.homeTeam.shortName,
                          odds: m.matchResultOdds.home,
                        })
                      }
                    />

                    <OddsButton
                      compact
                      label="X"
                      odds={m.matchResultOdds.draw}
                      isSelected={drawSelected}
                      isSuspended={m.matchResultOdds.drawSuspended}
                      flashDirection={oddsFlashMap[`${m.id}-draw`]}
                      onClick={() =>
                        toggleOddsSelection(m, 'Match Result (1X2)', {
                          id: `${m.id === 'arsenal-brighton' ? 'ab-1x2-x' : 'rb-1x2-x'}`,
                          label: 'Draw',
                          odds: m.matchResultOdds.draw,
                        })
                      }
                    />

                    <OddsButton
                      compact
                      label="2"
                      odds={m.matchResultOdds.away}
                      isSelected={awaySelected}
                      isSuspended={m.matchResultOdds.awaySuspended}
                      flashDirection={oddsFlashMap[`${m.id}-away`]}
                      onClick={() =>
                        toggleOddsSelection(m, 'Match Result (1X2)', {
                          id: `${m.id === 'arsenal-brighton' ? 'ab-1x2-2' : m.id === 'real-bayern' ? 'rb-1x2-2' : 'cw-ml-2'}`,
                          label: m.awayTeam.shortName,
                          odds: m.matchResultOdds.away,
                        })
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 2. Top Competitions Banner */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-white tracking-tight">Top Competitions</h2>
          </div>
          <button
            type="button"
            onClick={() => setActivePage('football')}
            className="text-xs text-[#00e5c9] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Explore all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {TOP_COMPETITIONS.slice(0, 5).map((comp) => {
            const isFollowed = followedCompetitions.has(comp.id);
            return (
              <div
                key={comp.id}
                onClick={() => setActivePage('football')}
                className="p-3 rounded-xl bg-[#121824] hover:bg-[#161f30] border border-slate-800 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{comp.badge}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFollowCompetition(comp.id);
                    }}
                    className={`p-1 rounded ${
                      isFollowed ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${isFollowed ? 'fill-amber-400' : ''}`} />
                  </button>
                </div>
                <div className="mt-2">
                  <div className="text-xs font-bold text-white truncate">{comp.name}</div>
                  <div className="text-[10px] text-slate-400">{comp.country}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Starting Soon Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-bold text-white tracking-tight">Starting Soon</h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-bold">
              {startingSoonMatches.length}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#121824] divide-y divide-slate-800/80 overflow-hidden">
          {startingSoonMatches.map((match) => {
            const isHomeSelected = betSlip.some((i) => i.id === `${match.id}-1`);
            const isDrawSelected = betSlip.some((i) => i.id === `${match.id}-x`);
            const isAwaySelected = betSlip.some((i) => i.id === `${match.id}-2`);
            const isHomeFollowed = followedTeams.has(match.homeTeam.name);
            const isAwayFollowed = followedTeams.has(match.awayTeam.name);

            return (
              <div
                key={match.id}
                className="p-3 sm:p-4 hover:bg-[#151c2a] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                {/* Match Metadata & Kickoff */}
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => navigateToMatch(match.id)}
                >
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                    <span className="font-semibold text-slate-300">{match.competition}</span>
                    <span>·</span>
                    <span className="text-cyan-400 font-medium">{match.clock}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span className="hover:text-[#00e5c9] transition-colors">
                        {match.homeTeam.name}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFollowTeam(match.homeTeam.name);
                        }}
                        className={`p-0.5 ${isHomeFollowed ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}
                        title="Follow team"
                      >
                        <Star className={`w-3 h-3 ${isHomeFollowed ? 'fill-amber-400' : ''}`} />
                      </button>

                      <span className="text-slate-500 font-normal">v</span>

                      <span className="hover:text-[#00e5c9] transition-colors">
                        {match.awayTeam.name}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFollowTeam(match.awayTeam.name);
                        }}
                        className={`p-0.5 ${isAwayFollowed ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}
                        title="Follow team"
                      >
                        <Star className={`w-3 h-3 ${isAwayFollowed ? 'fill-amber-400' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Match Result 1X2 Odds Buttons */}
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
  );
};
