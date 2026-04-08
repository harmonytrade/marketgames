export type HapticStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';
export type ShareMethod = 'telegram' | 'native' | 'copied' | 'browser';

export interface TelegramWebApp {
  ready?: () => void;
  expand?: () => void;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
  openLink?: (url: string, options?: { try_instant_view?: boolean }) => void;
  openTelegramLink?: (url: string) => void;
  onEvent?: (event: string, callback: () => void) => void;
  offEvent?: (event: string, callback: () => void) => void;
  viewportHeight?: number;
  safeAreaInset?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  contentSafeAreaInset?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  BackButton?: {
    show?: () => void;
    hide?: () => void;
    onClick?: (callback: () => void) => void;
    offClick?: (callback: () => void) => void;
  };
  HapticFeedback?: {
    impactOccurred?: (style: HapticStyle) => void;
  };
  initDataUnsafe?: {
    user?: {
      first_name?: string;
      username?: string;
      language_code?: string;
    };
  };
}

export interface TelegramBridge {
  isAvailable: boolean;
  getDisplayName: () => string;
  getLanguageCode: () => string | undefined;
  initialize: (params?: { onBack?: () => void }) => () => void;
  ready: () => void;
  expand: () => void;
  impact: (style?: HapticStyle) => void;
  shareText: (text: string) => Promise<ShareMethod>;
  openLink: (url: string) => boolean;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}
