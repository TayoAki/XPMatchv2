# XPMatch app

Expo SDK 57 (React Native 0.86.3, React 19.2.3), Expo Router, Uniwind and React Native Reusables (plan D-037). Bundle ID and package: `com.xpmatchme.app`. That can still change, but only until the first store build.

## Run it

```bash
cp .env.example .env.local   # API address and the component check
npm run mobile:start         # from the repository root
```

Open the development build on a phone and scan the QR code. Expo Go can't load this app: it uses native modules outside Expo Go (expo-sqlite, expo-dev-client).

## First device builds (founder, on your computer)

EAS runs these builds on its own servers with your Expo account. It creates the iOS signing certificates in your Apple Developer account when you sign in with your Apple ID. Run every command from `apps/mobile`.

1. **Get the code:**
   ```bash
   git clone https://github.com/TayoAki/XPMatchv2 && cd XPMatchv2
   git checkout claude/jolly-volta-2fnh1l      # or main once the S0.1 PR is merged
   npm install && cd apps/mobile
   ```
2. **Link the project to your Expo account:**
   ```bash
   npx eas-cli@latest login
   npx eas-cli@latest init
   ```
   This writes `owner` and `extra.eas.projectId` into `app.json`. If you're offered an existing project called `xpmatch`, create a new one instead.
3. **Turn on over-the-air updates:**
   ```bash
   npx eas-cli@latest update:configure
   ```
   This writes `updates.url` and `runtimeVersion` into `app.json`. Commit the `app.json` changes from steps 2 and 3, or send them to be committed.
4. **Register your iPhone:**
   ```bash
   npx eas-cli@latest device:create
   ```
   Open the link on the iPhone and install the profile. Internal builds only run on registered devices.
5. **Build the development apps:**
   ```bash
   npx eas-cli@latest build --profile development --platform ios
   npx eas-cli@latest build --profile development --platform android
   ```
   For iOS, sign in with your Apple ID when asked and let EAS manage the credentials. Install each build from the link or QR code EAS prints.
6. **Use them:**
   - Run `npm run mobile:start`, then open the XPMatch development app and scan the QR code.
   - For a build that runs without your computer, use `--profile preview`.

## Device checks for S0.1

These can only be done on real phones (AGENTS.md). Note each result as pass or fail, with the phone and OS version.

| # | Check | How |
| --- | --- | --- |
| 1 | Opens on iOS and Android | Development builds from step 5 |
| 2 | Reaches the API | Home shows "✓ Connected" with version 0.1.0 |
| 3 | Mode and accents | Appearance: System, Light and Dark, each of the five colors, then Dark + Ocean |
| 4 | No color flash on start-up | Pick Dark + Plum, close the app completely, reopen: no pine or light flash |
| 5 | Components | Component check: every item renders and opens (dialog, alert, select, popover, tooltip) |
| 6 | Minimum-version gate | On Railway, set `MIN_APP_VERSION_IOS=9.9.9`, reopen the app: the update screen shows. Set it back to `0.1.0` |
| 7 | Over-the-air update | After step 3: build `--profile preview`, publish `npx eas-cli@latest update --channel preview --environment preview`, reopen twice: Home shows "downloaded update" |
| 8 | Screen readers | VoiceOver and TalkBack read the buttons, swatches and toggles by name |

## Notes

- **Colors:** they come from `packages/design-tokens`. `src/global.css` is generated (`npm run tokens:build`), and raw colors in components fail lint.
- **Components:** those in `src/components/ui` were copied from React Native Reusables (CLI 0.7.1) and are ours now. The changes are commented at the top of each file.
- **Icon:** a placeholder XP monogram until there's a logo.
