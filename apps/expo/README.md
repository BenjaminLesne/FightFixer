# FightFixer - Expo App

## EAS Build Guide

### Build Profiles Overview

| Profile | Purpose | Output | Distribution |
|---------|---------|--------|--------------|
| `development` | Dev builds with hot reload, debugging | Dev client | Internal (your devices) |
| `preview` | Testing prod-like build on real devices | APK (Android) | Internal (sideload) |
| `production` | Store submission | AAB (Android) / IPA (iOS) | App stores |

---

## When to Use Each Profile

### Development (`build:dev:*`)

**Use when:**
- You added/changed native modules (not just JS)
- You changed `app.config.ts` native config (permissions, plugins, etc.)
- You upgraded Expo SDK
- First time setting up on a new machine/device

**What it does:**
- Builds custom dev client (like Expo Go but with your native deps)
- Enables hot reload, debugging, dev menu

```bash
pnpm build:dev:android   # Build dev client for Android
pnpm build:dev:ios       # Build dev client for iOS
pnpm build:dev           # Build for both platforms
pnpm build:dev:local     # Build locally (no EAS cloud, slower)
```

---

### Preview (`build:preview:*`)

**Use when:**
- Testing the "real" app on your phone
- Sharing with testers/friends without app stores
- QA before production release
- You want to sideload APK

**What it does:**
- Production-like build (no dev tools)
- APK output for Android (directly installable)
- Internal distribution

```bash
pnpm build:preview:android   # Build APK for Android
pnpm build:preview:ios       # Build for iOS (requires Apple Dev account)
pnpm build:preview           # Build for both
```

**After build:**
1. EAS gives you a download link
2. Open link on phone or transfer APK
3. Install (enable "unknown sources" on Android if needed)

---

### Production (`build:prod:*`)

**Use when:**
- Submitting to Google Play Store
- Submitting to Apple App Store

**What it does:**
- Fully optimized release build
- AAB for Android (Play Store format)
- IPA for iOS (App Store format)

```bash
pnpm build:prod:android   # Build AAB for Play Store
pnpm build:prod:ios       # Build IPA for App Store
pnpm build:prod           # Build for both
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Daily dev (no native changes) | `pnpm dev` |
| Native deps changed | `pnpm build:dev:android` then `pnpm dev` |
| Test on real phone | `pnpm build:preview:android` |
| Submit to Play Store | `pnpm build:prod:android` |
| Submit to App Store | `pnpm build:prod:ios` |

---

## Decision Flowchart

```
Did you change native code / app.config.ts / SDK?
  │
  ├─ YES → build:dev:* (rebuild dev client)
  │
  └─ NO → Just run `pnpm dev`
  
Ready to test prod-like build?
  │
  └─ YES → build:preview:android (get APK, install on phone)

Ready for app stores?
  │
  └─ YES → build:prod:* + submit via EAS or manually
```

