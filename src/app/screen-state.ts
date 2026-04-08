import type { Screen } from '../types/game';

export const getInitialScreen = (hasCompletedWelcome: boolean): Screen =>
  hasCompletedWelcome ? 'menu' : 'welcome';
