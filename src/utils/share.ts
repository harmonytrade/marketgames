import type { SessionSummary } from '../types/game';
import type { ShareMethod, TelegramBridge } from '../types/telegram';
import type { Translator } from '../i18n';

export const buildShareText = (
  summary: SessionSummary,
  t: Translator,
) => {
  if (summary.bestStreak >= 5) {
    return t('share.streak', {
      bestStreak: summary.bestStreak,
    });
  }

  return t('share.score', {
    score: summary.score,
  });
};

export const shareSessionResult = async (
  summary: SessionSummary,
  telegramBridge: TelegramBridge,
  t: Translator,
) => {
  const text = buildShareText(summary, t);
  const method: ShareMethod = await telegramBridge.shareText(text);

  return {
    text,
    method,
  };
};
