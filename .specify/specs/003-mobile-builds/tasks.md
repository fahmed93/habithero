# Tasks: iOS and Android Builds using Expo

## Overview
This document breaks down the implementation of iOS and Android builds into specific, actionable tasks. Each task should be completable in a single work session.

## Task Status Legend
- 🔲 Not Started
- 🔄 In Progress
- ✅ Complete
- ⏸️ Blocked/Waiting

---

## Phase 1: Prerequisites and Setup

### Task 1.1: Create and Configure Expo Account
**Status**: 🔲  
**Estimated Time**: 15 minutes  
**Priority**: High  
**Dependencies**: None

**Steps**:
1. Visit https://expo.dev and create account
2. Verify email address
3. Note down Expo username for configuration
4. Document account credentials securely

**Acceptance Criteria**:
- Expo account created and verified
- Account username documented

---

### Task 1.2: Install and Configure EAS CLI
**Status**: 🔲  
**Estimated Time**: 15 minutes  
**Priority**: High  
**Dependencies**: Task 1.1

**Steps**:
1. Install EAS CLI: `npm install -g eas-cli`
2. Verify installation: `eas --version`
3. Login to EAS: `eas login`
4. Verify login: `eas whoami`

**Acceptance Criteria**:
- EAS CLI installed globally
- Successfully logged into Expo account
- Can run `eas` commands

---

### Task 1.3: Developer Account Registration (Optional)
**Status**: 🔲  
**Estimated Time**: 30-60 minutes  
**Priority**: Low (for initial development)  
**Dependencies**: None

**Steps**:
1. Register Apple Developer Account ($99/year) at https://developer.apple.com
2. Register Google Play Developer Account ($25 one-time) at https://play.google.com/console
3. Document account credentials securely
4. Set up two-factor authentication

**Acceptance Criteria**:
- Developer accounts registered (if proceeding with store submission)
- Credentials documented and secured
- Two-factor authentication enabled

**Notes**: Not required for initial builds. Can use EAS-managed credentials for testing.

---

## Phase 2: EAS Configuration

### Task 2.1: Initialize EAS Build Configuration
**Status**: 🔲  
**Estimated Time**: 30 minutes  
**Priority**: High  
**Dependencies**: Task 1.2

**Steps**:
1. Navigate to project directory
2. Run `eas build:configure`
3. Select platforms (iOS and Android)
4. Review generated `eas.json`
5. Note the project ID added to `app.json`

**Acceptance Criteria**:
- `eas.json` file created in project root
- `app.json` updated with `extra.eas.projectId`
- Files committed to version control

---

### Task 2.2: Configure Build Profiles in eas.json
**Status**: 🔲  
**Estimated Time**: 45 minutes  
**Priority**: High  
**Dependencies**: Task 2.1

**Steps**:
1. Open `eas.json`
2. Configure development profile with:
   - `developmentClient: true`
   - iOS simulator support
   - Android APK build type
3. Configure preview profile for internal distribution
4. Configure production profile for store submission
5. Add submit configuration for both platforms
6. Validate JSON syntax
7. Commit changes

**Acceptance Criteria**:
- Three build profiles defined (development, preview, production)
- Each profile properly configured for iOS and Android
- Submit configuration added
- No JSON syntax errors

**Reference**: See `plan.md` for complete configuration example

---

### Task 2.3: Update app.json with Native Build Configuration
**Status**: 🔲  
**Estimated Time**: 45 minutes  
**Priority**: High  
**Dependencies**: Task 2.1

**Steps**:
1. Add iOS build number: `"buildNumber": "1"`
2. Add Android version code: `"versionCode": 1`
3. Add iOS permissions in `infoPlist`:
   - NSUserNotificationsUsageDescription
   - NSCalendarsUsageDescription
4. Add Android permissions array
5. Configure notification plugin with icon
6. Add runtime version policy
7. Add EAS update URL (will be updated after first build)
8. Verify bundle identifiers are set correctly
9. Commit changes

**Acceptance Criteria**:
- All version fields added
- Permission descriptions added
- Plugins configured
- Runtime version set to "appVersion" policy
- No JSON syntax errors

---

## Phase 3: Assets Preparation

### Task 3.1: Create App Icon
**Status**: 🔲  
**Estimated Time**: 1-2 hours  
**Priority**: High  
**Dependencies**: None

