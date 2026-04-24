import type { PlayerStats } from '../types/game';
import { useGameApp } from '../app/GameProvider';

interface MiniLeaderboardPreviewProps {
  stats: PlayerStats;
  onOpen: () => void;
}

export const MiniLeaderboardPreview = ({
  stats,
  onOpen,
}: MiniLeaderboardPreviewProps) => {
  const { t } = useGameApp();
  const hasSessions = stats.sessionsPlayed > 0;

  return (
    <section className="panel-card">
      <div className="panel-card__header">
        <div>
          <p className="eyebrow">{t('leaderboard.previewBadge')}</p>
          <h3>{t('leaderboard.previewTitle')}</h3>
        </div>
        <button className="button button--ghost button--tiny" onClick={onOpen} type="button">
          {t('common.open')}
        </button>
      </div>

      {hasSessions ? (
        <div className="stats-preview-grid">
          <div>
            <span>{t('leaderboard.sessionsPlayed')}</span>
            <strong>{stats.sessionsPlayed}</strong>
          </div>
          <div>
            <span>{t('leaderboard.bestScore')}</span>
            <strong>{stats.bestScore}</strong>
          </div>
          <div>
            <span>{t('leaderboard.accuracy')}</span>
            <strong>{stats.accuracy}%</strong>
          </div>
        </div>
      ) : (
        <p className="panel-card__placeholder">{t('leaderboard.empty')}</p>
      )}
    </section>
  );
};
