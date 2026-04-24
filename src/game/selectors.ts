import type { GameSessionState } from '../types/game';

export const getCurrentRound = (state: GameSessionState) =>
  state.rounds[state.currentRoundIndex] ?? null;

export const getRoundProgressLabel = (currentRoundIndex: number, totalRounds: number) =>
  `${currentRoundIndex + 1}/${Math.max(totalRounds, 1)}`;
