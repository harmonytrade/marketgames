import { APP_TITLE, SHARE_LINKS } from '../game/config';
import type {
  ShareMethod,
  TelegramBridge,
  TelegramWebApp,
} from '../types/telegram';

const APP_CHROME_COLOR = '#040913';

const getTelegramWebApp = (): TelegramWebApp | undefined => window.Telegram?.WebApp;

const setRootVar = (name: string, value: string) => {
  document.documentElement.style.setProperty(name, value);
};

const syncViewportState = (webApp?: TelegramWebApp) => {
  const safeArea = webApp?.contentSafeAreaInset ?? webApp?.safeAreaInset;
  const viewportHeight =
    webApp?.viewportHeight && webApp.viewportHeight > 0
      ? webApp.viewportHeight
      : window.innerHeight;

  setRootVar('--app-viewport-height', `${viewportHeight}px`);
  setRootVar('--app-safe-top', `${safeArea?.top ?? 0}px`);
  setRootVar('--app-safe-bottom', `${safeArea?.bottom ?? 0}px`);
  setRootVar('--app-safe-left', `${safeArea?.left ?? 0}px`);
  setRootVar('--app-safe-right', `${safeArea?.right ?? 0}px`);
};

const buildShareUrl = (text: string) => {
  if (!SHARE_LINKS.directMiniApp) {
    return '';
  }

  return `https://t.me/share/url?url=${encodeURIComponent(SHARE_LINKS.directMiniApp)}&text=${encodeURIComponent(text)}`;
};

const normalizeUrl = (url: string) => url.replace(/^http:\/\//, 'https://');

const openInBrowser = (url: string) =>
  Boolean(window.open(normalizeUrl(url), '_blank', 'noopener,noreferrer'));

export const createTelegramBridge = (): TelegramBridge => {
  const webApp = getTelegramWebApp();

  return {
    isAvailable: Boolean(webApp),
    getDisplayName() {
      const user = webApp?.initDataUnsafe?.user;
      return user?.first_name || user?.username || 'you';
    },
    getLanguageCode() {
      return webApp?.initDataUnsafe?.user?.language_code;
    },
    initialize(params) {
      const backButton = webApp?.BackButton;
      const handleBack = () => {
        params?.onBack?.();
      };

      this.ready();
      syncViewportState(webApp);

      const sync = () => {
        syncViewportState(webApp);
      };

      webApp?.onEvent?.('viewportChanged', sync);
      webApp?.onEvent?.('safeAreaChanged', sync);
      webApp?.onEvent?.('contentSafeAreaChanged', sync);
      webApp?.onEvent?.('themeChanged', sync);
      window.addEventListener('resize', sync);
      window.addEventListener('orientationchange', sync);

      if (params?.onBack && backButton) {
        backButton.show?.();
        backButton.onClick?.(handleBack);
      } else {
        backButton?.hide?.();
      }

      return () => {
        webApp?.offEvent?.('viewportChanged', sync);
        webApp?.offEvent?.('safeAreaChanged', sync);
        webApp?.offEvent?.('contentSafeAreaChanged', sync);
        webApp?.offEvent?.('themeChanged', sync);
        window.removeEventListener('resize', sync);
        window.removeEventListener('orientationchange', sync);
        backButton?.offClick?.(handleBack);
        backButton?.hide?.();
      };
    },
    ready() {
      webApp?.ready?.();
      webApp?.setHeaderColor?.(APP_CHROME_COLOR);
      webApp?.setBackgroundColor?.(APP_CHROME_COLOR);
    },
    expand() {
      webApp?.expand?.();
    },
    impact(style = 'medium') {
      webApp?.HapticFeedback?.impactOccurred?.(style);
    },
    async shareText(text) {
      const telegramShareUrl = buildShareUrl(text);

      if (webApp?.openTelegramLink && telegramShareUrl) {
        webApp.openTelegramLink(telegramShareUrl);
        return 'telegram';
      }

      if (navigator.share) {
        await navigator.share({
          title: APP_TITLE,
          text,
          url: SHARE_LINKS.directMiniApp || undefined,
        });
        return 'native';
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return 'copied';
      }

      if (telegramShareUrl) {
        if (openInBrowser(telegramShareUrl)) {
          return 'browser';
        }
      }

      throw new Error('share-unavailable');
    },
    openLink(url) {
      if (!url) {
        return false;
      }

      const isTelegramLink =
        url.startsWith('https://t.me/') ||
        url.startsWith('http://t.me/') ||
        url.startsWith('tg://');
      const normalizedUrl = normalizeUrl(url);

      if (isTelegramLink && webApp?.openTelegramLink) {
        webApp.openTelegramLink(normalizedUrl);
        return true;
      }

      if (!isTelegramLink && webApp?.openLink) {
        webApp.openLink(normalizedUrl, { try_instant_view: false });
        return true;
      }

      return openInBrowser(normalizedUrl);
    },
  };
};
