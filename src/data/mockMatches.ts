import { Match, Competition, MyBet } from '../types/sportsbook';

export const TOP_COMPETITIONS: Competition[] = [
  { id: 'premier-league', name: 'Premier League', sportId: 'football', country: 'England', badge: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'champions-league', name: 'UEFA Champions League', sportId: 'football', country: 'Europe', badge: '⭐' },
  { id: 'laliga', name: 'LaLiga', sportId: 'football', country: 'Spain', badge: '🇪🇸' },
  { id: 'serie-a', name: 'Serie A', sportId: 'football', country: 'Italy', badge: '🇮🇹' },
  { id: 'bundesliga', name: 'Bundesliga', sportId: 'football', country: 'Germany', badge: '🇩🇪' },
  { id: 'nba', name: 'NBA', sportId: 'basketball', country: 'USA', badge: '🏀' },
  { id: 'atp', name: 'ATP World Tour', sportId: 'tennis', country: 'International', badge: '🎾' },
];

export const INITIAL_MATCHES: Match[] = [
  // 1. Primary Highlight: Arsenal v Brighton (Live)
  {
    id: 'arsenal-brighton',
    homeTeam: { id: 'arsenal', name: 'Arsenal', shortName: 'ARS', code: 'ARS', crestColor: '#EF0107' },
    awayTeam: { id: 'brighton', name: 'Brighton & Hove Albion', shortName: 'BHA', code: 'BHA', crestColor: '#0057B8' },
    competition: 'Premier League',
    competitionId: 'premier-league',
    sportId: 'football',
    isLive: true,
    clock: "68'",
    period: '2nd Half',
    score: { home: 2, away: 1 },
    startTime: 'Today 15:00',
    venue: 'Emirates Stadium, London',
    matchResultOdds: {
      home: 1.42,
      draw: 4.50,
      away: 7.20,
    },
    events: [
      { type: 'goal', minute: 24, team: 'home', player: 'Bukayo Saka', detail: 'Assist: Martin Ødegaard' },
      { type: 'goal', minute: 52, team: 'away', player: 'João Pedro', detail: 'Penalty' },
      { type: 'goal', minute: 61, team: 'home', player: 'Kai Havertz', detail: 'Header' },
      { type: 'yellow', minute: 34, team: 'away', player: 'Carlos Baleba' },
      { type: 'yellow', minute: 66, team: 'home', player: 'Declan Rice' },
      { type: 'corner', minute: 67, team: 'home', player: 'Corner Kick' },
    ],
    markets: [
      // POPULAR GROUP
      {
        id: 'ab-1x2',
        name: 'Match Result (1X2)',
        group: 'popular',
        selections: [
          { id: 'ab-1x2-1', label: 'Arsenal', odds: 1.42 },
          { id: 'ab-1x2-x', label: 'Draw', odds: 4.50 },
          { id: 'ab-1x2-2', label: 'Brighton', odds: 7.20 },
        ],
      },
      {
        id: 'ab-btts',
        name: 'Both Teams to Score',
        group: 'popular',
        selections: [
          { id: 'ab-btts-yes', label: 'Yes', odds: 1.14 },
          { id: 'ab-btts-no', label: 'No', odds: 5.50 },
        ],
      },
      {
        id: 'ab-ou25',
        name: 'Total Goals Over/Under 3.5 (Current: 3)',
        group: 'popular',
        selections: [
          { id: 'ab-ou35-o', label: 'Over 3.5', odds: 1.85 },
          { id: 'ab-ou35-u', label: 'Under 3.5', odds: 1.95 },
        ],
      },
      {
        id: 'ab-double-chance',
        name: 'Double Chance',
        group: 'popular',
        selections: [
          { id: 'ab-dc-1x', label: 'Arsenal or Draw', odds: 1.09 },
          { id: 'ab-dc-12', label: 'Arsenal or Brighton', odds: 1.18 },
          { id: 'ab-dc-x2', label: 'Draw or Brighton', odds: 2.80 },
        ],
      },
      {
        id: 'ab-dnb',
        name: 'Draw No Bet',
        group: 'popular',
        selections: [
          { id: 'ab-dnb-1', label: 'Arsenal', odds: 1.12 },
          { id: 'ab-dnb-2', label: 'Brighton', odds: 5.25 },
        ],
      },

      // GOALS GROUP
      {
        id: 'ab-next-goal',
        name: 'Next Goal (4th Goal)',
        group: 'goals',
        selections: [
          { id: 'ab-ng-1', label: 'Arsenal (Goal 4)', odds: 2.10 },
          { id: 'ab-ng-none', label: 'No More Goals', odds: 2.30 },
          { id: 'ab-ng-2', label: 'Brighton (Goal 4)', odds: 4.75 },
        ],
      },
      {
        id: 'ab-exact-goals',
        name: 'Exact Total Goals',
        group: 'goals',
        selections: [
          { id: 'ab-eg-3', label: '3 Goals (Exact)', odds: 2.30 },
          { id: 'ab-eg-4', label: '4 Goals (Exact)', odds: 2.85 },
          { id: 'ab-eg-5', label: '5+ Goals', odds: 4.60 },
        ],
      },
      {
        id: 'ab-arsenal-goals',
        name: 'Arsenal Total Goals Over/Under 2.5',
        group: 'goals',
        selections: [
          { id: 'ab-ag-o', label: 'Arsenal Over 2.5', odds: 1.92 },
          { id: 'ab-ag-u', label: 'Arsenal Under 2.5', odds: 1.88 },
        ],
      },
      {
        id: 'ab-brighton-goals',
        name: 'Brighton Total Goals Over/Under 1.5',
        group: 'goals',
        selections: [
          { id: 'ab-bg-o', label: 'Brighton Over 1.5', odds: 3.10 },
          { id: 'ab-bg-u', label: 'Brighton Under 1.5', odds: 1.34 },
        ],
      },

      // HALVES GROUP
      {
        id: 'ab-2h-result',
        name: '2nd Half Result Only',
        group: 'halves',
        selections: [
          { id: 'ab-2h-1', label: 'Arsenal (2H)', odds: 1.65 },
          { id: 'ab-2h-x', label: 'Draw (2H)', odds: 2.90 },
          { id: 'ab-2h-2', label: 'Brighton (2H)', odds: 6.00 },
        ],
      },
      {
        id: 'ab-2h-btts',
        name: '2nd Half Both Teams to Score',
        group: 'halves',
        selections: [
          { id: 'ab-2hbtts-y', label: '2H Both Score - Yes', odds: 1.20 },
          { id: 'ab-2hbtts-n', label: '2H Both Score - No', odds: 4.20 },
        ],
      },
      {
        id: 'ab-highest-half',
        name: 'Highest Scoring Half',
        group: 'halves',
        selections: [
          { id: 'ab-hsh-1', label: '1st Half (1 Goal)', odds: 9.50 },
          { id: 'ab-hsh-x', label: 'Equal', odds: 4.00 },
          { id: 'ab-hsh-2', label: '2nd Half (2+ Goals)', odds: 1.15 },
        ],
      },

      // HANDICAPS GROUP
      {
        id: 'ab-asian-hcp',
        name: 'Asian Handicap (In-Play)',
        group: 'handicaps',
        selections: [
          { id: 'ab-ah-ars', label: 'Arsenal (-1.0)', odds: 1.95 },
          { id: 'ab-ah-bha', label: 'Brighton (+1.0)', odds: 1.88 },
        ],
      },
      {
        id: 'ab-euro-hcp',
        name: 'European Handicap (0:1)',
        group: 'handicaps',
        selections: [
          { id: 'ab-eh-1', label: 'Arsenal (-1)', odds: 2.25 },
          { id: 'ab-eh-x', label: 'Tie (Arsenal wins by 1)', odds: 2.80 },
          { id: 'ab-eh-2', label: 'Brighton (+1)', odds: 3.40 },
        ],
      },

      // GOALSCORERS GROUP
      {
        id: 'ab-anytime-scorer',
        name: 'Anytime Goalscorer (Next / In-Play)',
        group: 'goalscorers',
        selections: [
          { id: 'ab-gs-saka', label: 'Bukayo Saka', odds: 2.40 },
          { id: 'ab-gs-havertz', label: 'Kai Havertz', odds: 2.65 },
          { id: 'ab-gs-martinelli', label: 'Gabriel Martinelli', odds: 3.10 },
          { id: 'ab-gs-mitoma', label: 'Kaoru Mitoma', odds: 4.50 },
          { id: 'ab-gs-welbeck', label: 'Danny Welbeck', odds: 4.90 },
          { id: 'ab-gs-pedro', label: 'João Pedro', odds: 3.80 },
        ],
      },
      {
        id: 'ab-brace-scorer',
        name: 'Player to Score 2+ Goals',
        group: 'goalscorers',
        selections: [
          { id: 'ab-bs-saka', label: 'Bukayo Saka (Brace)', odds: 3.40 },
          { id: 'ab-bs-havertz', label: 'Kai Havertz (Brace)', odds: 4.00 },
          { id: 'ab-bs-pedro', label: 'João Pedro (Brace)', odds: 6.50 },
        ],
      },

      // CORNERS & CARDS GROUP
      {
        id: 'ab-total-corners',
        name: 'Total Corners Over/Under 9.5 (Current: 7)',
        group: 'corners_cards',
        selections: [
          { id: 'ab-tc-o', label: 'Over 9.5 Corners', odds: 1.80 },
          { id: 'ab-tc-u', label: 'Under 9.5 Corners', odds: 2.00 },
        ],
      },
      {
        id: 'ab-corner-match',
        name: 'Most Corners',
        group: 'corners_cards',
        selections: [
          { id: 'ab-mc-1', label: 'Arsenal', odds: 1.30 },
          { id: 'ab-mc-x', label: 'Tie', odds: 6.50 },
          { id: 'ab-mc-2', label: 'Brighton', odds: 4.20 },
        ],
      },
      {
        id: 'ab-total-cards',
        name: 'Total Cards Over/Under 3.5 (Current: 2)',
        group: 'corners_cards',
        selections: [
          { id: 'ab-tcards-o', label: 'Over 3.5 Cards', odds: 1.75 },
          { id: 'ab-tcards-u', label: 'Under 3.5 Cards', odds: 2.05 },
        ],
      },
    ],
  },

  // 2. Champions League Live: Real Madrid v Bayern Munich
  {
    id: 'real-bayern',
    homeTeam: { id: 'realmadrid', name: 'Real Madrid', shortName: 'RMA', code: 'RMA', crestColor: '#FEBE10' },
    awayTeam: { id: 'bayern', name: 'Bayern Munich', shortName: 'BAY', code: 'BAY', crestColor: '#DC052D' },
    competition: 'UEFA Champions League',
    competitionId: 'champions-league',
    sportId: 'football',
    isLive: true,
    clock: "54'",
    period: '2nd Half',
    score: { home: 1, away: 0 },
    startTime: 'Today 20:00',
    venue: 'Santiago Bernabéu, Madrid',
    matchResultOdds: {
      home: 1.55,
      draw: 3.80,
      away: 5.50,
    },
    events: [
      { type: 'goal', minute: 38, team: 'home', player: 'Vinicius Jr', detail: 'Assist: Bellingham' },
      { type: 'yellow', minute: 44, team: 'away', player: 'Joshua Kimmich' },
    ],
    markets: [
      {
        id: 'rb-1x2',
        name: 'Match Result (1X2)',
        group: 'popular',
        selections: [
          { id: 'rb-1x2-1', label: 'Real Madrid', odds: 1.55 },
          { id: 'rb-1x2-x', label: 'Draw', odds: 3.80 },
          { id: 'rb-1x2-2', label: 'Bayern Munich', odds: 5.50 },
        ],
      },
      {
        id: 'rb-ou25',
        name: 'Total Goals Over/Under 2.5',
        group: 'popular',
        selections: [
          { id: 'rb-ou-o', label: 'Over 2.5', odds: 1.72 },
          { id: 'rb-ou-u', label: 'Under 2.5', odds: 2.10 },
        ],
      },
    ],
  },

  // 3. Basketball Live: Boston Celtics v Golden State Warriors
  {
    id: 'celtics-warriors',
    homeTeam: { id: 'celtics', name: 'Boston Celtics', shortName: 'BOS', code: 'BOS', crestColor: '#007A33' },
    awayTeam: { id: 'warriors', name: 'Golden State Warriors', shortName: 'GSW', code: 'GSW', crestColor: '#1D428A' },
    competition: 'NBA',
    competitionId: 'nba',
    sportId: 'basketball',
    isLive: true,
    clock: '07:22',
    period: '3rd Quarter',
    score: { home: 82, away: 79 },
    startTime: 'Today 19:30',
    venue: 'TD Garden, Boston',
    matchResultOdds: {
      home: 1.62,
      draw: 14.00,
      away: 2.35,
    },
    markets: [
      {
        id: 'cw-moneyline',
        name: 'Moneyline (Incl. OT)',
        group: 'popular',
        selections: [
          { id: 'cw-ml-1', label: 'Celtics', odds: 1.62 },
          { id: 'cw-ml-2', label: 'Warriors', odds: 2.35 },
        ],
      },
    ],
  },

  // 4. Tennis Live: Carlos Alcaraz v Jannik Sinner
  {
    id: 'alcaraz-sinner',
    homeTeam: { id: 'alcaraz', name: 'Carlos Alcaraz', shortName: 'ALC', code: 'ESP', crestColor: '#EAA900' },
    awayTeam: { id: 'sinner', name: 'Jannik Sinner', shortName: 'SIN', code: 'ITA', crestColor: '#009246' },
    competition: 'ATP World Tour',
    competitionId: 'atp',
    sportId: 'tennis',
    isLive: true,
    clock: 'Set 2 (3-2)',
    period: 'Set 2',
    score: { home: 1, away: 0 },
    startTime: 'Today 16:30',
    venue: 'Court Philippe-Chatrier',
    matchResultOdds: {
      home: 1.70,
      draw: 22.00,
      away: 2.15,
    },
    markets: [
      {
        id: 'as-match-winner',
        name: 'Match Winner',
        group: 'popular',
        selections: [
          { id: 'as-mw-1', label: 'Carlos Alcaraz', odds: 1.70 },
          { id: 'as-mw-2', label: 'Jannik Sinner', odds: 2.15 },
        ],
      },
    ],
  },

  // 5. Esports Live: T1 v Gen.G
  {
    id: 't1-geng',
    homeTeam: { id: 't1', name: 'T1 Telecom', shortName: 'T1', code: 'T1', crestColor: '#E4002B' },
    awayTeam: { id: 'geng', name: 'Gen.G Esports', shortName: 'GEN', code: 'GEN', crestColor: '#AA8A00' },
    competition: 'LCK Champions',
    competitionId: 'lck',
    sportId: 'esports',
    isLive: true,
    clock: "24:18",
    period: 'Game 2',
    score: { home: 1, away: 0 },
    startTime: 'Today 14:00',
    venue: 'LoL Park, Seoul',
    matchResultOdds: {
      home: 1.88,
      draw: 18.00,
      away: 1.92,
    },
    markets: [
      {
        id: 'tg-match-winner',
        name: 'Match Winner',
        group: 'popular',
        selections: [
          { id: 'tg-mw-1', label: 'T1', odds: 1.88 },
          { id: 'tg-mw-2', label: 'Gen.G', odds: 1.92 },
        ],
      },
    ],
  },

  // 6. Football Starting Soon: Manchester City v Liverpool (Premier League)
  {
    id: 'mancity-liverpool',
    homeTeam: { id: 'mancity', name: 'Manchester City', shortName: 'MCI', code: 'MCI', crestColor: '#6CABDD' },
    awayTeam: { id: 'liverpool', name: 'Liverpool', shortName: 'LIV', code: 'LIV', crestColor: '#C8102E' },
    competition: 'Premier League',
    competitionId: 'premier-league',
    sportId: 'football',
    isLive: false,
    clock: 'Starts in 42m',
    period: 'Not Started',
    score: { home: 0, away: 0 },
    startTime: 'Today 18:30',
    venue: 'Etihad Stadium, Manchester',
    matchResultOdds: {
      home: 1.92,
      draw: 3.75,
      away: 3.60,
    },
    markets: [
      {
        id: 'ml-1x2',
        name: 'Match Result (1X2)',
        group: 'popular',
        selections: [
          { id: 'ml-1x2-1', label: 'Manchester City', odds: 1.92 },
          { id: 'ml-1x2-x', label: 'Draw', odds: 3.75 },
          { id: 'ml-1x2-2', label: 'Liverpool', odds: 3.60 },
        ],
      },
      {
        id: 'ml-btts',
        name: 'Both Teams to Score',
        group: 'popular',
        selections: [
          { id: 'ml-btts-y', label: 'Yes', odds: 1.55 },
          { id: 'ml-btts-n', label: 'No', odds: 2.35 },
        ],
      },
    ],
  },

  // 7. Football Starting Soon: Barcelona v Atletico Madrid (LaLiga)
  {
    id: 'barca-atletico',
    homeTeam: { id: 'barca', name: 'FC Barcelona', shortName: 'FCB', code: 'BAR', crestColor: '#004D98' },
    awayTeam: { id: 'atletico', name: 'Atletico Madrid', shortName: 'ATM', code: 'ATM', crestColor: '#CB3524' },
    competition: 'LaLiga',
    competitionId: 'laliga',
    sportId: 'football',
    isLive: false,
    clock: 'Starts in 2h 15m',
    period: 'Not Started',
    score: { home: 0, away: 0 },
    startTime: 'Today 20:45',
    venue: 'Montjuïc Stadium, Barcelona',
    matchResultOdds: {
      home: 1.82,
      draw: 3.60,
      away: 4.10,
    },
    markets: [
      {
        id: 'ba-1x2',
        name: 'Match Result (1X2)',
        group: 'popular',
        selections: [
          { id: 'ba-1x2-1', label: 'Barcelona', odds: 1.82 },
          { id: 'ba-1x2-x', label: 'Draw', odds: 3.60 },
          { id: 'ba-1x2-2', label: 'Atletico Madrid', odds: 4.10 },
        ],
      },
    ],
  },

  // 8. Football Starting Soon: Inter Milan v Juventus (Serie A)
  {
    id: 'inter-juventus',
    homeTeam: { id: 'inter', name: 'Inter Milan', shortName: 'INT', code: 'INT', crestColor: '#010E80' },
    awayTeam: { id: 'juventus', name: 'Juventus', shortName: 'JUV', code: 'JUV', crestColor: '#000000' },
    competition: 'Serie A',
    competitionId: 'serie-a',
    sportId: 'football',
    isLive: false,
    clock: 'Tomorrow 20:45',
    period: 'Not Started',
    score: { home: 0, away: 0 },
    startTime: 'Tomorrow 20:45',
    venue: 'San Siro, Milan',
    matchResultOdds: {
      home: 2.05,
      draw: 3.25,
      away: 3.75,
    },
    markets: [
      {
        id: 'ij-1x2',
        name: 'Match Result (1X2)',
        group: 'popular',
        selections: [
          { id: 'ij-1x2-1', label: 'Inter Milan', odds: 2.05 },
          { id: 'ij-1x2-x', label: 'Draw', odds: 3.25 },
          { id: 'ij-1x2-2', label: 'Juventus', odds: 3.75 },
        ],
      },
    ],
  },

  // 9. Football Starting Soon: Borussia Dortmund v Bayer Leverkusen (Bundesliga)
  {
    id: 'dortmund-leverkusen',
    homeTeam: { id: 'dortmund', name: 'Borussia Dortmund', shortName: 'BVB', code: 'BVB', crestColor: '#FDE100' },
    awayTeam: { id: 'leverkusen', name: 'Bayer Leverkusen', shortName: 'B04', code: 'LEV', crestColor: '#E32219' },
    competition: 'Bundesliga',
    competitionId: 'bundesliga',
    sportId: 'football',
    isLive: false,
    clock: 'Tomorrow 17:30',
    period: 'Not Started',
    score: { home: 0, away: 0 },
    startTime: 'Tomorrow 17:30',
    venue: 'Signal Iduna Park, Dortmund',
    matchResultOdds: {
      home: 2.45,
      draw: 3.80,
      away: 2.65,
    },
    markets: [
      {
        id: 'dl-1x2',
        name: 'Match Result (1X2)',
        group: 'popular',
        selections: [
          { id: 'dl-1x2-1', label: 'Borussia Dortmund', odds: 2.45 },
          { id: 'dl-1x2-x', label: 'Draw', odds: 3.80 },
          { id: 'dl-1x2-2', label: 'Bayer Leverkusen', odds: 2.65 },
        ],
      },
    ],
  },

  // 10. Football Starting Soon: Chelsea v Aston Villa (Premier League)
  {
    id: 'chelsea-astonvilla',
    homeTeam: { id: 'chelsea', name: 'Chelsea', shortName: 'CHE', code: 'CHE', crestColor: '#034694' },
    awayTeam: { id: 'astonvilla', name: 'Aston Villa', shortName: 'AVL', code: 'AVL', crestColor: '#95BFE5' },
    competition: 'Premier League',
    competitionId: 'premier-league',
    sportId: 'football',
    isLive: false,
    clock: 'Starts in 3h 30m',
    period: 'Not Started',
    score: { home: 0, away: 0 },
    startTime: 'Today 21:00',
    venue: 'Stamford Bridge, London',
    matchResultOdds: {
      home: 2.10,
      draw: 3.50,
      away: 3.30,
    },
    markets: [
      {
        id: 'ca-1x2',
        name: 'Match Result (1X2)',
        group: 'popular',
        selections: [
          { id: 'ca-1x2-1', label: 'Chelsea', odds: 2.10 },
          { id: 'ca-1x2-x', label: 'Draw', odds: 3.50 },
          { id: 'ca-1x2-2', label: 'Aston Villa', odds: 3.30 },
        ],
      },
    ],
  },
];

