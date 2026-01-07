# Implementation Plan: iOS and Android Builds using Expo

## Overview
This document outlines the step-by-step technical implementation plan for setting up native iOS and Android builds for HabitHero using Expo Application Services (EAS).

## Phases

### Phase 1: Prerequisites and Setup (Estimated: 1-2 hours)

#### 1.1 Account Setup
- [ ] Create/verify Expo account at expo.dev
- [ ] Document Expo account username
- [ ] Install EAS CLI globally: `npm install -g eas-cli`
- [ ] Login to EAS: `eas login`
- [ ] Verify EAS CLI installation: `eas --version`

#### 1.2 Developer Accounts (Optional for initial setup)
- [ ] Apple Developer Account registration ($99/year)
- [ ] Google Play Developer Account registration ($25 one-time)
- [ ] Document account credentials securely

#### 1.3 Project Preparation
- [ ] Ensure all dependencies are up to date
- [ ] Verify app works correctly in Expo Go
- [ ] Test web build to ensure base functionality
- [ ] Run `npm install` to ensure lock file is current

### Phase 2: EAS Configuration (Estimated: 2-3 hours)

#### 2.1 Initialize EAS Build
```bash
cd /path/to/habithero
eas build:configure
```

This creates:
- `eas.json` - Build configuration file
- Updates `app.json` with EAS project ID

#### 2.2 Configure `eas.json`
Create build profiles with the following structure:
- **development**: For internal testing with dev client
- **preview**: For beta testing and QA
- **production**: For app store submission

Configuration details:
```json
{
  "cli": {
    "version": ">= 13.2.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      },
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleDebug"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false
      },
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "ios": {
        "simulator": false
      },
      "android": {
        "buildType": "aab"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "YOUR_APPLE_ID",
        "ascAppId": "YOUR_ASC_APP_ID"
      },
      "android": {
        "track": "internal"
      }
    }
  }
}
```

#### 2.3 Update `app.json`
Add/update the following:

**Version Information**:
```json
{
  "expo": {
    "version": "1.0.0",
    "ios": {
      "buildNumber": "1"
    },
    "android": {
      "versionCode": 1
    }
  }
}
```

**Platform-specific Configuration**:
```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.fahmed93.habithero",
      "supportsTablet": true,
      "infoPlist": {
        "NSUserNotificationsUsageDescription": "HabitHero sends reminders to help you maintain your habits.",
        "NSCalendarsUsageDescription": "HabitHero needs calendar access to schedule habit reminders."
      }
    },
    "android": {
      "package": "com.fahmed93.habithero",
      "permissions": [
        "NOTIFICATIONS",
        "SCHEDULE_EXACT_ALARM",
        "RECEIVE_BOOT_COMPLETED"
      ]
    }
  }
}
```

**Plugins Configuration**:
```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#ffffff"
        }
      ]
    ]
  }
}
```

**EAS Updates**:
```json
{
  "expo": {
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "updates": {
      "url": "https://u.expo.dev/[your-project-id]"
    }
  }
}
```

### Phase 3: Assets Preparation (Estimated: 1-2 hours)

#### 3.1 App Icon
- [ ] Design 1024x1024 app icon (PNG, no transparency for iOS)
- [ ] Save as `./assets/icon.png`
- [ ] Create Android adaptive icon: `./assets/adaptive-icon.png`
- [ ] Test icon rendering using Expo tools

#### 3.2 Splash Screen
- [ ] Design 2048x2048 splash screen
- [ ] Save as `./assets/splash-icon.png`
- [ ] Configure background color in app.json

#### 3.3 Notification Icon (Android)
- [ ] Create 96x96 monochrome icon
- [ ] Save as `./assets/notification-icon.png`
- [ ] Ensure transparency and proper format

#### 3.4 Asset Validation
```bash
npx expo-asset-utils validate
```

### Phase 4: First Build (Estimated: 30-45 minutes per platform)

#### 4.1 Android Development Build
```bash
# Start first Android build
eas build --platform android --profile development

# Follow prompts:
# - Choose to generate new keystore (recommended for first build)
# - EAS will store credentials securely
```

Expected output:
- Build queued on EAS servers
- Build URL provided for monitoring
- Estimated completion time displayed

