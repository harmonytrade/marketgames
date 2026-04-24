import type {
  FeedbackToneHint,
  GameRound,
  TechnicalPatternKey,
  VolatilityTag,
} from '../types/game';

interface RoundSeed {
  id: string;
  ticker: string;
  series: number[];
  splitIndex: number;
  volatility: VolatilityTag;
  patternKey: TechnicalPatternKey;
  labelKey: string;
  feedbackToneHint?: FeedbackToneHint;
}

// Synthetic MVP snippets, mapped to common technical-analysis archetypes.
// This keeps the game deterministic while making feedback explainable.
const roundSeeds: RoundSeed[] = [
  {
    id: 'btc-breakout-squeeze',
    ticker: 'BTCUSD',
    series: [100, 101, 102.4, 101.8, 102.9, 103.7, 104.2, 103.9, 104.8, 106.1, 107.7, 110.4, 112.9, 115.5],
    splitIndex: 9,
    volatility: 'wild',
    patternKey: 'resistanceBreakout',
    labelKey: 'roundLabels.btcBreakoutSqueeze',
  },
  {
    id: 'eth-fake-dip',
    ticker: 'ETHUSD',
    series: [100, 99.8, 100.4, 101.2, 101.6, 101.1, 101.9, 102.3, 102.1, 101.3, 102.7, 103.8, 104.6, 105.1],
    splitIndex: 9,
    volatility: 'active',
    patternKey: 'falseBreakout',
    labelKey: 'roundLabels.ethFakeDip',
    feedbackToneHint: 'too_early',
  },
  {
    id: 'sol-failed-retest',
    ticker: 'SOLUSD',
    series: [100, 100.7, 101.5, 101.9, 101.2, 100.6, 99.8, 99.3, 99.7, 98.9, 97.8, 96.7, 95.9, 94.8],
    splitIndex: 9,
    volatility: 'active',
    patternKey: 'failedRetest',
    labelKey: 'roundLabels.solFailedRetest',
  },
  {
    id: 'nasdaq-late-reversal',
    ticker: 'NDX',
    series: [100, 100.5, 100.9, 101.3, 101.8, 101.1, 100.7, 100.3, 99.9, 100.4, 100.1, 99.2, 98.4, 97.3],
    splitIndex: 9,
    volatility: 'calm',
    patternKey: 'rollover',
    labelKey: 'roundLabels.nasdaqLateReversal',
    feedbackToneHint: 'too_late',
  },
  {
    id: 'gold-grind-up',
    ticker: 'XAUUSD',
    series: [100, 100.2, 100.4, 100.6, 100.9, 101.1, 101.3, 101.5, 101.7, 102.1, 102.6, 103.1, 103.6, 104.1],
    splitIndex: 9,
    volatility: 'calm',
    patternKey: 'grindTrend',
    labelKey: 'roundLabels.goldGrindUp',
    feedbackToneHint: 'nice_call',
  },
  {
    id: 'oil-air-pocket',
    ticker: 'BRENT',
    series: [100, 101.1, 101.7, 101.3, 100.8, 100.2, 99.9, 99.6, 99.4, 98.1, 96.5, 95.4, 94.6, 93.8],
    splitIndex: 9,
    volatility: 'wild',
    patternKey: 'supportBreakdown',
    labelKey: 'roundLabels.oilAirPocket',
  },
  {
    id: 'spx-trend-pause',
    ticker: 'SPX',
    series: [100, 100.4, 100.9, 101.5, 101.8, 102.2, 102.6, 102.1, 102.4, 102.8, 103.2, 103.7, 104.1, 104.4],
    splitIndex: 9,
    volatility: 'calm',
    patternKey: 'trendContinuation',
    labelKey: 'roundLabels.spxTrendPause',
    feedbackToneHint: 'nice_call',
  },
  {
    id: 'eurusd-rollover',
    ticker: 'EURUSD',
    series: [100, 100.6, 101.2, 101.5, 101.1, 100.7, 100.2, 99.8, 99.5, 99.1, 98.7, 98.2, 97.9, 97.5],
    splitIndex: 9,
    volatility: 'active',
    patternKey: 'rollover',
    labelKey: 'roundLabels.eurusdRollover',
    feedbackToneHint: 'wrong_side',
  },
  {
    id: 'nvidia-breakaway',
    ticker: 'NVDA',
    series: [100, 101.3, 102.1, 102.9, 102.6, 103.4, 104.1, 104.7, 105.2, 106.8, 108.5, 110.8, 113.6, 116.2],
    splitIndex: 9,
    volatility: 'wild',
    patternKey: 'resistanceBreakout',
    labelKey: 'roundLabels.nvidiaBreakaway',
  },
  {
    id: 'apple-slow-fade',
    ticker: 'AAPL',
    series: [100, 100.4, 100.8, 101.1, 101.5, 101.3, 101.1, 100.9, 100.7, 100.4, 100.1, 99.7, 99.3, 98.9],
    splitIndex: 9,
    volatility: 'calm',
    patternKey: 'rollover',
    labelKey: 'roundLabels.appleSlowFade',
    feedbackToneHint: 'wrong_side',
  },
  {
    id: 'tesla-whipsaw',
    ticker: 'TSLA',
    series: [100, 101.2, 102.4, 101.1, 100.6, 100.9, 101.5, 102.1, 102.6, 101.2, 100.4, 99.7, 98.8, 97.9],
    splitIndex: 9,
    volatility: 'wild',
    patternKey: 'whipsaw',
    labelKey: 'roundLabels.teslaWhipsaw',
    feedbackToneHint: 'too_late',
  },
  {
    id: 'dxy-slow-break',
    ticker: 'DXY',
    series: [100, 99.9, 100.1, 100.4, 100.8, 101.2, 101.4, 101.7, 102.1, 102.4, 102.8, 103.3, 103.7, 104.2],
    splitIndex: 9,
    volatility: 'active',
    patternKey: 'trendContinuation',
    labelKey: 'roundLabels.dxySlowBreak',
    feedbackToneHint: 'nice_call',
  },
  {
    id: 'silver-headfake',
    ticker: 'XAGUSD',
    series: [100, 100.8, 101.4, 101.8, 101.2, 100.9, 100.5, 100.2, 99.8, 99.1, 98.6, 98.2, 98.4, 98.7],
    splitIndex: 9,
    volatility: 'active',
    patternKey: 'falseBreakout',
    labelKey: 'roundLabels.silverHeadfake',
    feedbackToneHint: 'wrong_side',
  },
  {
    id: 'meta-late-ramp',
    ticker: 'META',
    series: [100, 100.3, 100.7, 101.1, 101.4, 101.7, 101.5, 101.9, 102.2, 101.8, 102.6, 103.4, 104.3, 105.7],
    splitIndex: 9,
    volatility: 'active',
    patternKey: 'lateRamp',
    labelKey: 'roundLabels.metaLateRamp',
    feedbackToneHint: 'too_early',
  },
  {
    id: 'usd-jpy-breakdown',
    ticker: 'USDJPY',
    series: [100, 100.2, 100.6, 100.9, 100.4, 99.8, 99.3, 98.7, 98.1, 97.6, 97.1, 96.8, 96.3, 95.7],
    splitIndex: 9,
    volatility: 'active',
    patternKey: 'supportBreakdown',
    labelKey: 'roundLabels.usdJpyBreakdown',
  },
  {
    id: 'bnb-sharp-reclaim',
    ticker: 'BNBUSD',
    series: [100, 99.6, 99.1, 98.8, 99.2, 99.9, 100.6, 101.1, 101.6, 102.3, 103.5, 104.9, 106.6, 108.4],
    splitIndex: 9,
    volatility: 'wild',
    patternKey: 'reclaim',
    labelKey: 'roundLabels.bnbSharpReclaim',
  },
];

const deriveDirection = (series: number[], splitIndex: number) => {
  const decisionPoint = series[splitIndex - 1];
  const finalPoint = series[series.length - 1];
  return finalPoint >= decisionPoint ? 'buy' : 'sell';
};

const createRound = (seed: RoundSeed): GameRound => ({
  id: seed.id,
  ticker: seed.ticker,
  prePoints: seed.series.slice(0, seed.splitIndex),
  postPoints: seed.series.slice(seed.splitIndex),
  correctDirection: deriveDirection(seed.series, seed.splitIndex),
  volatility: seed.volatility,
  patternKey: seed.patternKey,
  labelKey: seed.labelKey,
  feedbackToneHint: seed.feedbackToneHint,
});

export const MOCK_ROUNDS: GameRound[] = roundSeeds.map(createRound);
