import type {
  BadgeKey,
  GameSessionState,
  LeaderboardEntry,
  LeaderboardPreview,
  SessionSummary,
} from '../types/game';

export const getCurrentRound = (state: GameSessionState) =>
  state.rounds[state.currentRoundIndex] ?? null;

export const getRoundProgressLabel = (currentRoundIndex: number, totalRounds: number) =>
  `${currentRoundIndex + 1}/${Math.max(totalRounds, 1)}`;

export const buildPlayerEntry = (
  score: number,
  badgeKey: BadgeKey,
  rank: number,
  streak = 0,
): LeaderboardEntry => ({
  id: 'you',
  name: 'you',
  score,
  badgeKey,
  rank,
  streak,
  isPlayer: true,
});

export const buildLeaderboardPreview = (
  entries: LeaderboardEntry[],
  summary: SessionSummary | null,
  bestScore: number,
  placement: number,
): LeaderboardPreview => {
  const activeScore = summary?.score ?? bestScore;
  const activeBadge = summary?.badgeKey ?? 'openingBell';
  const activeStreak = summary?.bestStreak ?? 0;

  return {
    entries: entries.slice(0, 5),
    playerEntry: buildPlayerEntry(activeScore, activeBadge, placement, activeStreak),
  };
};
