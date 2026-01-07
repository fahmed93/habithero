# HabitHero Project Constitution

## Mission
Build a cross-platform mobile habit tracker app (iOS & Android) using React Native that provides all the features of HabitKit, with automatic deployment to GitHub Pages.

## Core Principles

### 1. User Experience First
- Intuitive, visually appealing interface
- Smooth animations and transitions
- Responsive design that works on all screen sizes
- Dark and light theme support

### 2. Data Privacy & Ownership
- User data stored locally by default
- Export/import functionality for data portability
- No unnecessary data collection
- Privacy-focused architecture

### 3. Cross-Platform Consistency
- Consistent behavior across iOS and Android
- Native feel on each platform
- Shared codebase with platform-specific optimizations

### 4. Code Quality
- Clean, maintainable code
- Component-based architecture
- TypeScript for type safety
- Comprehensive testing where applicable

### 5. Continuous Delivery
- Automated builds and deployments
- GitHub Actions for CI/CD
- Deployment to GitHub Pages on every merge to main

## Technology Stack

### Core
- React Native (with React Native Web support)
- TypeScript
- Expo (for easier cross-platform development)

### State Management
- React Context API or Redux (as needed)
- AsyncStorage for local persistence

### UI/Styling
- React Native UI libraries (React Native Paper or similar)
- Styled Components or similar for theming

### Build & Deployment
- GitHub Actions for CI/CD
- GitHub Pages for web deployment
- Expo EAS for mobile builds (future)

## Development Workflow

1. **Specification**: All features start with a specification document
2. **Planning**: Technical approach documented before implementation
3. **Implementation**: Code follows specs and plans
4. **Testing**: Changes validated before merge
5. **Deployment**: Automatic deployment on merge to main

## Feature Parity with HabitKit

The app must include:
1. Grid-based progress visualization (GitHub-style contribution graph)
2. Flexible habit goals (daily, weekly, monthly)
3. Habit customization (names, icons, colors)
4. Smart reminders and notifications
5. Calendar view for tracking
6. Streak tracking and motivation
7. Habit archiving and restore
8. Data export/import
9. Multiple themes
10. Responsive web version