**Steps**:
1. Design 1024x1024 app icon (or use existing)
2. Ensure iOS requirements (no transparency, no rounded corners)
3. Save as `./assets/icon.png`
4. Create adaptive icon for Android if different
5. Save as `./assets/adaptive-icon.png`
6. Test icon appearance using Expo tools

**Acceptance Criteria**:
- `icon.png` exists in assets folder (1024x1024)
- `adaptive-icon.png` exists in assets folder
- Icons meet platform requirements
- Icons render correctly in preview

**Tools**: Figma, Adobe Illustrator, or icon generator

---

### Task 3.2: Create Splash Screen
**Status**: 🔲  
**Estimated Time**: 1 hour  
**Priority**: High  
**Dependencies**: None

**Steps**:
1. Design 2048x2048 splash screen
2. Center content in middle 1284x1284 for safe area
3. Save as `./assets/splash-icon.png`
4. Update `app.json` splash configuration if needed
5. Set appropriate background color

**Acceptance Criteria**:
- `splash-icon.png` exists in assets folder (2048x2048)
- Splash configuration in app.json is correct
- Content is properly centered for all screen sizes

---

### Task 3.3: Create Notification Icon for Android
**Status**: 🔲  
**Estimated Time**: 30 minutes  
**Priority**: Medium  
**Dependencies**: None

**Steps**:
1. Create 96x96 monochrome icon
2. Ensure transparent background
3. Save as `./assets/notification-icon.png`
4. Verify plugin configuration in app.json references it

**Acceptance Criteria**:
- `notification-icon.png` exists in assets folder
- Icon is monochrome with transparency
- Plugin in app.json references correct path

---

## Phase 4: First Build

### Task 4.1: Create First Android Development Build
**Status**: 🔲  
**Estimated Time**: 45 minutes (including build time)  
**Priority**: High  
**Dependencies**: Tasks 2.1, 2.2, 2.3, 3.1, 3.2

**Steps**:
1. Ensure all code is committed
2. Run: `eas build --platform android --profile development`
3. Select "Generate new keystore" when prompted
4. Wait for build to queue and start
5. Monitor build progress at provided URL
6. Wait for build completion (~15-20 minutes)
7. Download build: `eas build:download --platform android --latest`
8. Document build URL and build ID

**Acceptance Criteria**:
- Build completes successfully
- APK downloaded to local machine
- Build ID documented
- Keystore generated and stored by EAS

**Troubleshooting**: If build fails, check build logs on EAS dashboard

---

### Task 4.2: Create First iOS Development Build
**Status**: 🔲  
**Estimated Time**: 45 minutes (including build time)  
**Priority**: High  
**Dependencies**: Tasks 2.1, 2.2, 2.3, 3.1, 3.2

**Steps**:
1. Run: `eas build --platform ios --profile development`
2. Select credential management option:
   - Option 1: Let EAS manage everything (recommended)
   - Option 2: Use existing Apple Developer Account
3. Wait for build to queue and start
4. Monitor build progress
5. Wait for build completion (~15-20 minutes)
6. Download build: `eas build:download --platform ios --latest`
7. Document build URL and build ID

**Acceptance Criteria**:
- Build completes successfully
- Simulator build or IPA downloaded
- Build ID documented
- Credentials managed by EAS or properly configured

**Notes**: For simulator builds, you'll get a .tar.gz file

---

### Task 4.3: Install Android Build on Device/Emulator
**Status**: 🔲  
**Estimated Time**: 15 minutes  
**Priority**: High  
**Dependencies**: Task 4.1

**Steps**:
1. For emulator:
   - Start Android emulator
   - Run: `adb install ./path/to/app.apk`
2. For physical device:
   - Enable USB debugging on device
   - Connect device via USB
   - Run: `adb install ./path/to/app.apk`
   - Or transfer APK and install directly
3. Launch app
4. Verify app opens without crashing

**Acceptance Criteria**:
- APK installs successfully
- App launches on device/emulator
- No immediate crashes
- App icon appears correctly

---

### Task 4.4: Install iOS Build on Simulator/Device
**Status**: 🔲  
**Estimated Time**: 15 minutes  
**Priority**: High  
**Dependencies**: Task 4.2

**Steps**:
1. For simulator (if simulator build):
   - Extract .tar.gz file
   - Drag .app to simulator
   - Or: `xcrun simctl install booted ./path/to/app.app`
2. For physical device:
   - Use TestFlight (requires TestFlight build)
   - Or use ad-hoc distribution
