# Specification: iOS and Android Native Builds using Expo

## Overview
Set up and configure Expo Application Services (EAS) to build production-ready native iOS and Android applications for HabitHero. This will enable distribution through the Apple App Store and Google Play Store.

## User Story
As a developer, I want to build native iOS and Android applications using Expo so that users can download and install HabitHero from the App Store and Google Play Store.

## Requirements

### Functional Requirements
1. Configure Expo EAS Build for iOS and Android
2. Set up build profiles for development, preview, and production
3. Configure app signing and credentials management
4. Set up continuous integration for automated builds
5. Enable over-the-air (OTA) updates using EAS Update
6. Configure app icons, splash screens, and metadata
7. Test builds on physical devices and simulators/emulators

### Non-Functional Requirements
1. Build process must be repeatable and automated
2. Credentials must be securely managed (keystore, certificates, provisioning profiles)
3. Build configuration must support multiple environments (dev, staging, production)
4. Documentation must be clear for team members to create builds
5. Build time should be optimized (use cache, incremental builds)
6. OTA updates must work reliably for bug fixes and minor updates

## Technical Specifications

### Expo EAS Setup

#### 1. Prerequisites
- Expo account (free tier supports builds)
- Apple Developer Account ($99/year) for iOS App Store
- Google Play Developer Account ($25 one-time fee)
- Node.js 20+
- EAS CLI installed globally

#### 2. EAS Configuration File (`eas.json`)
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
        "buildType": "apk"
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
        "ascAppId": "YOUR_ASC_APP_ID",
        "appleTeamId": "YOUR_TEAM_ID"
      },
      "android": {
        "serviceAccountKeyPath": "./path/to/service-account-key.json",
        "track": "internal"
      }
    }
  }
}
```

#### 3. App Configuration Updates (`app.json`)

Add/update the following sections:

```json
{
  "expo": {
    "name": "HabitHero",
    "slug": "habithero",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.fahmed93.habithero",
      "buildNumber": "1",
      "infoPlist": {
        "NSUserNotificationsUsageDescription": "HabitHero sends reminders to help you maintain your habits.",
        "NSCalendarsUsageDescription": "HabitHero needs calendar access to schedule habit reminders."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.fahmed93.habithero",
      "versionCode": 1,
      "permissions": [
        "NOTIFICATIONS",
        "SCHEDULE_EXACT_ALARM",
        "RECEIVE_BOOT_COMPLETED"
      ],
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false
    },
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#ffffff",
          "sounds": []
        }
      ]
    ],
    "updates": {
      "url": "https://u.expo.dev/[your-project-id]"
    },
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "extra": {
      "eas": {
        "projectId": "[your-project-id]"
      }
    }
  }
}
```

### Build Profiles

#### Development Build
- **Purpose**: Internal testing, development
- **Features**: 
  - Development client enabled
  - Fast refresh
  - Debug mode
  - Simulator/emulator support
- **Distribution**: Internal only
- **Format**: APK (Android), Simulator build (iOS)

#### Preview Build
- **Purpose**: QA, stakeholder review, beta testing
- **Features**:
  - Production-like build
  - No development tools
  - Can be shared via TestFlight (iOS) or direct APK (Android)
- **Distribution**: Internal
- **Format**: APK (Android), IPA for TestFlight (iOS)

#### Production Build
- **Purpose**: App Store and Google Play Store submission
- **Features**:
  - Fully optimized
  - Release signing
  - No debug symbols (or uploaded separately)
- **Distribution**: App Store/Google Play
- **Format**: AAB (Android), IPA (iOS)

### Credentials Management

#### iOS Credentials
- **Distribution Certificate**: For App Store distribution
- **Provisioning Profile**: Links app ID, certificate, and devices
- **Push Notification Certificate**: For remote notifications
- **Management**: EAS automatically manages credentials (recommended) or manual upload

#### Android Credentials
- **Keystore**: Required for signing APKs/AABs
- **Upload Key**: For Google Play signing
- **Management**: EAS automatically generates and stores securely

### Asset Requirements

#### App Icons
- **iOS**: 1024x1024 PNG (no transparency, no rounded corners)
- **Android**: 1024x1024 PNG (adaptive icon with foreground and background)
- **Location**: `./assets/icon.png`, `./assets/adaptive-icon.png`

#### Splash Screen
- **Size**: 2048x2048 PNG (centered content in middle 1284x1284)
- **Location**: `./assets/splash-icon.png`
- **Background**: Configurable via app.json

#### Notification Icon (Android)
- **Size**: 96x96 PNG (monochrome, transparent background)
- **Location**: `./assets/notification-icon.png`

### EAS Update (Over-the-Air Updates)

Configure for pushing JS/asset updates without requiring new app store builds:

#### Configuration
- Use `runtimeVersion` policy: `"appVersion"` or semantic versioning
- Configure update channel per build profile
- Set up update rollout strategy (percentage-based, gradual)

#### Update Commands
```bash
# Publish update to production
eas update --branch production --message "Bug fixes and improvements"

# Publish update to preview
eas update --branch preview --message "Testing new feature"
```

#### Update Limitations
- Can update: JavaScript code, assets, app.json config (most fields)
- Cannot update: Native code changes, new native modules, build-time config

### GitHub Actions Integration

Add workflow for automated builds:

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
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
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

### Build Commands

```bash
# Login to Expo
eas login

