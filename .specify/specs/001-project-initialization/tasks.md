# Tasks: Project Initialization

This document contains the structured task breakdown for implementing the HabitHero Project Initialization specification (001).

## Task Summary

- **Total Tasks**: 16
- **Setup Phase**: 2 tasks
- **Implementation Phase**: 11 tasks
- **Validation Phase**: 3 tasks
- **Parallel Opportunities**: Tasks T003-T005, T007-T009 can be executed in parallel

## Phase 1: Setup (T001-T002)

### T001: Initialize Expo Project with TypeScript
**Priority**: P0 (Blocker)  
**Dependencies**: None  
**Estimated Effort**: 30 minutes

**Description**: Initialize a new React Native project using Expo with TypeScript template.

**Acceptance Criteria**:
- Project created with `expo-template-blank-typescript`
- TypeScript configuration present (tsconfig.json)
- Basic app structure exists
- Project can run with `expo start`

**Implementation Notes**:
- Command: `npx create-expo-app@latest . --template expo-template-blank-typescript`
- Verify TypeScript files compile without errors

---

### T002: Verify Initial Project Structure
**Priority**: P0 (Blocker)  
**Dependencies**: T001  
**Estimated Effort**: 15 minutes

**Description**: Verify that the Expo project is properly initialized and can run on web.

**Acceptance Criteria**:
- Development server starts successfully
- App loads in web browser
- No console errors
- React Native Web is working

**Implementation Notes**:
- Test with: `npx expo start --web`
- Verify at http://localhost:8081

---

## Phase 2: Project Structure Setup (T003-T006)

### T003: Create Source Directory Structure
**Priority**: P0 (Blocker)  
**Dependencies**: T002  
**Estimated Effort**: 20 minutes

**Description**: Organize project into proper folder structure following React Native best practices.

**Acceptance Criteria**:
- `src/` directory created
- Subdirectories: `components/`, `screens/`, `navigation/`, `hooks/`, `utils/`, `types/`
- README.md files added to empty directories
- App.tsx remains at root (per Expo convention; differs from spec.md structure diagram)

**Implementation Notes**:
- Create directory structure for organized code
- Add placeholder README.md files to document purpose of each directory
- Note: Expo requires App.tsx at project root, not in src/

---

### T004: Create TypeScript Type Definitions
**Priority**: P1 (High)  
**Dependencies**: T003  
**Estimated Effort**: 15 minutes  
**Parallel with**: T005

**Description**: Set up TypeScript type definitions structure.

**Acceptance Criteria**:
- `src/types/index.ts` file created
- Basic type exports defined
- TypeScript compilation succeeds

**Implementation Notes**:
- Create base type definitions file
- Export types for future use

---

### T005: Create Initial HomeScreen Component
**Priority**: P1 (High)  
**Dependencies**: T003  
**Estimated Effort**: 20 minutes  
**Parallel with**: T004

**Description**: Create a basic home screen component to replace the default App.tsx content.

**Acceptance Criteria**:
- `src/screens/HomeScreen.tsx` created
- Component renders with welcome message
- Proper TypeScript types used
- Component exported and usable

**Implementation Notes**:
- Follow React Native component patterns
- Use functional component with TypeScript

---

### T006: Update App.tsx to Use Organized Structure
**Priority**: P1 (High)  
**Dependencies**: T004, T005  
**Estimated Effort**: 15 minutes

**Description**: Update main App.tsx to import and use the HomeScreen component.

**Acceptance Criteria**:
- App.tsx imports HomeScreen
- App renders HomeScreen component
- App still works on web
- No TypeScript errors

---

## Phase 3: Build Configuration (T007-T010)

### T007: Configure Web Build Settings
**Priority**: P0 (Blocker)  
**Dependencies**: T002  
**Estimated Effort**: 20 minutes  
**Parallel with**: T008, T009

**Description**: Configure Expo for web builds and GitHub Pages deployment.

**Acceptance Criteria**:
- `app.json` configured with web settings
- Homepage URL set in package.json
- Web build scripts added to package.json
- Build configuration complete

**Implementation Notes**:
- Set homepage to `https://fahmed93.github.io/habithero`
- Add `export:web` script

---

### T008: Test Local Web Build
**Priority**: P0 (Blocker)  
**Dependencies**: T007  
**Estimated Effort**: 15 minutes  
**Parallel with**: T009

**Description**: Run a local production build to verify web export works.

**Acceptance Criteria**:
- `expo export:web` command succeeds
- `dist` folder created with static files
- Build has no errors
- Static files can be served locally

**Implementation Notes**:
- Command: `npx expo export:web`
- Verify output in `dist/` folder

---

### T009: Add Build Scripts to package.json
**Priority**: P1 (High)  
**Dependencies**: T002  
**Estimated Effort**: 10 minutes  
**Parallel with**: T007, T008

**Description**: Add convenience scripts for building and development.

**Acceptance Criteria**:
- Scripts added: `build:web`, `export:web`
- All scripts documented
- Scripts execute successfully

---

### T010: Configure Metro Bundler
**Priority**: P2 (Medium)  
**Dependencies**: T007  
**Estimated Effort**: 15 minutes

**Description**: Ensure Metro bundler is properly configured for cross-platform builds.

**Acceptance Criteria**:
- Metro config supports web platform
- No bundler warnings or errors
- Assets load correctly

**Implementation Notes**:
- Expo handles most Metro configuration by default
- Verify default settings are sufficient

