import type { SessionSummary } from '../types/game';
import { useGameApp } from '../app/GameProvider';
import { buildShareText } from '../utils/share';

interface SessionSummaryCardProps {
  summary: SessionSummary;
}

export const SessionSummaryCard = ({ summary }: SessionSummaryCardProps) => {
  const { t } = useGameApp();
  const sharePunchline = buildShareText(summary, t);

  return (
    <section className="session-summary-card">
      <div className="session-summary-card__badge">{t(`badges.${summary.badgeKey}`)}</div>
      <p className="eyebrow">{t('results.cardEyebrow')}</p>
      <h2>{t(`badgeTitles.${summary.badgeKey}`)}</h2>
      <div className="session-summary-card__score-block">
        <span>{t('results.finalScore')}</span>
        <div className="session-summary-card__score">{summary.score}</div>
      </div>
      <div className="session-summary-card__share-line">
        <span>{t('results.shareLine')}</span>
        <p className="session-summary-card__punchline">{sharePunchline}</p>
      </div>

      <div className="session-summary-card__stats">
        <div>
          <span>{t('results.correct')}</span>
          <strong>
            {summary.correctAnswers}/{summary.totalRounds}
          </strong>
        </div>
        <div>
          <span>{t('results.bestStreak')}</span>
          <strong>{summary.bestStreak}</strong>
        </div>
        <div>
          <span>{t('results.accuracy')}</span>
          <strong>{summary.accuracy}%</strong>
        </div>
      </div>
    </section>
  );
};
