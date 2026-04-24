import { useMemo, useState } from 'react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { useGameApp } from '../app/GameProvider';

export const OnboardingScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { finishOnboarding, isLoadingSession, t } = useGameApp();
  const slides = useMemo(
    () => [
      {
        icon: '01',
        eyebrow: t('onboarding.slide1Eyebrow'),
        title: t('onboarding.slide1Title'),
        body: t('onboarding.slide1Body'),
      },
      {
        icon: '02',
        eyebrow: t('onboarding.slide2Eyebrow'),
        title: t('onboarding.slide2Title'),
        body: t('onboarding.slide2Body'),
      },
      {
        icon: '03',
        eyebrow: t('onboarding.slide3Eyebrow'),
        title: t('onboarding.slide3Title'),
        body: t('onboarding.slide3Body'),
      },
    ],
    [t],
  );
  const slide = slides[activeIndex];
  const isLastSlide = activeIndex === slides.length - 1;

  return (
    <section className="screen screen--onboarding">
      <AnimatedBackground variant="menu" />

      <div className="onboarding-card">
        <div className="onboarding-card__top">
          <p className="eyebrow">{slide.eyebrow}</p>
          <button
            className="button button--ghost button--tiny"
            disabled={isLoadingSession}
            onClick={() => {
              void finishOnboarding();
            }}
            type="button"
          >
            {t('common.skip')}
          </button>
        </div>

        <div className="onboarding-card__visual">
          <span>{slide.icon}</span>
        </div>

        <h2>{slide.title}</h2>
        <p>{slide.body}</p>

        <div className="onboarding-card__dots">
          {slides.map((item, index) => (
            <span
              className={index === activeIndex ? 'is-active' : undefined}
              key={item.title}
            />
          ))}
        </div>

        <button
          className="button button--primary"
          disabled={isLoadingSession}
          onClick={() => {
            if (isLastSlide) {
              void finishOnboarding();
              return;
            }

            setActiveIndex((current) => current + 1);
          }}
          type="button"
        >
          {isLoadingSession ? t('common.loading') : isLastSlide ? t('onboarding.start') : t('common.next')}
        </button>
      </div>
    </section>
  );
};