3. Launch app
4. Verify app opens without crashing

**Acceptance Criteria**:
- App installs successfully
- App launches on simulator/device
- No immediate crashes
- App icon and splash screen appear correctly

---

## Phase 5: Testing First Builds

### Task 5.1: Functional Testing - Core Features
**Status**: 🔲  
**Estimated Time**: 1 hour  
**Priority**: High  
**Dependencies**: Tasks 4.3, 4.4

**Steps**:
Test the following on both platforms:
1. App launches successfully
2. Navigation between tabs works
3. Create a new habit
4. Mark habit as complete
5. Unmark habit
6. Edit habit
7. View habit details
8. Check grid visualization
9. Check calendar view
10. View statistics
11. Delete habit (test confirmation)
12. Create another habit for further testing

**Acceptance Criteria**:
- All core features work on both iOS and Android
- No crashes during testing
- UI renders correctly on both platforms
- Data persists after app restart

**Document**: Note any platform-specific issues or differences

---

### Task 5.2: Functional Testing - Advanced Features
**Status**: 🔲  
**Estimated Time**: 1 hour  
**Priority**: High  
**Dependencies**: Task 5.1

**Steps**:
Test the following on both platforms:
1. Archive a habit
2. View archived habits
3. Unarchive a habit
4. Switch between light and dark themes
5. Export data
6. Navigate to settings
7. Test notification permissions (if implemented)
8. Test all icon and color options
9. Test different habit frequencies
10. Create habits with different goals

**Acceptance Criteria**:
- All advanced features work correctly
- Theme switching is smooth
- Data export produces valid file
- Settings screen accessible
- No crashes or errors

---

### Task 5.3: Platform-Specific Testing - iOS
**Status**: 🔲  
**Estimated Time**: 45 minutes  
**Priority**: Medium  
**Dependencies**: Task 5.1

**Steps**:
1. Test on different iOS versions if possible (16+)
2. Test on different devices (iPhone, iPad if supported)
3. Verify safe area insets (notch, home indicator)
4. Check status bar appearance (light/dark)
5. Test gestures (swipe back, long press)
6. Verify haptic feedback (if implemented)
7. Test with system dark mode
8. Test with larger text sizes (accessibility)
9. Test with VoiceOver (accessibility)
10. Check app behavior on rotation (if applicable)

**Acceptance Criteria**:
- App works on different iOS versions
- Safe areas properly handled
- Status bar appearance correct
- Gestures work as expected
- Accessibility features functional

**Document**: Note any iOS version-specific issues

---

### Task 5.4: Platform-Specific Testing - Android
**Status**: 🔲  
**Estimated Time**: 45 minutes  
**Priority**: Medium  
**Dependencies**: Task 5.1

**Steps**:
1. Test on different Android versions if possible (11+)
2. Test on different screen sizes
3. Verify edge-to-edge display
4. Test back button behavior
5. Test with system dark mode
6. Test notification permissions
7. Test with TalkBack (accessibility)
8. Test with larger text sizes
9. Verify hardware back button
10. Test app behavior on rotation

**Acceptance Criteria**:
- App works on different Android versions
- Edge-to-edge display correct
- Back button behavior appropriate
- Accessibility features functional
- No issues with different screen sizes

**Document**: Note any Android version-specific issues

---

### Task 5.5: Data Persistence Testing
**Status**: 🔲  
**Estimated Time**: 30 minutes  
**Priority**: High  
**Dependencies**: Task 5.1

**Steps**:
1. Create several habits with different data
2. Mark some habits complete
3. Close app completely (swipe away)
4. Reopen app
5. Verify all data persists
6. Restart device
7. Open app again
8. Verify data still persists
9. Test with large dataset (20+ habits)
10. Test export and verify data accuracy

**Acceptance Criteria**:
- Data persists after app closure
- Data persists after device restart
- No data loss with large datasets
- Export contains all data accurately
- AsyncStorage working correctly

---

## Phase 6: Preview and Production Builds

### Task 6.1: Create Preview Builds
**Status**: 🔲  
**Estimated Time**: 1 hour (including build time)  
**Priority**: Medium  
**Dependencies**: Phase 5 completion

**Steps**:
1. Ensure all code changes are committed
2. Run: `eas build --platform all --profile preview`
3. Wait for both builds to complete
4. Download builds
5. Install on test devices
6. Perform smoke test
7. Share with beta testers if available

