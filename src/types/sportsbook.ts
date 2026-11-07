export type SportId = 'football' | 'basketball' | 'tennis' | 'esports' | 'hockey' | 'cricket' | 'mma';

export type PageId = 'home' | 'live' | 'football' | 'match' | 'betslip';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  code: string;
  crestColor: string;
}

export interface MatchSelection {
  id: string;
  label: string;
  odds: number;
  previousOdds?: number;
  suspended?: boolean;
}

export type MarketGroup = 'popular' | 'goals' | 'halves' | 'handicaps' | 'goalscorers' | 'corners_cards';

export interface Market {
  id: string;
  name: string;
  group: MarketGroup;
  suspended?: boolean;
  selections: MatchSelection[];
}

export interface MatchEvent {
  type: 'goal' | 'yellow' | 'red' | 'corner';
  minute: number;
  team: 'home' | 'away';
  player: string;
  detail?: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  competition: string;
  competitionId: string;
  sportId: SportId;
  isLive: boolean;
  clock: string;
  period: string;
  score: {
    home: number;
    away: number;
  };
  startTime: string;
  venue?: string;
  matchResultOdds: {
    home: number;
    draw: number;
    away: number;
    homeSuspended?: boolean;
    drawSuspended?: boolean;
    awaySuspended?: boolean;
  };
  markets: Market[];
  events?: MatchEvent[];
}

export interface BetSlipItem {
  id: string;
  matchId: string;
  matchTitle: string;
  competition: string;
  marketName: string;
  selectionId: string;
  selectionLabel: string;
  odds: number;
  initialOdds: number;
  oddsChanged?: boolean;
  suspended?: boolean;
  stake: number;
}

export interface MyBet {
  id: string;
  placedAt: string;
  matchId: string;
  matchTitle: string;
  competition: string;
  marketName: string;
  selectionLabel: string;
  odds: number;
  stake: number;
  potentialReturn: number;
  status: 'open' | 'won' | 'lost' | 'cashed_out';
  cashOutValue?: number;
  liveScore?: string;
  settledReturn?: number;
}

export interface Competition {
  id: string;
  name: string;
  sportId: SportId;
  country: string;
  badge: string;
}
