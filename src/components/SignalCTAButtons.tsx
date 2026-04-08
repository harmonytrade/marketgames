import { useGameApp } from '../app/GameProvider';

interface SignalCTAButtonsProps {
  onChannel: () => void;
  onBot: () => void;
}

export const SignalCTAButtons = ({
  onChannel,
  onBot,
}: SignalCTAButtonsProps) => {
  const { t } = useGameApp();

  return (
    <div className="signal-cta-buttons">
      <button className="button button--secondary" onClick={onChannel} type="button">
        {t('signals.openChannel')}
      </button>
      <button className="button button--secondary" onClick={onBot} type="button">
        {t('signals.openBot')}
      </button>
    </div>
  );
};