# Configure EAS for the project
eas build:configure

# Build for specific platform and profile
eas build --platform ios --profile production
eas build --platform android --profile production
eas build --platform all --profile preview

# Submit to stores
eas submit --platform ios --latest
eas submit --platform android --latest

# View build status
eas build:list

# Download build artifact
eas build:download --platform ios --latest
```

### Testing Strategy

#### Pre-Build Testing
1. Run on Expo Go for basic functionality
2. Test on web build
3. Verify all dependencies are compatible with native builds

#### Post-Build Testing
1. **Development Builds**:
   - Install on physical devices
   - Test core functionality
   - Verify notifications work
   - Test data persistence
   - Check theme switching

2. **Preview Builds**:
   - Distribute to beta testers
   - Test on various devices (different iOS/Android versions)
   - Verify app store metadata (name, icon, splash screen)
   - Test deep links and permissions

3. **Production Builds**:
   - Full regression testing
   - Performance testing
   - Check app size
   - Verify OTA updates work
   - Test upgrade path from previous version

### Version Management

#### Versioning Strategy
- Use semantic versioning: `MAJOR.MINOR.PATCH`
- **MAJOR**: Breaking changes, major features
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes, minor improvements

#### Version Tracking
- `version` in app.json: User-facing version (e.g., "1.2.3")
- `buildNumber` (iOS): Incremental integer (e.g., 42)
- `versionCode` (Android): Incremental integer (e.g., 42)

#### Update Process
1. Update `version` in app.json
2. Increment `buildNumber` (iOS) and `versionCode` (Android)
3. Update changelog
4. Create git tag (e.g., `v1.2.3`)
5. Build and submit to stores

### App Store Submission

#### iOS App Store (via TestFlight)
1. Create app in App Store Connect
2. Prepare app metadata (description, screenshots, keywords)
3. Build production IPA: `eas build --platform ios --profile production`
4. Submit to TestFlight: `eas submit --platform ios --latest`
5. Internal testing (TestFlight)
6. External testing (TestFlight beta)
7. Submit for App Store review
8. Release to production

#### Google Play Store
1. Create app in Google Play Console
2. Prepare store listing (description, screenshots, feature graphic)
3. Build production AAB: `eas build --platform android --profile production`
4. Submit to internal testing track: `eas submit --platform android --latest`
5. Progress through testing tracks (internal → closed → open → production)
6. Release to production

### Security Considerations

1. **Credentials Storage**:
   - Never commit keystores, certificates, or provisioning profiles
   - Use EAS to manage credentials securely
   - Store sensitive data in GitHub Secrets (for CI/CD)

2. **API Keys**:
   - Use environment variables
   - Different keys for dev/staging/production
   - Store in EAS Secrets or GitHub Secrets

3. **Code Obfuscation**:
   - Enable ProGuard for Android
   - Consider using Hermes for React Native optimization

4. **App Transport Security (iOS)**:
   - Use HTTPS for all network requests
   - Configure ATS settings in Info.plist if needed

## Acceptance Criteria

### Must Have
1. ✅ EAS is configured with `eas.json`
2. ✅ App.json includes all necessary iOS and Android configurations
3. ✅ Development, preview, and production build profiles are defined
4. ✅ iOS build succeeds and can be installed on physical device
5. ✅ Android build succeeds and can be installed on physical device
6. ✅ App icons and splash screens are properly configured
7. ✅ Notifications permissions are requested and work correctly
8. ✅ Data persistence works on native builds (AsyncStorage)
9. ✅ Documentation is updated with build instructions

### Should Have
1. ✅ GitHub Actions workflow for automated builds
2. ✅ EAS Update is configured for OTA updates
3. ✅ Credentials are managed by EAS
4. ✅ TestFlight/Internal testing track configured
5. ✅ App store metadata prepared (screenshots, descriptions)
6. ✅ Version management strategy documented

### Nice to Have
1. Automated screenshot generation for app stores
2. Fastlane integration for advanced automation
3. App size optimization (bundle analyzer)
4. Performance monitoring (Sentry, Firebase)
5. Analytics (privacy-focused, opt-in)

## Out of Scope
- Paid features or in-app purchases
- Backend services or cloud sync
- Social features or user accounts
- Apple Watch or Android Wear apps
- Widget extensions (for now)
- App clips or instant apps

## Success Metrics
- Successful iOS build that runs on iPhone
- Successful Android build that runs on Android phone
- All core features work identically to web version
- App passes basic store submission requirements
- OTA updates can be deployed without new builds
- Build time is reasonable (under 20 minutes)
- Documentation enables other developers to create builds

## Dependencies
- Expo SDK ~54.0
- EAS CLI latest
- Apple Developer Account (for iOS)
- Google Play Developer Account (for Android)
- Expo account with EAS Build access

## References
- [Expo EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Submit Documentation](https://docs.expo.dev/submit/introduction/)
- [EAS Update Documentation](https://docs.expo.dev/eas-update/introduction/)
- [iOS App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Store Guidelines](https://play.google.com/about/developer-content-policy/)
- [App Icon Guidelines](https://docs.expo.dev/develop/user-interface/app-icons/)
- [Splash Screen Guidelines](https://docs.expo.dev/develop/user-interface/splash-screen/)
