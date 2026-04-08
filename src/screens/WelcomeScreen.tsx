import { AnimatedBackground } from '../components/AnimatedBackground';
import { useGameApp } from '../app/GameProvider';

export const WelcomeScreen = () => {
  const { isLoadingSession, showOnboardingFromWelcome, startFromWelcome, t } = useGameApp();

  return (
    <section className="screen screen--hero">
      <AnimatedBackground variant="hero" />

      <div className="hero-panel">
        <p className="eyebrow">{t('common.miniApp')}</p>
        <div className="hero-panel__title-lockup">
          <h1>
            <span>BUY</span>
            <span>/ SELL</span>
          </h1>
          <div className="hero-panel__signal-pill">{t('welcome.pill')}</div>
        </div>
        <p className="hero-panel__lead">{t('welcome.hook')}</p>

        <div className="hero-panel__chart-preview">
          <div className="hero-panel__chart-topline">
            <span>BTCUSD</span>
            <span>{t('welcome.preview')}</span>
          </div>
          <div className="hero-panel__chart-line">
            <span className="hero-panel__chart-line-base" />
            <span className="hero-panel__chart-line-reveal" />
          </div>
          <div className="hero-panel__chart-caption">
            <strong>{t('welcome.chooseIn')}</strong>
            <span>{t('welcome.hiddenMove')}</span>
          </div>
        </div>

        <div className="hero-panel__metrics">
          <div>
            <strong>10</strong>
            <span>{t('welcome.rounds')}</span>
          </div>
          <div>
            <strong>2.5s</strong>
            <span>{t('welcome.decide')}</span>
          </div>
          <div>
            <strong>1</strong>
            <span>{t('welcome.shareable')}</span>
          </div>
        </div>

        <div className="hero-panel__actions">
          <button
            className="button button--primary"
            disabled={isLoadingSession}
            onClick={() => {
              void startFromWelcome();
            }}
            type="button"
          >
            {isLoadingSession ? t('common.loading') : t('welcome.start')}
          </button>
          <button
            className="button button--ghost"
            onClick={showOnboardingFromWelcome}
            type="button"
          >
            {t('welcome.howItWorks')}
          </button>
        </div>
      </div>
    </section>
  );
};
