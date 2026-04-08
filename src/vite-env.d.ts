/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL?: string;
  readonly VITE_TELEGRAM_BOT_USERNAME?: string;
  readonly VITE_TELEGRAM_APP_SHORT_NAME?: string;
  readonly VITE_TELEGRAM_CHANNEL_URL?: string;
  readonly VITE_TELEGRAM_BOT_URL?: string;
  readonly VITE_TELEGRAM_SHARE_URL?: string;
  readonly VITE_DEFAULT_LOCALE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
