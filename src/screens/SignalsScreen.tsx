import { AnimatedBackground } from '../components/AnimatedBackground';
import { SignalCTAButtons } from '../components/SignalCTAButtons';
import { useGameApp } from '../app/GameProvider';

export const SignalsScreen = () => {
  const { goToMenu, openBot, openChannel, t } = useGameApp();

  return (
    <section className="screen screen--signals">
      <AnimatedBackground variant="signals" />

      <div className="menu-stack">
        <div className="screen-header">
          <button className="button button--ghost button--tiny" onClick={goToMenu} type="button">
            {t('common.back')}
          </button>
          <div>
            <p className="eyebrow">{t('signals.eyebrow')}</p>
            <h1>{t('signals.title')}</h1>
          </div>
        </div>

        <section className="panel-card panel-card--hero">
          <p className="panel-card__placeholder">{t('signals.body')}</p>
          <div className="signal-benefits">
            <div>
              <strong>{t('signals.channelTitle')}</strong>
              <span>{t('signals.channelBody')}</span>
            </div>
            <div>
              <strong>{t('signals.botTitle')}</strong>
              <span>{t('signals.botBody')}</span>
            </div>
          </div>
          <SignalCTAButtons onBot={openBot} onChannel={openChannel} />
        </section>
      </div>
    </section>
  );
};
