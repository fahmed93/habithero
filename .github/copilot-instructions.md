# GitHub Copilot Instructions for HabitHero

## Project Overview

HabitHero is a cross-platform habit tracking application built with React Native and Expo. The app provides an intuitive interface for tracking daily habits, building streaks, and maintaining consistency across iOS, Android, and Web platforms.

## Development Workflow

### Specification-Driven Development with Spec-Kit

**IMPORTANT**: This project follows **Specification-Driven Development** using [GitHub Spec-Kit](https://github.com/github/spec-kit).

#### Planning and Implementation Process

1. **Create Specifications First**: Before implementing any feature, create or reference a specification in `.specify/specs/`
   - Each spec should define the feature requirements, user stories, and acceptance criteria
   - Follow the existing spec structure (see `.specify/specs/001-project-initialization` and `.specify/specs/002-habitkit-features` as examples)

2. **Use Spec-Kit for Planning**: 
   - All feature planning should be documented in the `.specify/` directory
   - Reference the project constitution (`.specify/memory/constitution.md`) for core principles
   - Check project overview (`.specify/memory/project-overview.md`) for architectural guidance

3. **Implementation Flow**:
   ```
   Specification → Planning → Implementation → Testing → Documentation Update
   ```

4. **Memory and Constitution**:
   - Consult `.specify/memory/constitution.md` for project principles and technology decisions
   - Update memory files when significant architectural decisions are made
   - Follow the core principles: User Experience First, Data Privacy, Cross-Platform Consistency, Code Quality, and Continuous Delivery

## Technology Stack

### Core Technologies
- **React Native**: Mobile framework with React Native Web support
- **TypeScript**: Type-safe development
- **Expo**: Cross-platform development and build tooling
- **React 19.1.0** and **React Native 0.81.5**

### State Management
- React Context API or Redux (as needed)
- AsyncStorage for local data persistence

### UI/Styling
- React Native UI components
- Support for both light and dark themes
- Responsive design for mobile and web

## Project Structure

```
habithero/
├── .github/              # GitHub Actions and configuration
│   ├── workflows/        # CI/CD workflows
│   └── copilot-instructions.md
├── .specify/             # Spec-kit documentation (ALWAYS USE FOR PLANNING)
│   ├── memory/          # Project memory and constitution
│   │   ├── constitution.md
│   │   ├── project-overview.md
│   │   └── setup-complete.md
│   └── specs/           # Feature specifications
│       ├── 001-project-initialization/
│       └── 002-habitkit-features/
├── assets/              # Images, fonts, and static assets
├── src/                 # Application source code
│   ├── components/      # Reusable React components
│   ├── hooks/          # Custom React hooks
│   ├── navigation/     # Navigation configuration
│   ├── screens/        # Screen components
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── App.tsx             # Main application component
├── index.ts            # Entry point
├── app.json            # Expo configuration
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Coding Standards

### TypeScript
- Always use TypeScript for type safety
- Define types in `src/types/` for reusable type definitions
- Avoid `any` type; use proper typing

### Component Structure
- Functional components with hooks
- Follow React best practices
- Keep components small and focused
- Place reusable components in `src/components/`
- Place screen-level components in `src/screens/`

### File Naming
- Use PascalCase for component files (e.g., `HabitCard.tsx`)
- Use camelCase for utility files (e.g., `dateHelpers.ts`)
- Use lowercase with hyphens for spec files (e.g., `feature-spec.md`)

### Code Style
- Clean, maintainable code
- Meaningful variable and function names
- Comments for complex logic only
- Follow existing patterns in the codebase

## Development Commands

### Running the App
```bash
npm start          # Start Expo development server
npm run web        # Run on web (localhost:8081)
npm run ios        # Run on iOS simulator (macOS only)
npm run android    # Run on Android emulator
```

### Building
```bash
npm run export:web  # Build optimized web version for production
npm run build:web   # Alternative build command
```

## Feature Implementation Guidelines

### Before Starting a Feature

1. **Check Spec-Kit Documentation**:
   - Review `.specify/specs/` for existing specifications
   - Check `.specify/memory/constitution.md` for alignment with project principles

2. **Create or Update Specification**:
   - If feature is new, create a spec in `.specify/specs/[feature-number]-[feature-name]/`
   - Document requirements, user stories, and technical approach

3. **Review Feature Parity**:
   - HabitHero aims for feature parity with HabitKit
   - Ensure new features align with the feature list in constitution.md

### During Implementation

1. **Follow Spec-Kit Process**: Always implement according to the specification
2. **Maintain Cross-Platform Compatibility**: Test on web, iOS, and Android
3. **Privacy First**: Ensure local-first data storage, no unnecessary data collection
4. **Component Reusability**: Create reusable components when applicable
5. **Type Safety**: Use TypeScript effectively throughout

### HabitKit Feature Parity

The following features should be implemented (see constitution.md):
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

## Data Privacy Principles

- **Local-First Storage**: Use AsyncStorage for all user data
- **No Cloud by Default**: Users control their data
- **Export/Import Functionality**: Enable data portability
- **Privacy-Focused Architecture**: No unnecessary data collection

## Deployment

### Automated Deployment
- GitHub Actions automatically deploys to GitHub Pages on merge to `main`
- Workflow builds the web version using `npm run export:web`
- The `dist` folder is deployed to the `gh-pages` branch
- Web version accessible at: https://fahmed93.github.io/habithero
- Deployment workflow: `.github/workflows/deploy.yml`

### Manual Deployment
```bash
npm run export:web  # Build the web version to dist/ folder
# GitHub Actions workflow automatically deploys dist/ to gh-pages branch on merge to main
```

## Testing Considerations

- Test on multiple platforms (web, iOS, Android) when possible
- Validate responsive design
- Check theme support (light/dark mode)
- Verify local data persistence
- Ensure cross-platform consistency

## Contributing Workflow

1. **Start with Spec-Kit**: Document the feature or change in `.specify/specs/`
2. **Follow the Constitution**: Align with principles in `.specify/memory/constitution.md`
3. **Implement with Types**: Use TypeScript throughout
4. **Test Cross-Platform**: Verify on web at minimum
5. **Document**: Update README or specs as needed
6. **Commit**: Write clear commit messages
7. **Deploy**: Merge to main for automatic deployment

## Key Reminders for Copilot

- ✅ **ALWAYS use spec-kit for planning and implementation**
- ✅ **Check `.specify/specs/` before starting any feature**
- ✅ **Reference `.specify/memory/constitution.md` for project principles**
- ✅ **Follow specification-driven development workflow**
- ✅ **Maintain TypeScript type safety**
- ✅ **Ensure cross-platform compatibility (iOS, Android, Web)**
- ✅ **Keep privacy-first approach with local data storage**
- ✅ **Follow existing project structure and conventions**
- ✅ **Test changes on web platform at minimum**

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [GitHub Spec-Kit](https://github.com/github/spec-kit)
- [HabitKit App](https://www.habitkit.app/) - Reference for feature parity

## Questions?

For questions about:
- **Architecture**: Check `.specify/memory/project-overview.md`
- **Principles**: Check `.specify/memory/constitution.md`
- **Features**: Check `.specify/specs/` directory
- **Setup**: Check README.md
