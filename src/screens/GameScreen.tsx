import { AnimatedBackground } from '../components/AnimatedBackground';
import { ActionButtons } from '../components/ActionButtons';
import { MarketChart } from '../components/MarketChart';
import { RoundTrack } from '../components/RoundTrack';
import { RoundFeedbackOverlay } from '../components/RoundFeedbackOverlay';
import { ScorePanel } from '../components/ScorePanel';
import { useGameApp } from '../app/GameProvider';
import { getStreakMultiplier } from '../game/engine';

export const GameScreen = () => {
  const { session, t } = useGameApp();
  const nextMultiplier = getStreakMultiplier(session.streak + 1);

  if (!session.currentRound) {
    return (
      <section className="screen screen--game">
        <AnimatedBackground variant="game" />
        <div className="loading-card">{t('common.loading')}</div>
      </section>
    );
  }

  return (
    <section className="screen screen--game">
      <AnimatedBackground variant="game" />

      <div className="game-stack">
        <ScorePanel
          roundIndex={session.currentRoundIndex}
          timerMsLeft={session.timerMsLeft}
          totalRounds={session.rounds.length}
          ticker={session.currentRound.ticker}
        />
        <RoundTrack
          currentRoundIndex={session.currentRoundIndex}
          totalRounds={session.rounds.length}
        />

        <div className="chart-stage">
          <aside className="game-side-rail">
            <div className="game-side-rail__card">
              <span>{t('game.score')}</span>
              <strong>{session.score}</strong>
            </div>
            <div className="game-side-rail__card">
              <span>{t('game.streak')}</span>
              <strong>{session.streak}</strong>
            </div>
            <div className="game-side-rail__card game-side-rail__card--multiplier">
              <span>{t('game.multiplier')}</span>
              <strong>x{nextMultiplier}</strong>
            </div>
          </aside>

          <MarketChart
            feedbackTone={session.feedbackTone}
            phase={session.phase}
            round={session.currentRound}
          />
          <RoundFeedbackOverlay
            lastDelta={session.lastDelta}
            resolution={session.roundResult}
            tone={session.feedbackTone}
          />
        </div>

        <div className="game-prompt">
          <span>{t('game.prompt')}</span>
        </div>

        <ActionButtons
          disabled={session.phase !== 'decision'}
          onSelect={(action) => {
            session.selectAction(action);
          }}
        />
      </div>
    </section>
  );
};
