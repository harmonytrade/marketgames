export const APP_TITLE = 'BUY / SELL';

const readEnvString = (value: string | undefined, fallback = '') =>
  value?.trim() ? value.trim() : fallback;

const buildMiniAppLink = (botUsername: string, appShortName: string) =>
  botUsername && appShortName ? `https://t.me/${botUsername}/${appShortName}` : '';

export const SESSION_ROUNDS = 10;
export const DECISION_MS = 2500;
export const REVEAL_MS = 2800;
export const CORRECT_POINTS = 10;
export const PERFECT_POINTS = 15;
export const PERFECT_MOVE_THRESHOLD = 0.05;
export const IS_LEADERBOARD_DEMO = true;

export const STREAK_MULTIPLIERS = [
  { minStreak: 5, multiplier: 2 },
  { minStreak: 3, multiplier: 1.5 },
  { minStreak: 2, multiplier: 1.2 },
] as const;

export const APP_ENV = {
  appUrl: readEnvString(import.meta.env.VITE_APP_URL),
  botUsername: readEnvString(import.meta.env.VITE_TELEGRAM_BOT_USERNAME),
  appShortName: readEnvString(import.meta.env.VITE_TELEGRAM_APP_SHORT_NAME),
  defaultLocale: readEnvString(import.meta.env.VITE_DEFAULT_LOCALE, 'ru'),
};

export const SIGNAL_LINKS = {
  channel: readEnvString(import.meta.env.VITE_TELEGRAM_CHANNEL_URL),
  bot: readEnvString(import.meta.env.VITE_TELEGRAM_BOT_URL),
};

export const SHARE_LINKS = {
  directMiniApp:
    readEnvString(import.meta.env.VITE_TELEGRAM_SHARE_URL) ||
    buildMiniAppLink(APP_ENV.botUsername, APP_ENV.appShortName) ||
    readEnvString(import.meta.env.VITE_APP_URL),
};

export const STORAGE_KEYS = {
  bestScore: 'buy-sell.best-score',
  hasCompletedWelcome: 'buy-sell.has-completed-welcome',
  lastSessionSummary: 'buy-sell.last-session-summary',
  locale: 'buy-sell.locale',
};