**Acceptance Criteria**:
- Both iOS and Android preview builds succeed
- Builds install on devices
- Basic functionality works
- Ready for QA/beta testing

---

### Task 6.2: Create Production Builds
**Status**: 🔲  
**Estimated Time**: 1 hour (including build time)  
**Priority**: Medium  
**Dependencies**: Task 6.1 testing completion

**Steps**:
1. Verify all features tested and working
2. Update version if needed
3. Run: `eas build --platform all --profile production`
4. Wait for both builds to complete
5. Download builds
6. Install and test thoroughly
7. Verify app size is reasonable
8. Check build is optimized (no dev tools)

**Acceptance Criteria**:
- iOS IPA and Android AAB created
- Builds are optimized and production-ready
- App size is acceptable
- All features work correctly
- Ready for store submission

---

## Phase 7: EAS Update Setup

### Task 7.1: Publish Initial Update
**Status**: 🔲  
**Estimated Time**: 15 minutes  
**Priority**: Medium  
**Dependencies**: Task 6.2

**Steps**:
1. Verify runtime version is configured
2. Run: `eas update --branch production --message "Initial release"`
3. Run: `eas update --branch preview --message "Preview release"`
4. Note update IDs
5. Verify updates appear in Expo dashboard

**Acceptance Criteria**:
- Updates published successfully
- Both branches have updates
- Updates visible in dashboard

---

### Task 7.2: Test OTA Update Mechanism
**Status**: 🔲  
**Estimated Time**: 30 minutes  
**Priority**: Medium  
**Dependencies**: Task 7.1

**Steps**:
1. Install production build on device
2. Make small visible change (e.g., text update)
3. Publish update: `eas update --branch production --message "Test update"`
4. Close and reopen app
5. Verify update downloads
6. Confirm change appears
7. Test with airplane mode (verify fallback)
8. Document update process

**Acceptance Criteria**:
- Update downloads successfully
- Changes appear in app
- Update process is smooth
- Fallback works if offline

---

## Phase 8: CI/CD Integration

### Task 8.1: Generate Expo Token for CI/CD
**Status**: 🔲  
**Estimated Time**: 15 minutes  
**Priority**: Medium  
**Dependencies**: Task 1.2

**Steps**:
1. Login to Expo dashboard
2. Navigate to Access Tokens
3. Create new token with appropriate permissions
4. Copy token value
5. Store securely (will add to GitHub Secrets)

**Acceptance Criteria**:
- Token generated successfully
- Token has appropriate permissions
- Token value saved securely

---

### Task 8.2: Configure GitHub Secrets
**Status**: 🔲  
**Estimated Time**: 5 minutes  
**Priority**: Medium  
**Dependencies**: Task 8.1

**Steps**:
1. Go to GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Add new secret: `EXPO_TOKEN`
4. Paste token value
5. Save secret

**Acceptance Criteria**:
- Secret added successfully
- Secret name is exactly `EXPO_TOKEN`
- Token is accessible to workflows

---

### Task 8.3: Create GitHub Actions Workflow for EAS Build
**Status**: 🔲  
**Estimated Time**: 45 minutes  
**Priority**: Medium  
**Dependencies**: Task 8.2

**Steps**:
1. Create `.github/workflows/eas-build.yml`
2. Add workflow with manual trigger (workflow_dispatch)
3. Add inputs for platform (ios/android/all)
4. Add inputs for profile (development/preview/production)
5. Add steps:
   - Checkout code
   - Setup Node.js
   - Setup Expo and EAS
   - Install dependencies
   - Build for selected platform
6. Commit workflow file
7. Push to GitHub

**Acceptance Criteria**:
- Workflow file created
- Workflow appears in Actions tab
- Manual trigger available
- Platform and profile selection works

**Reference**: See `plan.md` for complete workflow example

---

### Task 8.4: Test Automated Build
**Status**: 🔲  
**Estimated Time**: 1 hour (including build time)  
**Priority**: Medium  
**Dependencies**: Task 8.3

**Steps**:
1. Go to GitHub Actions tab
2. Select "EAS Build" workflow
3. Click "Run workflow"
4. Select platform: android
5. Select profile: development
6. Run workflow
7. Monitor progress
8. Verify build succeeds
9. Test with different combinations

**Acceptance Criteria**:
- Workflow runs successfully
- Build completes via CI/CD
- Build artifacts are created
- Workflow can be reused easily

---

## Phase 9: Documentation

