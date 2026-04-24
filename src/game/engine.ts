import {
  CORRECT_POINTS,
  PERFECT_MOVE_THRESHOLD,
  PERFECT_POINTS,
  STREAK_MULTIPLIERS,
} from './config';
import type {
  BadgeKey,
  FeedbackTone,
  GameRound,
  PlayerAction,
  RoundResolution,
  RoundOutcome,
  SessionSummary,
} from '../types/game';

export const getRoundDeltaPercent = (round: GameRound) => {
  const decisionPoint = round.prePoints[round.prePoints.length - 1];
  const finalPoint = round.postPoints[round.postPoints.length - 1];

  if (!decisionPoint) {
    return 0;
  }

  return (finalPoint - decisionPoint) / decisionPoint;
};

export const getStreakMultiplier = (streak: number) => {
  const match = STREAK_MULTIPLIERS.find((entry) => streak >= entry.minStreak);
  return match?.multiplier ?? 1;
};

export const isPerfectMove = (round: GameRound) =>
  Math.abs(getRoundDeltaPercent(round)) >= PERFECT_MOVE_THRESHOLD;

const getRoundOutcome = (
  round: GameRound,
  action: PlayerAction | null,
): RoundOutcome => {
  if (!action) {
    return 'timeout';
  }

  if (action !== round.correctDirection) {
    return 'wrong';
  }

  return isPerfectMove(round) ? 'perfect' : 'correct';
};

const getFeedbackTone = (
  outcome: RoundOutcome,
  round: GameRound,
): FeedbackTone => {
  if (outcome === 'timeout') {
    return 'timeout';
  }

  if (outcome === 'perfect') {
    return 'perfect';
  }

  if (outcome === 'correct') {
    if (round.feedbackToneHint === 'too_early') {
      return 'too_early';
    }

    return 'nice_call';
  }

  if (round.feedbackToneHint === 'too_late') {
    return 'too_late';
  }

  return 'wrong_side';
};

const getExplanation = (round: GameRound, tone: FeedbackTone) => {
  if (round.labelKey) {
    return round.labelKey;
  }

  const fallbackCopy: Record<FeedbackTone, string> = {
    perfect: 'fallback.perfect',
    nice_call: 'fallback.niceCall',
    too_early: 'fallback.tooEarly',
    too_late: 'fallback.tooLate',
    wrong_side: 'fallback.wrongSide',
    timeout: 'fallback.timeout',
  };

  return fallbackCopy[tone];
};

export const createRoundResolution = (
  round: GameRound,
  action: PlayerAction | null,
  currentStreak: number,
): RoundResolution => {
  const outcome = getRoundOutcome(round, action);
  const nextStreak = outcome === 'perfect' || outcome === 'correct' ? currentStreak + 1 : 0;
  const basePoints =
    outcome === 'perfect' ? PERFECT_POINTS : outcome === 'correct' ? CORRECT_POINTS : 0;
  const multiplier = basePoints > 0 ? getStreakMultiplier(nextStreak) : 1;
  const points = Math.round(basePoints * multiplier);
  const tone = getFeedbackTone(outcome, round);

  return {
    outcome,
    tone,
    points,
    multiplier,
    isCorrect: outcome === 'perfect' || outcome === 'correct',
    explanationKey: getExplanation(round, tone),
    patternKey: round.patternKey,
    direction: round.correctDirection,
    action,
    deltaPercent: getRoundDeltaPercent(round),
  };
};

export const getSessionBadge = (correctAnswers: number, bestStreak: number): BadgeKey => {
  if (correctAnswers >= 9 || bestStreak >= 5) {
    return 'signalSniper';
  }

  if (correctAnswers >= 7) {
    return 'trendHunter';
  }

  if (correctAnswers >= 5) {
    return 'tapeReader';
  }

  return 'openingBell';
};

export const buildSessionSummary = (params: {
  score: number;
  correctAnswers: number;
  bestStreak: number;
  totalRounds: number;
}): SessionSummary => {
  const badge = getSessionBadge(params.correctAnswers, params.bestStreak);

  return {
    score: params.score,
    correctAnswers: params.correctAnswers,
    bestStreak: params.bestStreak,
    badgeKey: badge,
    totalRounds: params.totalRounds,
    accuracy:
      params.totalRounds === 0
        ? 0
        : Math.round((params.correctAnswers / params.totalRounds) * 100),
  };
};
