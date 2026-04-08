import type { LeaderboardPreview } from '../types/game';
import { useGameApp } from '../app/GameProvider';

interface MiniLeaderboardPreviewProps {
  leaderboard: LeaderboardPreview | null;
  onOpen: () => void;
}

export const MiniLeaderboardPreview = ({
  leaderboard,
  onOpen,
}: MiniLeaderboardPreviewProps) => {
  const { t } = useGameApp();

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

      <div className="leaderboard-preview">
        {leaderboard?.entries.slice(0, 3).map((entry) => (
          <div className="leaderboard-row" key={entry.id}>
            <span>#{entry.rank}</span>
            <strong>{entry.name === 'you' ? t('common.you') : entry.name}</strong>
            <span>{entry.score}</span>
          </div>
        ))}
      </div>

      {leaderboard ? (
        <div className="leaderboard-row leaderboard-row--player">
          <span>#{leaderboard.playerEntry.rank}</span>
          <strong>
            {leaderboard.playerEntry.name === 'you'
              ? t('common.you')
              : leaderboard.playerEntry.name}
          </strong>
          <span>{leaderboard.playerEntry.score}</span>
        </div>
      ) : (
        <p className="panel-card__placeholder">{t('leaderboard.empty')}</p>
      )}
    </section>
  );
};
