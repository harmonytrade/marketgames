import type { FeedbackTone } from '../types/game';
import { useGameApp } from '../app/GameProvider';

const FEEDBACK_META: Record<
  FeedbackTone,
  { labelKey: string; accent: string; subcopyKey: string }
> = {
  perfect: {
    labelKey: 'feedback.perfect',
    accent: 'gold',
    subcopyKey: 'feedback.perfectSub',
  },
  nice_call: {
    labelKey: 'feedback.niceCall',
    accent: 'green',
    subcopyKey: 'feedback.niceCallSub',
  },
  too_early: {
    labelKey: 'feedback.tooEarly',
    accent: 'cyan',
    subcopyKey: 'feedback.tooEarlySub',
  },
  too_late: {
    labelKey: 'feedback.tooLate',
    accent: 'orange',
    subcopyKey: 'feedback.tooLateSub',
  },
  wrong_side: {
    labelKey: 'feedback.wrongSide',
    accent: 'red',
    subcopyKey: 'feedback.wrongSideSub',
  },
  timeout: {
    labelKey: 'feedback.timeout',
    accent: 'slate',
    subcopyKey: 'feedback.timeoutSub',
  },
};

interface FeedbackBadgeProps {
  tone: FeedbackTone;
}

export const FeedbackBadge = ({ tone }: FeedbackBadgeProps) => {
  const { t } = useGameApp();
  const meta = FEEDBACK_META[tone];

  return (
    <div className={`feedback-badge feedback-badge--${meta.accent}`}>
      <span>{t(meta.labelKey)}</span>
      <small>{t(meta.subcopyKey)}</small>
    </div>
  );
};