### Task 9.1: Update README.md
**Status**: 🔲  
**Estimated Time**: 30 minutes  
**Priority**: Medium  
**Dependencies**: Phase 6 completion

**Steps**:
1. Add "Building for Mobile" section
2. Document prerequisites
3. Add EAS build commands
4. Add testing instructions
5. Add troubleshooting tips
6. Update project structure if needed
7. Commit changes

**Acceptance Criteria**:
- README includes mobile build instructions
- Commands are clear and copy-pasteable
- Prerequisites are documented
- Troubleshooting section added

---

### Task 9.2: Create BUILD.md Documentation
**Status**: 🔲  
**Estimated Time**: 45 minutes  
**Priority**: Medium  
**Dependencies**: Phase 6 completion

**Steps**:
1. Create `BUILD.md` in repository root
2. Document complete build process
3. Add version management guidelines
4. Add release process
5. Add troubleshooting section
6. Add links to relevant docs
7. Commit file

**Acceptance Criteria**:
- BUILD.md created with comprehensive guide
- All build scenarios covered
- Version management documented
- Troubleshooting tips included

---

### Task 9.3: Update Contributing Guidelines
**Status**: 🔲  
**Estimated Time**: 15 minutes  
**Priority**: Low  
**Dependencies**: None

**Steps**:
1. Update CONTRIBUTING.md (or create if doesn't exist)
2. Add section on testing builds
3. Add build verification checklist
4. Add submission guidelines
5. Commit changes

**Acceptance Criteria**:
- Guidelines updated with build information
- Clear instructions for contributors
- Verification checklist included

---

## Future Tasks (Phase 10)

### Task 10.1: Prepare iOS App Store Listing
**Status**: ⏸️ (Future)  
**Priority**: Low  
**Dependencies**: Apple Developer Account

**Steps**:
1. Create app in App Store Connect
2. Prepare app name and subtitle
3. Write app description
4. Select keywords
5. Create screenshots for all required sizes
6. Create app preview video (optional)
7. Set up support URL and privacy policy
8. Configure pricing and availability

---

### Task 10.2: Prepare Google Play Store Listing
**Status**: ⏸️ (Future)  
**Priority**: Low  
**Dependencies**: Google Play Developer Account

**Steps**:
1. Create app in Google Play Console
2. Write short and full description
3. Create screenshots for all device types
4. Design feature graphic (1024x500)
5. Create app icon for store (512x512)
6. Set up store listing
7. Configure content rating
8. Set up pricing and distribution

---

### Task 10.3: Submit to TestFlight
**Status**: ⏸️ (Future)  
**Priority**: Low  
**Dependencies**: Task 10.1

**Steps**:
1. Create production iOS build
2. Submit using: `eas submit --platform ios --latest`
3. Wait for processing
4. Add beta testers
5. Distribute build
6. Gather feedback

---

### Task 10.4: Submit to Google Play Internal Track
**Status**: ⏸️ (Future)  
**Priority**: Low  
**Dependencies**: Task 10.2

**Steps**:
1. Create production Android build
2. Submit using: `eas submit --platform android --latest`
3. Configure internal testing track
4. Add testers
5. Distribute build
6. Gather feedback

---

## Summary

**Total Tasks**: 37
- Phase 1 (Prerequisites): 3 tasks
- Phase 2 (EAS Config): 3 tasks
- Phase 3 (Assets): 3 tasks
- Phase 4 (First Build): 4 tasks
- Phase 5 (Testing): 5 tasks
- Phase 6 (Advanced Builds): 2 tasks
- Phase 7 (Updates): 2 tasks
- Phase 8 (CI/CD): 4 tasks
- Phase 9 (Documentation): 3 tasks
- Phase 10 (Future): 4 tasks

**Critical Path**:
1. Task 1.1 → 1.2 → 2.1 → 2.2 → 2.3
2. Task 3.1 → 3.2 (parallel with Phase 2)
3. Task 4.1 → 4.3 → 5.1
4. Task 4.2 → 4.4 → 5.1
5. Phase 5 → Phase 6 → Phase 7 → Phase 8 → Phase 9

**Estimated Total Time**: 1-2 days for Phases 1-9

## Notes
- Tasks can be parallelized where dependencies allow
- Build times (15-20 minutes per platform) are mostly waiting
- Testing is the most time-consuming phase
- CI/CD setup is optional but highly recommended
- Phase 10 tasks are for future store submission
