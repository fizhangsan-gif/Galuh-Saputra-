import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Match,
  BetSlipItem,
  MyBet,
  PageId,
  SportId,
} from '../types/sportsbook';
import { INITIAL_MATCHES, INITIAL_MY_BETS } from '../data/mockMatches';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
}

interface SportsbookContextType {
  matches: Match[];
  userBalance: number;
  betSlip: BetSlipItem[];
  myBets: MyBet[];
  activePage: PageId;
  selectedMatchId: string;
  selectedSportFilter: SportId | 'all';
  searchQuery: string;
  followedTeams: Set<string>;
  followedCompetitions: Set<string>;
  isBetSlipOpenOnMobile: boolean;
  oddsFlashMap: Record<string, 'up' | 'down'>;
  isSimulatingFailure: boolean;
  isSimulatingNoLive: boolean;
  viewMode: 'responsive' | 'mobile' | 'desktop';
  lastPlacedBetId: string | null;
  toasts: ToastMessage[];

  // Navigation & UI
  setActivePage: (page: PageId) => void;
  navigateToMatch: (matchId: string) => void;
  setSelectedSportFilter: (sport: SportId | 'all') => void;
  setSearchQuery: (query: string) => void;
  setIsBetSlipOpenOnMobile: (open: boolean) => void;
  setViewMode: (mode: 'responsive' | 'mobile' | 'desktop') => void;
  dismissToast: (id: string) => void;
  setLastPlacedBetId: (id: string | null) => void;

  // Betting Actions
  toggleOddsSelection: (
    match: Match,
    marketName: string,
    selection: { id: string; label: string; odds: number; suspended?: boolean }
  ) => void;
  updateItemStake: (id: string, stake: number) => void;
  removeFromSlip: (id: string) => void;
  clearSlip: () => void;
  acceptOddsChange: (id?: string) => void;
  placeSingleBet: (id: string) => { success: boolean; error?: string };
  placeAllSingles: () => { successCount: number; errors: string[] };
  cashOutBet: (betId: string) => void;

  // Favorites
  toggleFollowTeam: (teamName: string) => void;
  toggleFollowCompetition: (compId: string) => void;

  // Prototype Simulation Controls
  simulateOddsShift: () => void;
  simulateSuspensionToggle: () => void;
  simulateGoalScore: () => void;
  toggleSimulatedFailure: () => void;
  toggleSimulatedNoLive: () => void;
  depositFunds: (amount: number) => void;
  resetDemoData: () => void;
}

const SportsbookContext = createContext<SportsbookContextType | undefined>(undefined);

