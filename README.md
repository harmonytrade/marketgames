# BUY / SELL

BUY / SELL is a fast Telegram Mini App game where the player sees a short chart, taps `BUY` or `SELL` within a few seconds, then watches the move reveal and scores the call.

The current release is:
- mobile-first
- Russian-first with English fallback
- frontend-only
- ready for Telegram embedding
- still using a demo leaderboard until a backend is connected

## Stack

- React
- TypeScript
- Vite
- Local mock rounds
- Mock leaderboard service behind an interface

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Copy envs:

```bash
cp .env.example .env
```

3. Fill in real values for your domain, bot, channel, and Mini App links.

4. Start the dev server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

For a GitHub Pages-style build:

```bash
BASE_PATH=/marketgames/ npm run build
```

## Environment Variables

The app reads runtime-facing config from Vite env vars:

```bash
VITE_APP_URL=https://your-domain.example
VITE_TELEGRAM_BOT_USERNAME=your_bot_username
VITE_TELEGRAM_APP_SHORT_NAME=app
VITE_TELEGRAM_CHANNEL_URL=https://t.me/your_channel
VITE_TELEGRAM_BOT_URL=https://t.me/your_bot
VITE_TELEGRAM_SHARE_URL=https://t.me/your_bot_username?startapp=share
VITE_DEFAULT_LOCALE=ru
```

What each value is for:
- `VITE_APP_URL`: public HTTPS URL where the Mini App is hosted
- `VITE_TELEGRAM_BOT_USERNAME`: production bot username without `@`
- `VITE_TELEGRAM_APP_SHORT_NAME`: Mini App short name if you use direct Telegram app links
- `VITE_TELEGRAM_CHANNEL_URL`: Telegram channel deep link for the signals CTA
- `VITE_TELEGRAM_BOT_URL`: Telegram bot deep link for the signals CTA
- `VITE_TELEGRAM_SHARE_URL`: deep link used by the share fallback flow
- `VITE_DEFAULT_LOCALE`: default locale, currently `ru`

## Product Scope

Included in this release:
- first-run welcome screen
- 3-card onboarding
- returning-user main menu
- 10-round session gameplay loop
- score and streak logic
- animated round feedback
- premium result card with share flow
- demo leaderboard preview
- signals funnel screen for channel and bot
- Telegram bridge with browser-safe fallback outside Telegram
- Russian localization with English fallback

Not included yet:
- real leaderboard backend
- analytics
- Telegram auth / secure user identity
- live market data
- rendered image share cards

## Project Structure

```text
src/
  app/
  components/
  data/
  game/
  hooks/
  i18n/
  screens/
  styles/
  types/
  utils/
```

Important files:
- [src/game/config.ts](/Users/nikitapranchuk/Documents/tradergamesbot/src/game/config.ts): session rules, env reads, signal links, storage keys
- [src/utils/telegram.ts](/Users/nikitapranchuk/Documents/tradergamesbot/src/utils/telegram.ts): Telegram WebApp bridge and browser fallback behavior
- [src/utils/share.ts](/Users/nikitapranchuk/Documents/tradergamesbot/src/utils/share.ts): localized share text and share handoff
- [src/i18n/index.ts](/Users/nikitapranchuk/Documents/tradergamesbot/src/i18n/index.ts): localization resolver and translator
- [src/data/mockRounds.ts](/Users/nikitapranchuk/Documents/tradergamesbot/src/data/mockRounds.ts): mock round bank
- [src/data/mockLeaderboard.ts](/Users/nikitapranchuk/Documents/tradergamesbot/src/data/mockLeaderboard.ts): demo leaderboard seed

## Telegram Mini App Integration

The app includes the Telegram bootstrap script in [index.html](/Users/nikitapranchuk/Documents/tradergamesbot/index.html) and initializes Telegram WebApp behavior in [src/utils/telegram.ts](/Users/nikitapranchuk/Documents/tradergamesbot/src/utils/telegram.ts).

Implemented:
- `Telegram.WebApp.ready()`
- `expand()`
- header/background color sync
- viewport and safe-area CSS variable sync
- BackButton handling for secondary screens
- haptic feedback hooks
- `openLink` and `openTelegramLink` handling
- browser fallback outside Telegram

### Step-by-Step Telegram Launch Setup

1. Deploy this app to a public HTTPS URL.
2. Verify the deployed URL opens directly in a browser.
3. In `@BotFather`, create or choose your production bot.
4. Configure the Main Mini App for that bot and set the production Mini App URL.
5. Set the bot menu button to open the Mini App.
6. If you use direct launch links, configure the Mini App short name and set `VITE_TELEGRAM_APP_SHORT_NAME`.
7. Put the real production channel and bot links into `.env`.
8. Rebuild and redeploy with production env values.
9. Test from Telegram iOS, Telegram Android, and Telegram Desktop.
10. Only after real-device Telegram checks pass, soft-launch to a small user group.

## GitHub Pages

The repo includes [deploy-pages.yml](/Users/nikitapranchuk/Documents/tradergamesbot/.github/workflows/deploy-pages.yml) for GitHub Pages deployment.

Expected Pages URL:
- `https://harmonytrade.github.io/marketgames/`

Notes:
- the workflow builds with `BASE_PATH=/marketgames/`
- after the first push, GitHub Pages may need a minute to publish
- once the URL is live, it can be used for the bot menu button via Bot API

### Telegram Checklist Before Public Release

- production URL uses valid HTTPS
- bot menu button opens the Mini App
- `Launch App` works from the bot profile
- channel CTA opens the correct channel
- bot CTA opens the correct bot
- app still works in a normal browser outside Telegram
- Russian copy is visible by default
- share flow does not fail silently

## Localization

Russian is the primary locale. English is included as a fallback dictionary.

Locale resolution order:
1. `VITE_DEFAULT_LOCALE`
2. Telegram user `language_code`
3. browser locale
4. fallback to `ru`

Translation files:
- [src/i18n/locales/ru.ts](/Users/nikitapranchuk/Documents/tradergamesbot/src/i18n/locales/ru.ts)
- [src/i18n/locales/en.ts](/Users/nikitapranchuk/Documents/tradergamesbot/src/i18n/locales/en.ts)

## QA Notes

Critical launch checks:
- first launch shows Welcome and later opens Main Menu
- session always completes exactly 10 rounds
- BUY / SELL cannot be double-scored by fast tapping
- timeout works after returning from background
- result share works in Telegram and falls back outside Telegram
- channel and bot links open in both environments
- Russian text fits on small devices
- `npm run build` passes before every release

## Publishing Plan

1. `npm run build`
2. Deploy `dist/` to your HTTPS host
3. Open the live URL in Safari/Chrome first
4. Open the same URL from Telegram mobile via the bot
5. Verify safe area, timer, results, and CTA links on iPhone
6. Verify the same flow on Android
7. Verify open/share behavior on Telegram Desktop
8. Soft-launch to a small Telegram audience
9. Watch for stuck sessions, link issues, or copy/layout bugs
10. Roll out broadly

## Known TODOs

- replace the mock leaderboard with a backend service
- add analytics and crash reporting
- add Telegram start parameter tracking
- add rendered share card generation
- optionally self-host brand fonts if the visual system needs stricter typography control
