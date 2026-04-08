import { DECISION_MS } from '../game/config';
import { getRoundProgressLabel } from '../game/selectors';
import { useGameApp } from '../app/GameProvider';
import { CountdownRing } from './CountdownRing';

interface ScorePanelProps {
  roundIndex: number;
  totalRounds: number;
  timerMsLeft: number;
  ticker: string;
}

export const ScorePanel = ({
  roundIndex,
  totalRounds,
  timerMsLeft,
  ticker,
}: ScorePanelProps) => {
  const { t } = useGameApp();

  return (
    <section className="score-panel">
      <div className="score-panel__context">
        <div className="score-panel__round-pill">
          <span>{t('game.round')}</span>
          <strong>{getRoundProgressLabel(roundIndex, totalRounds)}</strong>
        </div>
        <div className="score-panel__ticker">
          <p className="eyebrow">{t('game.decisionWindow')}</p>
          <h2>{ticker}</h2>
          <small>{t('game.decisionHint')}</small>
        </div>
      </div>
      <CountdownRing value={timerMsLeft} max={DECISION_MS} />
    </section>
  );
};