export const SportsbookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [userBalance, setUserBalance] = useState<number>(1250.0);
  const [betSlip, setBetSlip] = useState<BetSlipItem[]>([
    // Pre-populate with one item for immediate discoverability
    {
      id: 'arsenal-brighton-ab-1x2-1',
      matchId: 'arsenal-brighton',
      matchTitle: 'Arsenal v Brighton & Hove Albion',
      competition: 'Premier League',
      marketName: 'Match Result',
      selectionId: 'ab-1x2-1',
      selectionLabel: 'Arsenal',
      odds: 1.42,
      initialOdds: 1.42,
      oddsChanged: false,
      suspended: false,
      stake: 20.0,
    },
  ]);
  const [myBets, setMyBets] = useState<MyBet[]>(INITIAL_MY_BETS);
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedMatchId, setSelectedMatchId] = useState<string>('arsenal-brighton');
  const [selectedSportFilter, setSelectedSportFilter] = useState<SportId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [followedTeams, setFollowedTeams] = useState<Set<string>>(new Set(['Arsenal', 'Real Madrid']));
  const [followedCompetitions, setFollowedCompetitions] = useState<Set<string>>(new Set(['premier-league', 'champions-league']));
  const [isBetSlipOpenOnMobile, setIsBetSlipOpenOnMobile] = useState<boolean>(false);
  const [oddsFlashMap, setOddsFlashMap] = useState<Record<string, 'up' | 'down'>>({});
  const [isSimulatingFailure, setIsSimulatingFailure] = useState<boolean>(false);
  const [isSimulatingNoLive, setIsSimulatingNoLive] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'responsive' | 'mobile' | 'desktop'>('responsive');
  const [lastPlacedBetId, setLastPlacedBetId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'warning' | 'info', title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev.slice(-3), { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateToMatch = (matchId: string) => {
    setSelectedMatchId(matchId);
    setActivePage('match');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleOddsSelection = (
    match: Match,
    marketName: string,
    selection: { id: string; label: string; odds: number; suspended?: boolean }
  ) => {
    const slipItemId = `${match.id}-${selection.id}`;
    const exists = betSlip.some((item) => item.id === slipItemId);

    if (exists) {
      setBetSlip((prev) => prev.filter((item) => item.id !== slipItemId));
      addToast('info', 'Removed from Bet Slip', `${selection.label} (${selection.odds.toFixed(2)})`);
    } else {
      const newItem: BetSlipItem = {
        id: slipItemId,
        matchId: match.id,
        matchTitle: `${match.homeTeam.name} v ${match.awayTeam.name}`,
        competition: match.competition,
        marketName,
        selectionId: selection.id,
        selectionLabel: selection.label,
        odds: selection.odds,
        initialOdds: selection.odds,
        oddsChanged: false,
        suspended: selection.suspended || false,
        stake: 10.0,
      };
      setBetSlip((prev) => [...prev, newItem]);
      addToast('success', 'Added to Bet Slip', `${selection.label} @ ${selection.odds.toFixed(2)}`);
    }
  };

  const updateItemStake = (id: string, stake: number) => {
    const clamped = Math.max(0, isNaN(stake) ? 0 : stake);
    setBetSlip((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stake: clamped } : item))
    );
  };

  const removeFromSlip = (id: string) => {
    setBetSlip((prev) => prev.filter((item) => item.id !== id));
  };

  const clearSlip = () => {
    setBetSlip([]);
    addToast('info', 'Bet Slip cleared');
  };

  const acceptOddsChange = (id?: string) => {
    setBetSlip((prev) =>
      prev.map((item) => {
        if (!id || item.id === id) {
          return {
            ...item,
            initialOdds: item.odds,
            oddsChanged: false,
          };
        }
        return item;
      })
    );
    addToast('info', 'Updated odds accepted');
  };

  const placeSingleBet = (id: string): { success: boolean; error?: string } => {
    const item = betSlip.find((i) => i.id === id);
    if (!item) return { success: false, error: 'Selection not found' };

    if (item.suspended) {
      addToast('error', 'Selection Suspended', 'This market is currently suspended and cannot be placed.');
      return { success: false, error: 'Market suspended' };
    }

    if (item.oddsChanged) {
      addToast('warning', 'Odds Changed', 'Please accept the updated odds before placing your bet.');
      return { success: false, error: 'Odds changed' };
    }

    if (item.stake <= 0) {
      addToast('warning', 'Invalid Stake', 'Please enter a valid stake in USDT.');
      return { success: false, error: 'Stake must be greater than 0' };
    }

    if (userBalance < item.stake) {
      addToast('error', 'Insufficient USDT Balance', `You have ${userBalance.toFixed(2)} USDT. Required: ${item.stake.toFixed(2)} USDT.`);
      return { success: false, error: 'Insufficient balance' };
    }

    if (isSimulatingFailure) {
      addToast('error', 'Bet Placement Failed', 'Simulated failure triggered (e.g. remote feed timeout or liquidity limit).');
      return { success: false, error: 'Simulated failure rejected by exchange' };
    }

    // Success flow
    const betId = `HB-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBet: MyBet = {
      id: betId,
      placedAt: 'Just now',
      matchId: item.matchId,
      matchTitle: item.matchTitle,
      competition: item.competition,
      marketName: item.marketName,
      selectionLabel: item.selectionLabel,
      odds: item.odds,
      stake: item.stake,
      potentialReturn: +(item.stake * item.odds).toFixed(2),
      status: 'open',
      cashOutValue: +(item.stake * 0.95).toFixed(2),
      liveScore: 'In Play',
    };

    setUserBalance((prev) => +(prev - item.stake).toFixed(2));
    setMyBets((prev) => [newBet, ...prev]);
    setBetSlip((prev) => prev.filter((i) => i.id !== id));
    setLastPlacedBetId(betId);
    addToast('success', 'Bet Placed Successfully!', `${item.selectionLabel} @ ${item.odds.toFixed(2)} (Stake: ${item.stake.toFixed(2)} USDT)`);

    return { success: true };
  };

  const placeAllSingles = () => {
    let successCount = 0;
    const errors: string[] = [];

    const itemsToPlace = [...betSlip];
    for (const item of itemsToPlace) {
      const result = placeSingleBet(item.id);
      if (result.success) {
        successCount++;
      } else if (result.error) {
        errors.push(`${item.selectionLabel}: ${result.error}`);
      }
    }

    return { successCount, errors };
  };

  const cashOutBet = (betId: string) => {
    const bet = myBets.find((b) => b.id === betId);
    if (!bet || bet.status !== 'open' || !bet.cashOutValue) return;

    const payout = bet.cashOutValue;
    setUserBalance((prev) => +(prev + payout).toFixed(2));
    setMyBets((prev) =>
      prev.map((b) =>
        b.id === betId
          ? {
              ...b,
              status: 'cashed_out',
              settledReturn: payout,
              cashOutValue: undefined,
            }
          : b
      )
    );
    addToast('success', 'Cashed Out Successfully!', `Received ${payout.toFixed(2)} USDT for bet ${betId}`);
  };

  const toggleFollowTeam = (teamName: string) => {
    setFollowedTeams((prev) => {
      const next = new Set(prev);
      if (next.has(teamName)) {
        next.delete(teamName);
        addToast('info', `Unfollowed ${teamName}`);
      } else {
        next.add(teamName);
        addToast('success', `Following ${teamName}!`);
      }
      return next;
    });
  };

  const toggleFollowCompetition = (compId: string) => {
    setFollowedCompetitions((prev) => {
      const next = new Set(prev);
      if (next.has(compId)) {
        next.delete(compId);
        addToast('info', 'Unfollowed competition');
      } else {
        next.add(compId);
        addToast('success', 'Following competition!');
      }
      return next;
    });
  };

  // Prototype Simulators
  const simulateOddsShift = () => {
    const newFlashMap: Record<string, 'up' | 'down'> = {};

    setMatches((prevMatches) =>
      prevMatches.map((m) => {
        if (!m.isLive) return m;

        // Shift match result odds slightly
        const deltaHome = +(Math.random() > 0.5 ? 0.08 : -0.06).toFixed(2);
        const newHomeOdds = Math.max(1.05, +(m.matchResultOdds.home + deltaHome).toFixed(2));
        const direction = deltaHome >= 0 ? 'up' : 'down';
        newFlashMap[`${m.id}-ab-1x2-1`] = direction;
        newFlashMap[`${m.id}-home`] = direction;

        const updatedMarkets = m.markets.map((mkt) => {
          return {
            ...mkt,
            selections: mkt.selections.map((sel) => {
              if (Math.random() > 0.4) {
                const shift = +(Math.random() > 0.5 ? 0.12 : -0.1).toFixed(2);
                const updatedOdds = Math.max(1.04, +(sel.odds + shift).toFixed(2));
                const dir = shift >= 0 ? 'up' : 'down';
                newFlashMap[`${m.id}-${sel.id}`] = dir;
                return {
                  ...sel,
                  previousOdds: sel.odds,
                  odds: updatedOdds,
                };
              }
              return sel;
            }),
          };
        });

        return {
          ...m,
          matchResultOdds: {
            ...m.matchResultOdds,
            home: newHomeOdds,
          },
          markets: updatedMarkets,
        };
      })
    );

    // Also update any matching item in betslip to trigger the "Odds Changed: player must accept" requirement!
    setBetSlip((prevSlip) =>
      prevSlip.map((item) => {
        const delta = +(Math.random() > 0.5 ? 0.15 : -0.1).toFixed(2);
        const newOdds = Math.max(1.05, +(item.odds + delta).toFixed(2));
        return {
          ...item,
          initialOdds: item.odds,
          odds: newOdds,
          oddsChanged: true,
        };
      })
    );

    setOddsFlashMap(newFlashMap);
    setTimeout(() => setOddsFlashMap({}), 1800);
    addToast('info', 'Simulated In-Play Odds Movement', 'Odds shifted! Notice animated flash & player acceptance requirement in bet slip.');
  };

  const simulateSuspensionToggle = () => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id === 'arsenal-brighton') {
          const newSuspendedState = !m.matchResultOdds.homeSuspended;
          return {
            ...m,
            matchResultOdds: {
              ...m.matchResultOdds,
              homeSuspended: newSuspendedState,
              drawSuspended: newSuspendedState,
              awaySuspended: newSuspendedState,
            },
            markets: m.markets.map((mkt) =>
              mkt.id === 'ab-1x2' || mkt.id === 'ab-next-goal'
                ? {
                    ...mkt,
                    suspended: newSuspendedState,
                    selections: mkt.selections.map((s) => ({ ...s, suspended: newSuspendedState })),
                  }
                : mkt
            ),
          };
        }
        return m;
      })
    );

    setBetSlip((prev) =>
      prev.map((item) => {
        if (item.matchId === 'arsenal-brighton' && item.marketName.includes('Match Result')) {
          return { ...item, suspended: !item.suspended };
        }
        return item;
      })
    );

    addToast('warning', 'Toggled Market Suspension', 'Arsenal v Brighton 1X2 market status changed (testing suspended UI & slip blocking).');
  };

  const simulateGoalScore = () => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id === 'arsenal-brighton') {
          const newHomeScore = m.score.home + 1;
          const newEvent = {
            type: 'goal' as const,
            minute: 74,
            team: 'home' as const,
            player: 'Bukayo Saka',
            detail: 'Stunning curler into top corner!',
          };
          return {
            ...m,
            score: { ...m.score, home: newHomeScore },
            clock: "74'",
            events: [...(m.events || []), newEvent],
            matchResultOdds: {
              ...m.matchResultOdds,
              home: 1.15,
              draw: 6.80,
              away: 15.00,
            },
          };
        }
        return m;
      })
    );

    // Update cash out values on open bets
    setMyBets((prev) =>
      prev.map((b) => {
        if (b.matchId === 'arsenal-brighton' && b.selectionLabel === 'Arsenal' && b.status === 'open') {
          return {
            ...b,
            liveScore: "3 - 1 (74')",
            cashOutValue: +(b.potentialReturn * 0.92).toFixed(2),
          };
        }
        return b;
      })
    );

    addToast('success', '⚽ GOAL! Arsenal 3 - 1 Brighton', 'Bukayo Saka (74\'). Score and cash out offers dynamically updated!');
  };

  const toggleSimulatedFailure = () => {
    setIsSimulatingFailure((prev) => {
      const next = !prev;
      addToast(next ? 'warning' : 'info', next ? 'Bet Failure Simulation ON' : 'Bet Failure Simulation OFF', next ? 'Next bet placement will fail to demonstrate error handling.' : 'Normal bet placement restored.');
      return next;
    });
  };

  const toggleSimulatedNoLive = () => {
    setIsSimulatingNoLive((prev) => {
      const next = !prev;
      addToast('info', next ? 'Showing No Live Matches state' : 'Restored Live Matches', next ? 'Testing "Nothing live: show Starting soon" fallback.' : 'All live matches restored.');
      return next;
    });
  };

  const depositFunds = (amount: number) => {
    setUserBalance((prev) => +(prev + amount).toFixed(2));
    addToast('success', 'Funds Deposited', `+${amount.toFixed(2)} USDT credited to balance.`);
  };

  const resetDemoData = () => {
    setMatches(INITIAL_MATCHES);
    setUserBalance(1250.0);
    setBetSlip([
      {
        id: 'arsenal-brighton-ab-1x2-1',
        matchId: 'arsenal-brighton',
        matchTitle: 'Arsenal v Brighton & Hove Albion',
        competition: 'Premier League',
        marketName: 'Match Result',
        selectionId: 'ab-1x2-1',
        selectionLabel: 'Arsenal',
        odds: 1.42,
        initialOdds: 1.42,
        oddsChanged: false,
        suspended: false,
        stake: 20.0,
      },
    ]);
    setMyBets(INITIAL_MY_BETS);
    setIsSimulatingFailure(false);
    setIsSimulatingNoLive(false);
    addToast('info', 'Prototype Reset', 'Demo data, balance (1,250 USDT), and markets restored to clean state.');
  };

  return (
    <SportsbookContext.Provider
      value={{
        matches,
        userBalance,
        betSlip,
        myBets,
        activePage,
        selectedMatchId,
        selectedSportFilter,
        searchQuery,
        followedTeams,
        followedCompetitions,
        isBetSlipOpenOnMobile,
        oddsFlashMap,
        isSimulatingFailure,
        isSimulatingNoLive,
        viewMode,
        lastPlacedBetId,
        toasts,
        setActivePage,
        navigateToMatch,
        setSelectedSportFilter,
        setSearchQuery,
        setIsBetSlipOpenOnMobile,
        setViewMode,
        dismissToast,
        setLastPlacedBetId,
        toggleOddsSelection,
        updateItemStake,
        removeFromSlip,
        clearSlip,
        acceptOddsChange,
        placeSingleBet,
        placeAllSingles,
        cashOutBet,
        toggleFollowTeam,
        toggleFollowCompetition,
        simulateOddsShift,
        simulateSuspensionToggle,
        simulateGoalScore,
        toggleSimulatedFailure,
        toggleSimulatedNoLive,
        depositFunds,
        resetDemoData,
      }}
    >
      {children}
    </SportsbookContext.Provider>
  );
};

export const useSportsbook = () => {
  const context = useContext(SportsbookContext);
  if (!context) {
    throw new Error('useSportsbook must be used within a SportsbookProvider');
  }
  return context;
};
