import React, { useState } from 'react';
import {
  Trophy,
  Star,
  ChevronRight,
  Filter,
  Flame,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { OddsButton } from '../components/common/OddsButton';
import { TOP_COMPETITIONS } from '../data/mockMatches';

export const FootballPage: React.FC = () => {
  const {
    matches,
    betSlip,
    toggleOddsSelection,
    navigateToMatch,
    followedTeams,
    toggleFollowTeam,
    followedCompetitions,
    toggleFollowCompetition,
    oddsFlashMap,
  } = useSportsbook();

  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [showFollowedOnly, setShowFollowedOnly] = useState<boolean>(false);

  // Football competitions defined in requirements:
  const FOOTBALL_LEAGUES = [
    { id: 'premier-league', name: 'Premier League', badge: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', country: 'England' },
    { id: 'champions-league', name: 'Champions League', badge: '⭐', country: 'Europe' },
    { id: 'laliga', name: 'LaLiga', badge: '🇪🇸', country: 'Spain' },
    { id: 'serie-a', name: 'Serie A', badge: '🇮🇹', country: 'Italy' },
    { id: 'bundesliga', name: 'Bundesliga', badge: '🇩🇪', country: 'Germany' },
  ];

  const footballMatches = matches.filter((m) => m.sportId === 'football');

  const filteredMatches = footballMatches.filter((m) => {
    if (showFollowedOnly) {
      const isCompFollowed = followedCompetitions.has(m.competitionId);
      const isTeamFollowed =
        followedTeams.has(m.homeTeam.name) || followedTeams.has(m.awayTeam.name);
      return isCompFollowed || isTeamFollowed;
    }
    if (selectedLeague !== 'all') {
      return m.competitionId === selectedLeague;
    }
    return true;
  });

  // Group filtered matches by competition
  const matchesByCompetition: Record<string, typeof footballMatches> = {};
  filteredMatches.forEach((m) => {
    if (!matchesByCompetition[m.competitionId]) {
      matchesByCompetition[m.competitionId] = [];
    }
    matchesByCompetition[m.competitionId].push(m);
  });

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Football Hub
            </h1>
            <span className="text-xs text-slate-400">· Europe's Top 5 Competitions</span>
          </div>
          <p className="text-xs text-slate-400">
            Premier League, Champions League, LaLiga, Serie A, and Bundesliga. Follow your favorite clubs & leagues.
          </p>
        </div>

        {/* Followed Only Toggle */}
        <button
          type="button"
          onClick={() => {
            setShowFollowedOnly(!showFollowedOnly);
            if (!showFollowedOnly) setSelectedLeague('all');
          }}
          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            showFollowedOnly
              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
              : 'bg-[#141b28] border-slate-700 text-slate-300 hover:text-white'
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${showFollowedOnly ? 'fill-amber-400' : ''}`} />
          <span>Followed Only ({followedTeams.size + followedCompetitions.size})</span>
        </button>
      </div>

      {/* League Filter Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => {
            setSelectedLeague('all');
            setShowFollowedOnly(false);
          }}
          className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedLeague === 'all' && !showFollowedOnly
              ? 'bg-[#00e5c9] text-slate-950 font-bold shadow-sm'
              : 'bg-[#141b28] text-slate-300 hover:bg-[#192233] hover:text-white border border-slate-800'
          }`}
        >
          All Competitions
        </button>

        {FOOTBALL_LEAGUES.map((league) => {
          const isActive = selectedLeague === league.id && !showFollowedOnly;
          const isFollowed = followedCompetitions.has(league.id);

          return (
            <button
              key={league.id}
              type="button"
              onClick={() => {
                setSelectedLeague(league.id);
                setShowFollowedOnly(false);
              }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#00e5c9] text-slate-950 font-bold shadow-sm'
                  : 'bg-[#141b28] text-slate-300 hover:bg-[#192233] hover:text-white border border-slate-800'
              }`}
            >
              <span>{league.badge}</span>
              <span>{league.name}</span>
              {isFollowed && <Star className="w-3 h-3 fill-amber-400 text-amber-400" />}
            </button>
          );
        })}
      </div>

      {/* Competitions & Matches Feed */}
      {Object.keys(matchesByCompetition).length === 0 ? (
        <div className="p-8 rounded-2xl bg-[#121824] border border-slate-800 text-center">
          <Star className="w-8 h-8 text-amber-400 mx-auto mb-2 opacity-50" />
          <h3 className="text-sm font-bold text-white mb-1">No Matches Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            {showFollowedOnly
              ? 'You have not followed any clubs or competitions in this view yet. Tap the star icon on any team or league!'
              : 'No scheduled fixtures match your current filter.'}
          </p>
          {showFollowedOnly && (
            <button
              type="button"
              onClick={() => setShowFollowedOnly(false)}
              className="px-4 py-2 bg-[#00e5c9] hover:bg-[#00f5d4] text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              Show All Matches
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {FOOTBALL_LEAGUES.map((league) => {
            const matchesInLeague = matchesByCompetition[league.id];
            if (!matchesInLeague || matchesInLeague.length === 0) return null;

            const isCompFollowed = followedCompetitions.has(league.id);

            return (
              <section
                key={league.id}
                className="rounded-2xl border border-slate-800 bg-[#121824] overflow-hidden shadow-lg"
              >
                {/* Competition Header with Follow Button */}
                <div className="bg-[#161f30] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{league.badge}</span>
                    <h2 className="text-sm font-bold text-white tracking-tight">
                      {league.name}
                    </h2>
                    <span className="text-[11px] text-slate-400">· {league.country}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFollowCompetition(league.id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors border ${
                      isCompFollowed
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                        : 'bg-[#1b2538] border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${isCompFollowed ? 'fill-amber-400 text-amber-400' : ''}`} />
                    <span>{isCompFollowed ? 'Following' : 'Follow League'}</span>
                  </button>
                </div>

                {/* Match Result Odds Header Row for Desktop */}
                <div className="hidden md:flex items-center justify-between px-4 py-2 bg-[#0e1420] text-[11px] text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800/80">
                  <div className="flex-1">Match & Kickoff</div>
                  <div className="w-80 grid grid-cols-3 gap-2 text-center">
                    <span>1 (Home)</span>
                    <span>X (Draw)</span>
                    <span>2 (Away)</span>
                  </div>
                  <div className="w-12 text-right">More</div>
                </div>

                {/* Match Rows */}
                <div className="divide-y divide-slate-800/70">
                  {matchesInLeague.map((match) => {
                    const isHomeFollowed = followedTeams.has(match.homeTeam.name);
                    const isAwayFollowed = followedTeams.has(match.awayTeam.name);

                    const homeSelected = betSlip.some((i) => i.id.startsWith(`${match.id}`) && i.selectionLabel === match.homeTeam.shortName);
                    const drawSelected = betSlip.some((i) => i.id.startsWith(`${match.id}`) && i.selectionLabel === 'Draw');
                    const awaySelected = betSlip.some((i) => i.id.startsWith(`${match.id}`) && i.selectionLabel === match.awayTeam.shortName);

                    return (
                      <div
                        key={match.id}
                        className="p-3 sm:p-4 hover:bg-[#151d2c] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 group"
                      >
                        {/* Match Info & Teams */}
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => navigateToMatch(match.id)}
                        >
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1.5">
                            {match.isLive ? (
                              <span className="flex items-center gap-1 font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span>LIVE {match.period} {match.clock}</span>
                              </span>
                            ) : (
                              <span className="text-cyan-400 font-medium flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{match.startTime}</span>
                              </span>
                            )}
                            {match.venue && (
                              <span className="text-slate-500 text-[10px] hidden sm:inline">
                                · {match.venue}
                              </span>
                            )}
                          </div>

                          {/* Teams with Follow Star Affordance */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between md:justify-start gap-3">
                              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white group-hover:text-[#00e5c9] transition-colors">
                                <span
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{ backgroundColor: match.homeTeam.crestColor }}
                                />
                                <span>{match.homeTeam.name}</span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFollowTeam(match.homeTeam.name);
                                }}
                                className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                                  isHomeFollowed ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
                                }`}
                                title={isHomeFollowed ? 'Unfollow' : 'Follow team'}
                              >
                                <Star className={`w-3.5 h-3.5 ${isHomeFollowed ? 'fill-amber-400' : ''}`} />
                              </button>
                              {match.isLive && (
                                <span className="font-mono font-bold text-sm text-white ml-auto md:ml-4">
                                  {match.score.home}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center justify-between md:justify-start gap-3">
                              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white group-hover:text-[#00e5c9] transition-colors">
                                <span
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{ backgroundColor: match.awayTeam.crestColor }}
                                />
                                <span>{match.awayTeam.name}</span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFollowTeam(match.awayTeam.name);
                                }}
                                className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                                  isAwayFollowed ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
                                }`}
                                title={isAwayFollowed ? 'Unfollow' : 'Follow team'}
                              >
                                <Star className={`w-3.5 h-3.5 ${isAwayFollowed ? 'fill-amber-400' : ''}`} />
                              </button>
                              {match.isLive && (
                                <span className="font-mono font-bold text-sm text-white ml-auto md:ml-4">
                                  {match.score.away}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Match Result Odds Columns (1, X, 2) on Each Row */}
                        <div className="grid grid-cols-3 gap-2 w-full md:w-80 shrink-0">
                          <OddsButton
                            compact
                            label="1"
                            odds={match.matchResultOdds.home}
                            isSelected={homeSelected}
                            isSuspended={match.matchResultOdds.homeSuspended}
                            flashDirection={oddsFlashMap[`${match.id}-home`]}
                            onClick={() =>
                              toggleOddsSelection(match, 'Match Result (1X2)', {
                                id: `${match.id}-1`,
                                label: match.homeTeam.shortName,
                                odds: match.matchResultOdds.home,
                              })
                            }
                          />

                          <OddsButton
                            compact
                            label="X"
                            odds={match.matchResultOdds.draw}
                            isSelected={drawSelected}
                            isSuspended={match.matchResultOdds.drawSuspended}
                            flashDirection={oddsFlashMap[`${match.id}-draw`]}
                            onClick={() =>
                              toggleOddsSelection(match, 'Match Result (1X2)', {
                                id: `${match.id}-x`,
                                label: 'Draw',
                                odds: match.matchResultOdds.draw,
                              })
                            }
                          />

                          <OddsButton
                            compact
                            label="2"
                            odds={match.matchResultOdds.away}
                            isSelected={awaySelected}
                            isSuspended={match.matchResultOdds.awaySuspended}
                            flashDirection={oddsFlashMap[`${match.id}-away`]}
                            onClick={() =>
                              toggleOddsSelection(match, 'Match Result (1X2)', {
                                id: `${match.id}-2`,
                                label: match.awayTeam.shortName,
                                odds: match.matchResultOdds.away,
                              })
                            }
                          />
                        </div>

                        {/* Navigate to full Match Page */}
                        <button
                          type="button"
                          onClick={() => navigateToMatch(match.id)}
                          className="hidden md:flex p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors shrink-0"
                          title="Open match page"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};
