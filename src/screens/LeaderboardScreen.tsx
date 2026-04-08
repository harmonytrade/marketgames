import { AnimatedBackground } from '../components/AnimatedBackground';
import { useGameApp } from '../app/GameProvider';

export const LeaderboardScreen = () => {
  const { goToMenu, leaderboardPreview, t } = useGameApp();

  return (
    <section className="screen screen--menu">
      <AnimatedBackground variant="menu" />

      <div className="menu-stack">
        <div className="screen-header">
          <button className="button button--ghost button--tiny" onClick={goToMenu} type="button">
            {t('common.back')}
          </button>
          <div>
            <p className="eyebrow">{t('leaderboard.eyebrow')}</p>
            <h1>{t('leaderboard.title')}</h1>
          </div>
        </div>

        <section className="panel-card">
          <p className="eyebrow">{t('leaderboard.previewBadge')}</p>
          <div className="leaderboard-list">
            {leaderboardPreview?.entries.map((entry) => (
              <div className="leaderboard-row leaderboard-row--full" key={entry.id}>
                <span>#{entry.rank}</span>
                <div>
                  <strong>{entry.name}</strong>
                  <small>{t(`badges.${entry.badgeKey}`)}</small>
                </div>
                <strong>{entry.score}</strong>
              </div>
            ))}
          </div>
          <p className="panel-card__placeholder panel-card__placeholder--tight">
            {t('leaderboard.previewNote')}
          </p>
        </section>

        {leaderboardPreview ? (
          <section className="panel-card panel-card--player">
            <p className="eyebrow">{t('leaderboard.yourPosition')}</p>
            <div className="leaderboard-row leaderboard-row--full leaderboard-row--player">
              <span>#{leaderboardPreview.playerEntry.rank}</span>
              <div>
                <strong>
                  {leaderboardPreview.playerEntry.name === 'you'
                    ? t('common.you')
                    : leaderboardPreview.playerEntry.name}
                </strong>
                <small>{t(`badges.${leaderboardPreview.playerEntry.badgeKey}`)}</small>
              </div>
              <strong>{leaderboardPreview.playerEntry.score}</strong>
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
};