---

## Phase 4: GitHub Actions & Deployment (T011-T013)

### T011: Create GitHub Actions Workflow File
**Priority**: P0 (Blocker)  
**Dependencies**: T006, T008, T009  
**Estimated Effort**: 30 minutes

**Description**: Create GitHub Actions workflow for automated deployment to GitHub Pages.

**Acceptance Criteria**:
- `.github/workflows/deploy.yml` file created
- Workflow triggers on push to main branch
- Workflow builds web version
- Workflow deploys to gh-pages branch
- Proper Node.js version specified

**Implementation Notes**:
- Use actions/checkout@v4
- Use actions/setup-node@v4 with Node.js 20
- Use actions/upload-pages-artifact@v3
- Use actions/deploy-pages@v4
- Build command: `npm run export:web`

---

### T012: Configure GitHub Pages Settings
**Priority**: P0 (Blocker)  
**Dependencies**: T011  
**Estimated Effort**: 10 minutes

**Description**: Document GitHub Pages configuration requirements.

**Acceptance Criteria**:
- Instructions documented for enabling GitHub Pages
- Source branch configuration specified
- Custom domain settings (if applicable)

**Implementation Notes**:
- GitHub Pages should serve from GitHub Actions deployment
- URL: https://fahmed93.github.io/habithero

---

### T013: Test GitHub Actions Deployment
**Priority**: P0 (Blocker)  
**Dependencies**: T011, T012  
**Estimated Effort**: 20 minutes

**Description**: Test the complete deployment pipeline.

**Acceptance Criteria**:
- Commit triggers GitHub Actions workflow
- Workflow executes without errors
- Site deploys to GitHub Pages
- Site is accessible at https://fahmed93.github.io/habithero
- No broken links or missing assets

---

## Phase 5: Documentation & Validation (T014-T016)

### T014: Create Comprehensive README
**Priority**: P1 (High)  
**Dependencies**: T013  
**Estimated Effort**: 30 minutes

**Description**: Update README.md with complete project documentation.

**Acceptance Criteria**:
- Project description included
- Setup instructions complete
- Development commands documented
- Build and deployment process explained
- Project structure documented
- Links to live demo work

**Implementation Notes**:
- Follow standard README structure
- Include badges for build status
- Add troubleshooting section

---

### T015: Verify All Acceptance Criteria Met
**Priority**: P0 (Blocker)  
**Dependencies**: T014  
**Estimated Effort**: 30 minutes

**Description**: Systematically verify all acceptance criteria from spec.md are met.

**Acceptance Criteria**:
- All 6 acceptance criteria from spec verified:
  1. React Native project initialized with Expo and TypeScript
  2. Project structure follows best practices
  3. App runs successfully on web browser
  4. GitHub Actions workflow builds and deploys
  5. Web app accessible at fahmed93.github.io/habithero
  6. README.md includes setup and build instructions

**Implementation Notes**:
- Create checklist and verify each item
- Test all documented commands
- Verify live site functionality

---

### T016: Final End-to-End Test
**Priority**: P0 (Blocker)  
**Dependencies**: T015  
**Estimated Effort**: 20 minutes

**Description**: Perform final end-to-end testing of the entire setup.

**Acceptance Criteria**:
- Fresh clone works: `git clone && npm install && npm start`
- Web development server works
- Production build works
- Deployment pipeline works
- Live site loads correctly
- All scripts in package.json execute successfully

---

## Dependency Graph

```
T001 (Init Expo)
  └─> T002 (Verify Initial Setup)
       ├─> T003 (Directory Structure)
       │    ├─> T004 (Type Definitions) ─┐
       │    └─> T005 (HomeScreen)       ─┼─> T006 (Update App.tsx)
       │                                  │
       ├─> T007 (Web Build Config) ──────┤
       │    ├─> T008 (Test Build)        │
       │    └─> T010 (Metro Config)      │
       │                                  │
       └─> T009 (Build Scripts) ─────────┤
                                          │
         T006, T008, T009 ───────────────┤
                                          │
                                          v
                                   T011 (GitHub Actions)
                                          │
                                          v
                                   T012 (Pages Config)
                                          │
                                          v
                                   T013 (Test Deployment)
                                          │
                                          v
                                   T014 (README)
                                          │
                                          v
                                   T015 (Verify Criteria)
                                          │
                                          v
                                   T016 (E2E Test)
```

## Implementation Notes

### Test-Driven Development
- Write tests alongside implementation where applicable
- Verify functionality at each step
- Use manual testing for UI components

### Parallel Execution Opportunities
- **Group 1** (After T003): T004, T005 can run in parallel
- **Group 2** (After T002): T007, T009 can run in parallel
- T008 can start immediately after T007

### Risk Mitigation
- Test web builds early (T008) to catch configuration issues
- Verify deployment pipeline before final documentation (T013)
- Keep tasks small and testable

### Definition of Done
- Code follows TypeScript best practices
- No console errors or warnings
- All scripts in package.json execute successfully
- Documentation is complete and accurate
- Changes are committed with clear commit messages
- Live site is functional and accessible

## MVP Scope Recommendation

**Minimum Viable Product** includes tasks T001-T013:
- Complete project setup
- Working web deployment
- Automated CI/CD pipeline

**Post-MVP** includes tasks T014-T016:
- Comprehensive documentation
- Validation and testing
- Polish and refinement

This allows the core functionality to be delivered quickly while documentation and validation can be completed afterward.
