import { AnimatedBackground } from '../components/AnimatedBackground';
import { SessionSummaryCard } from '../components/SessionSummaryCard';
import { SignalCTAButtons } from '../components/SignalCTAButtons';
import { useGameApp } from '../app/GameProvider';

export const SessionEndScreen = () => {
  const {
    lastSessionSummary,
    isLoadingSession,
    openBot,
    openChannel,
    openLeaderboard,
    openSignals,
    shareLatestResult,
    startGame,
    t,
  } = useGameApp();

  if (!lastSessionSummary) {
    return null;
  }

  return (
    <section className="screen screen--result">
      <AnimatedBackground variant="result" />

      <div className="result-stack">
        <div className="result-header">
          <p className="eyebrow">{t('results.eyebrow')}</p>
          <h1>{t('results.title')}</h1>
        </div>

        <SessionSummaryCard summary={lastSessionSummary} />

        <div className="result-actions">
          <button
            className="button button--primary"
            disabled={isLoadingSession}
            onClick={() => {
              void startGame();
            }}
            type="button"
          >
            {isLoadingSession ? t('common.loading') : t('results.playAgain')}
          </button>
          <button className="button button--secondary" onClick={() => void shareLatestResult()} type="button">
            {t('results.share')}
          </button>
          <button className="button button--ghost" onClick={openLeaderboard} type="button">
            {t('results.leaderboard')}
          </button>
          <button className="button button--ghost" onClick={openSignals} type="button">
            {t('results.signals')}
          </button>
        </div>

        <section className="panel-card">
          <div className="panel-card__header">
            <div>
              <p className="eyebrow">{t('results.keepGoing')}</p>
              <h3>{t('results.trackReal')}</h3>
            </div>
          </div>
          <SignalCTAButtons onBot={openBot} onChannel={openChannel} />
        </section>
      </div>
    </section>
  );
};
