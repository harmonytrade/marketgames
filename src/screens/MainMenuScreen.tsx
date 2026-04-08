import { AnimatedBackground } from '../components/AnimatedBackground';
import { MiniLeaderboardPreview } from '../components/MiniLeaderboardPreview';
import { SignalCTAButtons } from '../components/SignalCTAButtons';
import { useGameApp } from '../app/GameProvider';

export const MainMenuScreen = () => {
  const {
    bestScore,
    isLoadingSession,
    lastSessionSummary,
    leaderboardPreview,
    openBot,
    openChannel,
    openLeaderboard,
    openSignals,
    startGame,
    t,
  } = useGameApp();

  return (
    <section className="screen screen--menu">
      <AnimatedBackground variant="menu" />

      <div className="menu-stack">
        <section className="menu-hero panel-card panel-card--hero">
          <div className="menu-hero__topline">
            <p className="eyebrow">{t('menu.eyebrow')}</p>
            <span className="menu-hero__status">{t('menu.status')}</span>
          </div>
          <h1>{t('menu.title')}</h1>
          <div className="menu-hero__score-card">
            <p className="menu-hero__lead">
              {t('menu.bestScore')}
              <strong>{bestScore}</strong>
            </p>
            <div className="menu-hero__pulse" />
          </div>

          {lastSessionSummary ? (
            <div className="menu-hero__summary">
              <span>{t(`badges.${lastSessionSummary.badgeKey}`)}</span>
              <span>
                {lastSessionSummary.correctAnswers} {t('menu.correct')}
              </span>
              <span>
                {lastSessionSummary.bestStreak} {t('menu.streak')}
              </span>
            </div>
          ) : null}

          <button
            className="button button--primary"
            disabled={isLoadingSession}
            onClick={() => {
              void startGame();
            }}
            type="button"
          >
            {isLoadingSession ? t('common.loading') : t('menu.quickPlay')}
          </button>
        </section>

        <MiniLeaderboardPreview leaderboard={leaderboardPreview} onOpen={openLeaderboard} />

        <section className="panel-card">
          <div className="panel-card__header">
            <div>
              <p className="eyebrow">{t('menu.signals')}</p>
              <h3>{t('menu.signalsTitle')}</h3>
            </div>
            <button className="button button--ghost button--tiny" onClick={openSignals} type="button">
              {t('menu.more')}
            </button>
          </div>
          <p className="panel-card__placeholder">{t('menu.signalsBody')}</p>
          <SignalCTAButtons onBot={openBot} onChannel={openChannel} />
        </section>
      </div>
    </section>
  );
};
