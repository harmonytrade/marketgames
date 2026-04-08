import type { LeaderboardEntry } from '../types/game';

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: 'nova', name: 'NovaTape', score: 192, badgeKey: 'signalSniper', rank: 1, streak: 8 },
  { id: 'mako', name: 'MakoBid', score: 178, badgeKey: 'signalSniper', rank: 2, streak: 6 },
  { id: 'selene', name: 'SeleneFX', score: 166, badgeKey: 'trendHunter', rank: 3, streak: 5 },
  { id: 'ridge', name: 'RidgeFlow', score: 154, badgeKey: 'trendHunter', rank: 4, streak: 4 },
  { id: 'flare', name: 'FlareTick', score: 148, badgeKey: 'trendHunter', rank: 5, streak: 4 },
  { id: 'onyx', name: 'OnyxTape', score: 136, badgeKey: 'tapeReader', rank: 6, streak: 3 },
  { id: 'quill', name: 'QuillBid', score: 126, badgeKey: 'tapeReader', rank: 7, streak: 3 },
  { id: 'drift', name: 'DriftAlpha', score: 112, badgeKey: 'openingBell', rank: 8, streak: 2 },
];
