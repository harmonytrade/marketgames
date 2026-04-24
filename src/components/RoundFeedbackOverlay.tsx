import { FeedbackBadge } from './FeedbackBadge';
import { PointsBurst } from './PointsBurst';
import type { FeedbackTone, RoundResolution } from '../types/game';
import { useGameApp } from '../app/GameProvider';

interface RoundFeedbackOverlayProps {
  tone: FeedbackTone | null;
  resolution: RoundResolution | null;
  lastDelta: number;
}

export const RoundFeedbackOverlay = ({
  tone,
  resolution,
  lastDelta,
}: RoundFeedbackOverlayProps) => {
  const { t } = useGameApp();

  if (!tone || !resolution) {
    return null;
  }

  const actionLabel = resolution.action
    ? t(`game.${resolution.action}`)
    : t('game.noTap');
  const directionLabel = t(`game.${resolution.direction}`);

  return (
    <div className="round-feedback">
      <div className="round-feedback__topline">
        <FeedbackBadge tone={tone} />
        <PointsBurst points={lastDelta} />
      </div>
      <p className="round-feedback__copy">{t(resolution.explanationKey)}</p>
      <div className="round-feedback__meta">
        <span>
          {t('game.picked')}: {actionLabel}
        </span>
        <span>
          {t('game.move')}: {directionLabel}
        </span>
        <span>
          {t('game.pattern')}: {t(`patterns.${resolution.patternKey}`)}
        </span>
      </div>
    </div>
  );
};