#### 4.2 iOS Development Build
```bash
# Start first iOS build
eas build --platform ios --profile development

# Follow prompts:
# - Choose to generate new credentials
# - Or sign in with Apple Developer Account
# - EAS manages provisioning profiles
```

Notes:
- First build may take 15-20 minutes
- Subsequent builds use cache (faster)
- Monitor build at: https://expo.dev/accounts/[username]/projects/habithero/builds

#### 4.3 Download and Test Builds
```bash
# Download latest build
eas build:download --platform android --latest
eas build:download --platform ios --latest

# For iOS simulator:
# Drag and drop .tar.gz to simulator
# Or use: xcrun simctl install booted ./path/to/app.tar.gz

# For Android emulator:
# adb install ./path/to/app.apk

# For physical devices:
# iOS: Install via TestFlight or ad-hoc distribution
# Android: Install APK directly
```

### Phase 5: Testing First Builds (Estimated: 2-3 hours)

#### 5.1 Functional Testing
- [ ] App launches successfully
- [ ] Main navigation works
- [ ] Create new habit
- [ ] Mark habit complete
- [ ] View habit details (grid, calendar, stats)
- [ ] Edit habit
- [ ] Delete habit
- [ ] Archive/unarchive habit
- [ ] Export data
- [ ] Switch theme (light/dark)
- [ ] Check settings

#### 5.2 Platform-Specific Testing
**iOS**:
- [ ] Test on different iOS versions (16+)
- [ ] Test on different devices (iPhone, iPad)
- [ ] Verify safe area insets
- [ ] Test rotation (if applicable)
- [ ] Check status bar appearance

**Android**:
- [ ] Test on different Android versions (11+)
- [ ] Test on different screen sizes
- [ ] Verify edge-to-edge display
- [ ] Test back button behavior
- [ ] Check notification permissions

#### 5.3 Storage Testing
- [ ] Verify AsyncStorage persistence
- [ ] Test data after app restart
- [ ] Test data after device restart
- [ ] Test export/import (if implemented)

#### 5.4 Notification Testing
- [ ] Request notification permissions
- [ ] Schedule test notification
- [ ] Verify notification appears
- [ ] Test notification interaction
- [ ] Test notification settings

### Phase 6: Preview and Production Builds (Estimated: 1-2 hours)

#### 6.1 Create Preview Build
```bash
# Build for testing/QA
eas build --platform all --profile preview

# Wait for build completion
# Download and distribute to testers
```

#### 6.2 Create Production Build
```bash
# Build for app stores
eas build --platform all --profile production

# This creates:
# - AAB for Android (Google Play)
# - IPA for iOS (App Store)
```

#### 6.3 Validate Production Builds
- [ ] Install and test production builds
- [ ] Verify no development tools visible
- [ ] Check app size (should be optimized)
- [ ] Test performance
- [ ] Verify metadata (app name, icon, version)

### Phase 7: EAS Update Setup (Estimated: 30 minutes)

#### 7.1 Configure Updates
Already configured in app.json with `runtimeVersion` policy.

#### 7.2 Publish First Update
```bash
# Publish update to production branch
eas update --branch production --message "Initial release"

# Publish update to preview branch
eas update --branch preview --message "Testing update"
```

#### 7.3 Test OTA Updates
- [ ] Install production build
- [ ] Publish update with minor change
- [ ] Launch app, verify update downloads
- [ ] Confirm change appears in app

### Phase 8: CI/CD Integration (Estimated: 1-2 hours)

#### 8.1 Create Expo Token
```bash
# Generate token for CI/CD
eas credentials:configure
# Or create in Expo dashboard
```

#### 8.2 Add GitHub Secret
- Go to GitHub repository settings
- Add secret: `EXPO_TOKEN`
- Paste token value

#### 8.3 Create GitHub Actions Workflow
Create `.github/workflows/eas-build.yml`:
```yaml
name: EAS Build

on:
  workflow_dispatch:
    inputs:
      platform:
        description: 'Platform to build'
        required: true
        type: choice
        options:
          - ios
          - android
          - all
      profile:
        description: 'Build profile'
        required: true
        type: choice
        options:
          - development
          - preview
          - production

jobs:
  build:
    name: EAS Build - ${{ inputs.platform }} - ${{ inputs.profile }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Setup Expo and EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Install dependencies
        run: npm ci

      - name: Build for iOS
        if: ${{ inputs.platform == 'ios' || inputs.platform == 'all' }}
        run: eas build --platform ios --profile ${{ inputs.profile }} --non-interactive

      - name: Build for Android
        if: ${{ inputs.platform == 'android' || inputs.platform == 'all' }}
        run: eas build --platform android --profile ${{ inputs.profile }} --non-interactive
```

