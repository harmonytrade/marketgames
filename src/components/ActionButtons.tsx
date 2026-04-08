import type { PlayerAction } from '../types/game';
import { useGameApp } from '../app/GameProvider';

interface ActionButtonsProps {
  disabled: boolean;
  onSelect: (action: PlayerAction) => void;
}

export const ActionButtons = ({ disabled, onSelect }: ActionButtonsProps) => {
  const { t } = useGameApp();

  return (
    <div className="action-buttons">
      <button
        className="button button--buy"
        disabled={disabled}
        onClick={() => onSelect('buy')}
        type="button"
      >
        <span className="action-buttons__label">{t('game.buy')}</span>
        <small>{t('game.buyHint')}</small>
      </button>
      <button
        className="button button--sell"
        disabled={disabled}
        onClick={() => onSelect('sell')}
        type="button"
      >
        <span className="action-buttons__label">{t('game.sell')}</span>
        <small>{t('game.sellHint')}</small>
      </button>
    </div>
  );
};
