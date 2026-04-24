import { MOCK_ROUNDS } from '../data/mockRounds';
import type { RoundSource } from '../types/game';

const shuffle = <T,>(items: T[]) => {
  const clone = [...items];

  for (let index = clone.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const current = clone[index];
    clone[index] = clone[randomIndex];
    clone[randomIndex] = current;
  }

  return clone;
};

export const mockRoundSource: RoundSource = {
  async getSessionRounds(count) {
    return shuffle(MOCK_ROUNDS).slice(0, count);
  },
};