export const INITIAL_MY_BETS: MyBet[] = [
  {
    id: 'HB-772910',
    placedAt: 'Today 14:15',
    matchId: 'arsenal-brighton',
    matchTitle: 'Arsenal v Brighton & Hove Albion',
    competition: 'Premier League',
    marketName: 'Match Result',
    selectionLabel: 'Arsenal',
    odds: 1.85,
    stake: 50.00,
    potentialReturn: 92.50,
    status: 'open',
    cashOutValue: 78.40, // Arsenal leading 2-1 at 68'
    liveScore: '2 - 1 (68\')',
  },
  {
    id: 'HB-771893',
    placedAt: 'Today 13:40',
    matchId: 'real-bayern',
    matchTitle: 'Real Madrid v Bayern Munich',
    competition: 'UEFA Champions League',
    marketName: 'Match Result',
    selectionLabel: 'Real Madrid',
    odds: 2.20,
    stake: 30.00,
    potentialReturn: 66.00,
    status: 'open',
    cashOutValue: 46.20, // Real Madrid leading 1-0 at 54'
    liveScore: '1 - 0 (54\')',
  },
  {
    id: 'HB-769012',
    placedAt: 'Yesterday 19:45',
    matchId: 'psg-milan',
    matchTitle: 'Paris Saint-Germain v AC Milan',
    competition: 'UEFA Champions League',
    marketName: 'Both Teams to Score',
    selectionLabel: 'Yes',
    odds: 1.75,
    stake: 40.00,
    potentialReturn: 70.00,
    status: 'won',
    settledReturn: 70.00,
  },
  {
    id: 'HB-768441',
    placedAt: 'Yesterday 18:00',
    matchId: 'newcastle-tottenham',
    matchTitle: 'Newcastle United v Tottenham',
    competition: 'Premier League',
    marketName: 'Match Result',
    selectionLabel: 'Tottenham',
    odds: 3.10,
    stake: 25.00,
    potentialReturn: 77.50,
    status: 'lost',
  },
];
