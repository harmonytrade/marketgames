import { AnimatedBackground } from '../components/AnimatedBackground';
import { useGameApp } from '../app/GameProvider';

export const LeaderboardScreen = () => {
  const { goToMenu, playerStats, shareLatestResult, t } = useGameApp();
  const hasSessions = playerStats.sessionsPlayed > 0;

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

        <section className="panel-card panel-card--player">
          <p className="eyebrow">{t('leaderboard.previewBadge')}</p>
          <div className="stats-dashboard">
            <div className="stats-dashboard__hero">
              <span>{t('leaderboard.bestScore')}</span>
              <strong>{playerStats.bestScore}</strong>
            </div>
            <div>
              <span>{t('leaderboard.sessionsPlayed')}</span>
              <strong>{playerStats.sessionsPlayed}</strong>
            </div>
            <div>
              <span>{t('leaderboard.averageScore')}</span>
              <strong>{playerStats.averageScore}</strong>
            </div>
            <div>
              <span>{t('leaderboard.accuracy')}</span>
              <strong>{playerStats.accuracy}%</strong>
            </div>
            <div>
              <span>{t('leaderboard.bestStreak')}</span>
              <strong>{playerStats.bestStreak}</strong>
            </div>
            <div>
              <span>{t('leaderboard.totalCorrect')}</span>
              <strong>
                {playerStats.totalCorrect}/{playerStats.totalRounds}
              </strong>
            </div>
          </div>
          <p className="panel-card__placeholder panel-card__placeholder--tight">
            {t('leaderboard.previewNote')}
          </p>
        </section>

        <section className="panel-card">
          <div className="panel-card__header">
            <div>
              <p className="eyebrow">{t('leaderboard.recentRuns')}</p>
              <h3>{t('leaderboard.compareFriends')}</h3>
            </div>
            <button
              className="button button--ghost button--tiny"
              disabled={!hasSessions}
              onClick={() => void shareLatestResult()}
              type="button"
            >
              {t('leaderboard.shareStats')}
            </button>
          </div>

          {hasSessions ? (
            <div className="leaderboard-list">
              {playerStats.recentSessions.map((entry) => (
                <div className="leaderboard-row leaderboard-row--full" key={entry.id}>
                  <span>{entry.score}</span>
                  <div>
                    <strong>{t(`badges.${entry.badgeKey}`)}</strong>
                    <small>
                      {entry.correctAnswers}/{entry.totalRounds} · {entry.accuracy}% · {entry.bestStreak}x
                    </small>
                  </div>
                  <strong>{new Date(entry.playedAt).toLocaleDateString()}</strong>
                </div>
              ))}
            </div>
          ) : (
            <p className="panel-card__placeholder">{t('leaderboard.empty')}</p>
          )}
        </section>
      </div>
    </section>
  );
};
