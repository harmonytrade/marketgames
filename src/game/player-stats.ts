import type { PlayerStats, SessionHistoryEntry, SessionSummary } from '../types/game';

const MAX_RECENT_SESSIONS = 6;

export const createInitialPlayerStats = (): PlayerStats => ({
  sessionsPlayed: 0,
  totalScore: 0,
  bestScore: 0,
  averageScore: 0,
  bestStreak: 0,
  totalCorrect: 0,
  totalRounds: 0,
  accuracy: 0,
  lastScore: 0,
  recentSessions: [],
});

export const updatePlayerStats = (
  currentStats: PlayerStats,
  summary: SessionSummary,
): PlayerStats => {
  const sessionsPlayed = currentStats.sessionsPlayed + 1;
  const totalScore = currentStats.totalScore + summary.score;
  const totalCorrect = currentStats.totalCorrect + summary.correctAnswers;
  const totalRounds = currentStats.totalRounds + summary.totalRounds;
  const recentEntry: SessionHistoryEntry = {
    ...summary,
    id: `${Date.now()}-${summary.score}-${summary.bestStreak}`,
    playedAt: new Date().toISOString(),
  };

  return {
    sessionsPlayed,
    totalScore,
    bestScore: Math.max(currentStats.bestScore, summary.score),
    averageScore: Math.round(totalScore / sessionsPlayed),
    bestStreak: Math.max(currentStats.bestStreak, summary.bestStreak),
    totalCorrect,
    totalRounds,
    accuracy: totalRounds === 0 ? 0 : Math.round((totalCorrect / totalRounds) * 100),
    lastScore: summary.score,
    recentSessions: [recentEntry, ...currentStats.recentSessions].slice(0, MAX_RECENT_SESSIONS),
  };
};
