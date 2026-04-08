import { useEffect, useState } from 'react';
import { REVEAL_MS } from '../game/config';
import type { FeedbackTone, GamePhase, GameRound } from '../types/game';
import { useGameApp } from '../app/GameProvider';

interface MarketChartProps {
  round: GameRound;
  phase: GamePhase;
  feedbackTone: FeedbackTone | null;
}

const CHART_WIDTH = 100;
const CHART_HEIGHT = 48;

const getPolylinePoints = (
  points: number[],
  width: number,
  height: number,
  minValue: number,
  maxValue: number,
  startIndex = 0,
  totalPoints = points.length,
) => {
  const range = Math.max(1, maxValue - minValue);

  return points
    .map((point, index) => {
      const x = ((startIndex + index) / Math.max(totalPoints - 1, 1)) * width;
      const y = height - ((point - minValue) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');
};

const getContinuationColor = (tone: FeedbackTone | null, direction: GameRound['correctDirection']) => {
  if (tone === 'perfect') {
    return 'var(--tone-gold)';
  }

  return direction === 'buy' ? 'var(--tone-green)' : 'var(--tone-red)';
};

export const MarketChart = ({ round, phase, feedbackTone }: MarketChartProps) => {
  const { t } = useGameApp();
  const [revealProgress, setRevealProgress] = useState(phase === 'reveal' ? 1 : 0);
  const allPoints = [...round.prePoints, ...round.postPoints];
  const minValue = Math.min(...allPoints);
  const maxValue = Math.max(...allPoints);
  const visiblePostPoints =
    phase === 'decision'
      ? []
      : round.postPoints.slice(0, Math.max(1, Math.ceil(round.postPoints.length * revealProgress)));

  useEffect(() => {
    if (phase === 'decision') {
      setRevealProgress(0);
      return undefined;
    }

    if (phase !== 'reveal') {
      setRevealProgress(1);
      return undefined;
    }

    const startedAt = performance.now();
    let frameId = 0;

    const update = () => {
      const elapsed = performance.now() - startedAt;
      const progress = Math.min(1, elapsed / REVEAL_MS);
      setRevealProgress(progress);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    frameId = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [phase, round.id]);

  const neutralLine = getPolylinePoints(
    round.prePoints,
    CHART_WIDTH,
    CHART_HEIGHT,
    minValue,
    maxValue,
    0,
    allPoints.length,
  );
  const continuationPoints = [round.prePoints[round.prePoints.length - 1], ...visiblePostPoints];
  const continuationLine =
    continuationPoints.length > 1
      ? getPolylinePoints(
          continuationPoints,
          CHART_WIDTH,
          CHART_HEIGHT,
          minValue,
          maxValue,
          round.prePoints.length - 1,
          allPoints.length,
        )
      : '';
  const decisionPoint = round.prePoints[round.prePoints.length - 1];
  const decisionX =
    ((round.prePoints.length - 1) / Math.max(allPoints.length - 1, 1)) * CHART_WIDTH;
  const decisionY =
    CHART_HEIGHT - ((decisionPoint - minValue) / Math.max(1, maxValue - minValue)) * CHART_HEIGHT;
  const dividerX = `${decisionX}`;

  return (
    <section className="chart-card">
      <div className="chart-card__header">
        <div>
          <p className="eyebrow">{t('game.liveSnippet')}</p>
          <h2>{round.ticker}</h2>
        </div>
        <span className={`volatility-pill volatility-pill--${round.volatility}`}>
          {t(`volatility.${round.volatility}`)}
        </span>
      </div>

      <div className="chart-card__plot">
        <svg viewBox="0 0 100 48" className="chart-card__svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`chartArea-${round.id}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(96, 226, 255, 0.22)" />
              <stop offset="100%" stopColor="rgba(96, 226, 255, 0)" />
            </linearGradient>
            <linearGradient id={`decisionMask-${round.id}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.02)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.09)" />
            </linearGradient>
          </defs>

          {phase === 'decision' ? (
            <rect
              className="chart-card__future-mask"
              x={decisionX}
              y="0"
              width={CHART_WIDTH - decisionX}
              height={CHART_HEIGHT}
              fill={`url(#decisionMask-${round.id})`}
            />
          ) : null}

          <path d="M0 12 H100" className="chart-card__grid-line" />
          <path d="M0 24 H100" className="chart-card__grid-line" />
          <path d="M0 36 H100" className="chart-card__grid-line" />
          <path d={`M${dividerX} 0 V48`} className="chart-card__divider" />
          <polyline className="chart-card__line chart-card__line--base" points={neutralLine} />

          {continuationLine ? (
            <polyline
              className="chart-card__line chart-card__line--continuation"
              points={continuationLine}
              style={{
                stroke: getContinuationColor(feedbackTone, round.correctDirection),
              }}
            />
          ) : null}

          <circle
            className="chart-card__decision-dot"
            cx={decisionX}
            cy={decisionY}
            r="1.5"
          />
        </svg>
      </div>

      <div className="chart-card__footer">
        <span>{t('game.chartHint')}</span>
      </div>
    </section>
  );
};
