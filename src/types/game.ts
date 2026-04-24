export type Screen =
  | 'welcome'
  | 'onboarding'
  | 'menu'
  | 'game'
  | 'results'
  | 'leaderboard'
  | 'signals';

export type PlayerAction = 'buy' | 'sell';

export type RoundOutcome = 'perfect' | 'correct' | 'wrong' | 'timeout';

export type FeedbackTone =
  | 'perfect'
  | 'nice_call'
  | 'too_early'
  | 'too_late'
  | 'wrong_side'
  | 'timeout';

export type FeedbackToneHint = Exclude<FeedbackTone, 'perfect' | 'timeout'>;

export type GamePhase = 'idle' | 'decision' | 'reveal' | 'complete';

export type VolatilityTag = 'calm' | 'active' | 'wild';

export type TechnicalPatternKey =
  | 'resistanceBreakout'
  | 'supportBreakdown'
  | 'falseBreakout'
  | 'failedRetest'
  | 'trendContinuation'
  | 'rollover'
  | 'whipsaw'
  | 'reclaim'
  | 'grindTrend'
  | 'lateRamp';

export type BadgeKey =
  | 'signalSniper'
  | 'trendHunter'
  | 'tapeReader'
  | 'openingBell';

export interface GameRound {
  id: string;
  ticker: string;
  prePoints: number[];
  postPoints: number[];
  correctDirection: PlayerAction;
  volatility: VolatilityTag;
  patternKey: TechnicalPatternKey;
  labelKey?: string;
  feedbackToneHint?: FeedbackToneHint;
}

export interface RoundResolution {
  outcome: RoundOutcome;
  tone: FeedbackTone;
  points: number;
  multiplier: number;
  isCorrect: boolean;
  explanationKey: string;
  patternKey: TechnicalPatternKey;
  direction: PlayerAction;
  action: PlayerAction | null;
  deltaPercent: number;
}

export interface SessionSummary {
  score: number;
  correctAnswers: number;
  bestStreak: number;
  badgeKey: BadgeKey;
  totalRounds: number;
  accuracy: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  badgeKey: BadgeKey;
  rank: number;
  streak?: number;
  isPlayer?: boolean;
}

export interface LeaderboardPreview {
  entries: LeaderboardEntry[];
  playerEntry: LeaderboardEntry;
}

export interface RoundSource {
  getSessionRounds(count: number): Promise<GameRound[]>;
}

export interface LeaderboardService {
  getTopEntries(): Promise<LeaderboardEntry[]>;
  getPlacement(score: number): Promise<number>;
}

export interface GameSessionState {
  rounds: GameRound[];
  currentRoundIndex: number;
  phase: GamePhase;
  score: number;
  streak: number;
  bestStreak: number;
  correctAnswers: number;
  selectedAction: PlayerAction | null;
  timerMsLeft: number;
  roundResult: RoundResolution | null;
  feedbackTone: FeedbackTone | null;
  lastDelta: number;
  sessionBadge: BadgeKey | null;
  sessionResult: SessionSummary | null;
  hasStarted: boolean;
}
