import { DECISION_MS } from './config';
import type {
  GameRound,
  GameSessionState,
  PlayerAction,
  RoundResolution,
  SessionSummary,
} from '../types/game';

type SessionAction =
  | { type: 'start_session'; rounds: GameRound[] }
  | { type: 'tick'; remainingMs: number }
  | { type: 'resolve_round'; action: PlayerAction | null; resolution: RoundResolution }
  | { type: 'advance_round' }
  | { type: 'finish_session'; summary: SessionSummary }
  | { type: 'reset_session' };

export const initialSessionState: GameSessionState = {
  rounds: [],
  currentRoundIndex: 0,
  phase: 'idle',
  score: 0,
  streak: 0,
  bestStreak: 0,
  correctAnswers: 0,
  selectedAction: null,
  timerMsLeft: DECISION_MS,
  roundResult: null,
  feedbackTone: null,
  lastDelta: 0,
  sessionBadge: null,
  sessionResult: null,
  hasStarted: false,
};

export const sessionReducer = (
  state: GameSessionState,
  action: SessionAction,
): GameSessionState => {
  switch (action.type) {
    case 'start_session':
      return {
        ...initialSessionState,
        rounds: action.rounds,
        phase: 'decision',
        hasStarted: true,
      };

    case 'tick':
      if (state.phase !== 'decision') {
        return state;
      }

      return {
        ...state,
        timerMsLeft: action.remainingMs,
      };

    case 'resolve_round': {
      if (state.phase !== 'decision') {
        return state;
      }

      const nextScore = state.score + action.resolution.points;
      const nextStreak = action.resolution.isCorrect ? state.streak + 1 : 0;
      const nextBestStreak = Math.max(state.bestStreak, nextStreak);

      return {
        ...state,
        phase: 'reveal',
        score: nextScore,
        streak: nextStreak,
        bestStreak: nextBestStreak,
        correctAnswers: state.correctAnswers + (action.resolution.isCorrect ? 1 : 0),
        selectedAction: action.action,
        timerMsLeft: 0,
        roundResult: action.resolution,
        feedbackTone: action.resolution.tone,
        lastDelta: action.resolution.points,
      };
    }

    case 'advance_round':
      if (state.currentRoundIndex >= state.rounds.length - 1) {
        return state;
      }

      return {
        ...state,
        currentRoundIndex: state.currentRoundIndex + 1,
        phase: 'decision',
        selectedAction: null,
        timerMsLeft: DECISION_MS,
        roundResult: null,
        feedbackTone: null,
        lastDelta: 0,
      };

    case 'finish_session':
      return {
        ...state,
        phase: 'complete',
        timerMsLeft: 0,
        sessionBadge: action.summary.badgeKey,
        sessionResult: action.summary,
      };

    case 'reset_session':
      return initialSessionState;

    default:
      return state;
  }
};
