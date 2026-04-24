import { useGameApp } from '../app/GameProvider';

interface CountdownRingProps {
  value: number;
  max: number;
}

export const CountdownRing = ({ value, max }: CountdownRingProps) => {
  const { t } = useGameApp();
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, value / max));
  const offset = circumference * (1 - progress);
  const tone = progress < 0.2 ? 'critical' : progress < 0.45 ? 'warning' : 'steady';

  return (
    <div className={`countdown-ring countdown-ring--${tone}`}>
      <svg viewBox="0 0 56 56" className="countdown-ring__svg">
        <circle className="countdown-ring__track" cx="28" cy="28" r={radius} />
        <circle
          className="countdown-ring__progress"
          cx="28"
          cy="28"
          r={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <div className="countdown-ring__label">
        <strong>{Math.max(0, value / 1000).toFixed(1)}</strong>
        <span>{t('common.secondsShort')}</span>
      </div>
    </div>
  );
};
