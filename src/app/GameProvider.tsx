import {
  createContext,
  useMemo,
  startTransition,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import {
  APP_ENV,
  SESSION_ROUNDS,
  SIGNAL_LINKS,
  STORAGE_KEYS,
} from '../game/config';
import { createInitialPlayerStats, updatePlayerStats } from '../game/player-stats';
import { mockRoundSource } from '../game/services';
import { useGameSession } from '../hooks/useGameSession';
import { usePersistentState } from '../hooks/usePersistentState';
import type { PlayerStats, Screen, SessionSummary } from '../types/game';
import type { AppLocale, Translator } from '../i18n';
import { createTranslator, resolveLocale } from '../i18n';
import { shareSessionResult } from '../utils/share';
import { createTelegramBridge } from '../utils/telegram';
import { getInitialScreen } from './screen-state';

type ToastTone = 'success' | 'info' | 'error';

interface ToastState {
  id: number;
  message: string;
  tone: ToastTone;
}

interface GameContextValue {
  screen: Screen;
  locale: AppLocale;
  t: Translator;
  isFirstRun: boolean;
  isLoadingSession: boolean;
  isTelegram: boolean;
  bestScore: number;
  lastSessionSummary: SessionSummary | null;
  playerStats: PlayerStats;
  toast: ToastState | null;
  session: ReturnType<typeof useGameSession>;
  goToMenu: () => void;
  openLeaderboard: () => void;
  openSignals: () => void;
  openChannel: () => void;
  openBot: () => void;
  startGame: () => Promise<void>;
  startFromWelcome: () => Promise<void>;
  showOnboardingFromWelcome: () => void;
  finishOnboarding: () => Promise<void>;
  shareLatestResult: () => Promise<void>;
}

const GameContext = createContext<GameContextValue | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const telegramBridgeRef = useRef(createTelegramBridge());
  const handledRoundKeyRef = useRef<string | null>(null);
  const handledSessionKeyRef = useRef<string | null>(null);
  const telegramBridge = telegramBridgeRef.current;
  const session = useGameSession();
  const [locale] = usePersistentState<AppLocale>(
    STORAGE_KEYS.locale,
    resolveLocale(
      APP_ENV.defaultLocale,
      telegramBridge.getLanguageCode(),
      typeof navigator !== 'undefined' ? navigator.language : undefined,
    ),
  );
  const [hasCompletedWelcome, setHasCompletedWelcome] = usePersistentState(
    STORAGE_KEYS.hasCompletedWelcome,
    false,
  );
  const [bestScore, setBestScore] = usePersistentState(STORAGE_KEYS.bestScore, 0);
  const [lastSessionSummary, setLastSessionSummary] = usePersistentState<SessionSummary | null>(
    STORAGE_KEYS.lastSessionSummary,
    null,
  );
  const [playerStats, setPlayerStats] = usePersistentState<PlayerStats>(
    STORAGE_KEYS.playerStats,
    {
      ...createInitialPlayerStats(),
      bestScore,
    },
  );
  const [screen, setScreen] = useState<Screen>(() => getInitialScreen(hasCompletedWelcome));
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const t = useMemo(() => createTranslator(locale), [locale]);

  const showToast = (message: string, tone: ToastTone = 'info') => {
    setToast({
      id: Date.now(),
      message,
      tone,
    });
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t('common.appTitle');

    const descriptionTag = document.querySelector('meta[name="description"]');
    descriptionTag?.setAttribute('content', t('meta.description'));
  }, [locale, t]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setToast((current) => (current?.id === toast.id ? null : current));
    }, 2400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [toast]);

  useEffect(() => {
    const onBack =
      screen === 'leaderboard' || screen === 'signals' || screen === 'results' || screen === 'onboarding'
        ? () => {
            startTransition(() => {
              setScreen('menu');
            });
          }
        : undefined;

    const cleanup = telegramBridge.initialize({ onBack });
    telegramBridge.expand();

    return cleanup;
  }, [screen, telegramBridge]);

  useEffect(() => {
    if (!session.roundResult) {
      return;
    }

    const roundKey = `${session.currentRoundIndex}:${session.roundResult.outcome}`;

    if (handledRoundKeyRef.current === roundKey) {
      return;
    }

    handledRoundKeyRef.current = roundKey;
    telegramBridge.impact(session.roundResult.isCorrect ? 'medium' : 'light');
  }, [session.currentRoundIndex, session.roundResult, telegramBridge]);

  useEffect(() => {
    if (session.phase !== 'complete' || !session.sessionResult) {
      return;
    }

    const sessionResult = session.sessionResult;
    const summaryKey = `${sessionResult.score}:${sessionResult.correctAnswers}:${sessionResult.bestStreak}`;

    if (handledSessionKeyRef.current === summaryKey) {
      return;
    }

    handledSessionKeyRef.current = summaryKey;
    setLastSessionSummary(sessionResult);
    setPlayerStats((currentStats) => updatePlayerStats(currentStats, sessionResult));

    if (sessionResult.score > bestScore) {
      setBestScore(sessionResult.score);
    }

    startTransition(() => {
      setScreen('results');
    });

    telegramBridge.impact('heavy');
  }, [
    bestScore,
    session.phase,
    session.sessionResult,
    setBestScore,
    setLastSessionSummary,
    setPlayerStats,
    telegramBridge,
  ]);

  const startGame = async () => {
    setIsLoadingSession(true);

    try {
      handledRoundKeyRef.current = null;
      handledSessionKeyRef.current = null;
      const rounds = await mockRoundSource.getSessionRounds(SESSION_ROUNDS);
      session.startSession(rounds);
      startTransition(() => {
        setScreen('game');
      });
      telegramBridge.impact('rigid');
    } catch {
      showToast(t('fallback.launchFailed'), 'error');
    } finally {
      setIsLoadingSession(false);
    }
  };

  const markWelcomeSeen = () => {
    if (!hasCompletedWelcome) {
      setHasCompletedWelcome(true);
    }
  };

  const startFromWelcome = async () => {
    markWelcomeSeen();
    await startGame();
  };

  const showOnboardingFromWelcome = () => {
    markWelcomeSeen();
    startTransition(() => {
      setScreen('onboarding');
    });
  };

  const finishOnboarding = async () => {
    await startGame();
  };

  const shareLatestResult = async () => {
    const summary = lastSessionSummary ?? session.sessionResult;

    if (!summary) {
      return;
    }

    try {
      const result = await shareSessionResult(summary, telegramBridge, t);
      telegramBridge.impact('medium');

      if (result.method === 'copied') {
        showToast(t('share.copied'), 'success');
        return;
      }

      if (result.method === 'telegram' || result.method === 'native' || result.method === 'browser') {
        showToast(t('share.opened'), 'info');
      }
    } catch {
      showToast(t('share.unavailable'), 'error');
    }
  };

  const contextValue: GameContextValue = {
    screen,
    locale,
    t,
    isFirstRun: !hasCompletedWelcome,
    isLoadingSession,
    isTelegram: telegramBridge.isAvailable,
    bestScore,
    lastSessionSummary,
    playerStats,
    toast,
    session,
    goToMenu() {
      startTransition(() => {
        setScreen('menu');
      });
    },
    openLeaderboard() {
      startTransition(() => {
        setScreen('leaderboard');
      });
    },
    openSignals() {
      startTransition(() => {
        setScreen('signals');
      });
    },
    openChannel() {
      if (!SIGNAL_LINKS.channel) {
        showToast(t('fallback.missingLink'), 'error');
        return;
      }

      if (!telegramBridge.openLink(SIGNAL_LINKS.channel)) {
        showToast(t('fallback.openFailed'), 'error');
      }
    },
    openBot() {
      if (!SIGNAL_LINKS.bot) {
        showToast(t('fallback.missingLink'), 'error');
        return;
      }

      if (!telegramBridge.openLink(SIGNAL_LINKS.bot)) {
        showToast(t('fallback.openFailed'), 'error');
      }
    },
    startGame,
    startFromWelcome,
    showOnboardingFromWelcome,
    finishOnboarding,
    shareLatestResult,
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export const useGameApp = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGameApp must be used inside GameProvider');
  }

  return context;
};