#### 8.4 Test Automated Build
- Go to Actions tab in GitHub
- Manually trigger "EAS Build" workflow
- Select platform and profile
- Monitor build progress

### Phase 9: Documentation (Estimated: 1 hour)

#### 9.1 Update README.md
Add sections:
- Building for iOS and Android
- EAS Build commands
- Testing on devices
- Submitting to app stores

#### 9.2 Create BUILD.md
Document:
- Prerequisites
- Step-by-step build instructions
- Troubleshooting common issues
- Version management
- Release process

#### 9.3 Update CONTRIBUTING.md
Include:
- How to test builds locally
- Build verification checklist
- Submission guidelines

### Phase 10: App Store Preparation (Future Phase)

#### 10.1 iOS App Store
- [ ] Create app in App Store Connect
- [ ] Prepare metadata:
  - App name: HabitHero
  - Subtitle
  - Description
  - Keywords
  - Screenshots (6.5", 5.5", 12.9")
  - App preview video (optional)
  - Support URL
  - Privacy policy URL
- [ ] Submit for TestFlight
- [ ] Beta testing
- [ ] Submit for review

#### 10.2 Google Play Store
- [ ] Create app in Google Play Console
- [ ] Prepare store listing:
  - App name: HabitHero
  - Short description
  - Full description
  - Screenshots (phone, 7" tablet, 10" tablet)
  - Feature graphic (1024x500)
  - App icon (512x512)
- [ ] Submit to internal track
- [ ] Progress through testing tracks
- [ ] Release to production

## Estimated Timeline
- **Phase 1**: 1-2 hours (one-time setup)
- **Phase 2**: 2-3 hours (configuration)
- **Phase 3**: 1-2 hours (assets)
- **Phase 4**: 1-2 hours (first builds + wait time)
- **Phase 5**: 2-3 hours (testing)
- **Phase 6**: 1-2 hours (additional builds)
- **Phase 7**: 30 minutes (updates)
- **Phase 8**: 1-2 hours (CI/CD)
- **Phase 9**: 1 hour (documentation)
- **Phase 10**: Variable (future store submission)

**Total**: Approximately 1-2 days for complete setup and initial builds

## Risk Mitigation

### Common Issues and Solutions

**Build Failures**:
- Check compatibility of all dependencies with native builds
- Review build logs on EAS dashboard
- Ensure app.json configuration is correct
- Verify assets exist and are correct format

**Credentials Issues**:
- Let EAS manage credentials automatically (recommended)
- If manual: ensure certificates are valid and not expired
- Check keystore password is correct

**App Crashes on Device**:
- Check native logs (Xcode Console for iOS, logcat for Android)
- Verify permissions are properly requested
- Test on multiple devices/OS versions
- Check for platform-specific code issues

**OTA Updates Not Working**:
- Verify runtimeVersion is set correctly
- Check that app is configured for EAS Update
- Ensure updates are published to correct branch
- Test update logic with different scenarios

**Performance Issues**:
- Enable Hermes for better performance
- Optimize assets (compress images)
- Use production builds for testing (dev builds are slower)
- Profile with React DevTools and native profilers

## Success Criteria
- ✅ EAS configuration files created and committed
- ✅ Successful Android build (development profile)
- ✅ Successful iOS build (development profile)
- ✅ App installs and runs on physical Android device
- ✅ App installs and runs on physical iOS device
- ✅ All core features work on native builds
- ✅ OTA update mechanism tested and working
- ✅ GitHub Actions workflow for automated builds
- ✅ Documentation updated with build instructions

## Next Steps After Completion
1. Set up app store accounts (Apple, Google)
2. Prepare store metadata and assets
3. Complete internal testing
4. Submit to TestFlight and Google Play internal track
5. Conduct beta testing with external users
6. Submit for app store review
7. Release to production
8. Set up analytics and crash reporting
9. Plan for ongoing maintenance and updates
