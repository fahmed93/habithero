# Implementation Plan: HabitKit Features

## Overview
This plan outlines the technical approach for implementing all core features from HabitKit in HabitHero. The implementation will be done in phases to ensure stability and maintainability, with each phase building on the previous one.

## Approach
Build a feature-complete habit tracking application using React Native and Expo, with a focus on:
1. **Local-first architecture**: All data stored locally with export/import capabilities
2. **Component-based design**: Reusable, testable components
3. **Context-based state management**: React Context API for global state
4. **Progressive enhancement**: Start with core features, add advanced features incrementally

## Technical Stack

### Required Dependencies
```json
{
  "dependencies": {
    "@react-native-async-storage/async-storage": "^2.1.0",
    "@react-navigation/native": "^7.0.15",
    "@react-navigation/bottom-tabs": "^7.0.15",
    "@react-navigation/stack": "^7.1.7",
    "react-native-safe-area-context": "^5.2.0",
    "react-native-screens": "~4.4.1",
    "date-fns": "^4.1.0",
    "expo-notifications": "~1.0.3",
    "expo-haptics": "~14.0.5",
    "expo-system-ui": "~4.0.7",
    "@expo/vector-icons": "^15.0.4"
  }
}
```

### State Management Architecture
```
Context Providers:
├── HabitProvider (manages habits and completions)
├── ThemeProvider (manages theme state)
└── SettingsProvider (manages app settings)

Custom Hooks:
├── useHabits() - CRUD operations for habits
├── useCompletions() - Track habit completions
├── useStreaks() - Calculate streaks
├── useStatistics() - Calculate statistics
└── useStorage() - Handle data persistence
```

## Phase 1: Core Data Layer & State Management

### 1.1 Update Type Definitions
**File**: `src/types/index.ts`

Implement complete type definitions matching the spec:
```typescript
interface Habit {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  targetPerWeek?: number;
  targetPerMonth?: number;
  createdAt: Date;
  archived: boolean;
  reminder?: {
    enabled: boolean;
    time: string;
    days?: number[];
  };
}

interface HabitCompletion {
  habitId: string;
  date: string; // YYYY-MM-DD format
  completed: boolean;
}
```

### 1.2 Create Storage Utilities
**File**: `src/utils/storage.ts`

Implement AsyncStorage wrapper with:
- `saveHabits(habits: Habit[]): Promise<void>`
- `loadHabits(): Promise<Habit[]>`
- `saveCompletions(completions: HabitCompletion[]): Promise<void>`
- `loadCompletions(): Promise<HabitCompletion[]>`
- `exportData(): Promise<string>` - Export to JSON
- `importData(jsonString: string): Promise<void>` - Import from JSON

### 1.3 Create Date Utilities
**File**: `src/utils/date.ts`

Helper functions using date-fns:
- `formatDate(date: Date): string` - YYYY-MM-DD format
- `isToday(date: Date): boolean`
- `getDaysInRange(start: Date, end: Date): Date[]`
- `getWeekStart(date: Date): Date`
- `getMonthStart(date: Date): Date`

### 1.4 Create Habit Context Provider
**File**: `src/contexts/HabitContext.tsx`

Global state management for:
- Habits list (active and archived)
- Completions map
- CRUD operations
- Filtering and sorting

## Phase 2: Core UI Components

### 2.1 Create Base Components
**Files**: `src/components/`

#### HabitCard.tsx
- Display habit info (name, icon, color)
- Show completion status for today
- Quick toggle button
- Press to view details

#### HabitList.tsx
- Scrollable list of habits
- Filter active/archived
- Empty state
- Pull to refresh

#### Button.tsx
- Primary, secondary, danger variants
- Loading state
- Disabled state
- Icon support

#### IconPicker.tsx
- Grid of available icons
- Search/filter functionality
- Selected state

#### ColorPicker.tsx
- Color palette display
- Selected indicator
- Preset colors

### 2.2 Create Input Components
**Files**: `src/components/`

#### TextInput.tsx
- Styled text input
- Label and error message
- Character count (optional)

#### Select.tsx
- Dropdown/picker for frequency selection
- Native platform pickers

#### Switch.tsx
- Toggle switch with label
- Themed styling

## Phase 3: Habit Management Screens

### 3.1 Home Screen
**File**: `src/screens/HomeScreen.tsx`

Main screen showing:
- Header with date and greeting
- List of active habits
- Quick completion toggles
- FAB (Floating Action Button) to add habit
- Navigation to calendar and settings

### 3.2 Add/Edit Habit Screen
**File**: `src/screens/HabitFormScreen.tsx`

Form with:
- Name input (required)
- Description input (optional)
- Icon picker
- Color picker
- Frequency selector (daily/weekly/monthly)
- Target goals (for weekly/monthly)
- Reminder configuration
- Save/Cancel buttons

### 3.3 Habit Detail Screen
**File**: `src/screens/HabitDetailScreen.tsx`

Detailed view showing:
- Habit info
- Quick toggle for today
- Grid visualization (12 weeks)
- Statistics card
- Edit and Delete buttons
- Archive/Unarchive option

## Phase 4: Visualization Components

### 4.1 Habit Grid Component
**File**: `src/components/HabitGrid.tsx`

GitHub-style contribution grid:
- 12 weeks of history (84 days)
- Color intensity based on completion
- Tap cells to see details
- Legend showing color scale
- Responsive layout

Implementation:
- Use `date-fns` to generate date range
- Map completions to grid cells
- Calculate color intensity
- Handle touch interactions

### 4.2 Calendar View Component
**File**: `src/components/Calendar.tsx`

Monthly calendar:
- Month navigation (previous/next)
- Day cells with completion indicators
- Tap to toggle completion
- Current day highlight
- Weekend differentiation

### 4.3 Statistics Card
**File**: `src/components/StatisticsCard.tsx`

Display metrics:
- Total completions
- Current streak
- Longest streak
- Completion rate (%)
- Last 30 days summary
- Weekly average

## Phase 5: Advanced Features

### 5.1 Streak Calculation
**File**: `src/utils/streaks.ts`

Functions to calculate:
- `getCurrentStreak(habit: Habit, completions: HabitCompletion[]): number`
- `getLongestStreak(habit: Habit, completions: HabitCompletion[]): number`
- Handle different frequencies (daily, weekly, monthly)
- Account for goal targets

### 5.2 Reminder System
**File**: `src/utils/notifications.ts`

Using expo-notifications:
- Request notification permissions
- Schedule daily reminders
- Handle day-specific reminders
- Cancel/update reminders
- Handle notification taps

### 5.3 Theme System
**File**: `src/contexts/ThemeContext.tsx`

Theme provider with:
- Light theme colors
- Dark theme colors
- System preference detection
- Theme toggle function
- Persist theme preference

Theme colors:
```typescript
interface Theme {
  background: string;
  surface: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  error: string;
}
```

### 5.4 Archive Management
**File**: `src/screens/ArchivedScreen.tsx`

Screen showing:
- List of archived habits
- Unarchive action
- Permanently delete option
- Empty state

## Phase 6: Data Management

### 6.1 Export/Import Screen
**File**: `src/screens/DataManagementScreen.tsx`

Features:
- Export button (generates JSON file)
- Import button (file picker)
- Data preview
- Confirmation dialogs
- Error handling

Implementation:
- Use expo-document-picker for imports
- Use expo-sharing for exports
- Validate imported data structure
- Handle merge conflicts

### 6.2 Settings Screen
**File**: `src/screens/SettingsScreen.tsx`

Settings options:
- Theme selection
- Default notification time
- App version info
- Data management link
- About/Help

## Phase 7: Navigation Setup

### 7.1 Navigation Structure
**File**: `src/navigation/AppNavigator.tsx`

```
Bottom Tab Navigator:
├── Home Tab
│   └── Stack Navigator
│       ├── HomeScreen
│       ├── HabitDetailScreen
│       └── HabitFormScreen
├── Calendar Tab
│   └── CalendarScreen
├── Statistics Tab
│   └── StatisticsScreen
└── Settings Tab
    └── Stack Navigator
        ├── SettingsScreen
        ├── DataManagementScreen
        └── ArchivedScreen
```

## Implementation Steps

### Phase 1: Foundation (Days 1-2)
1. Install required dependencies
2. Update type definitions
3. Create storage utilities
4. Create date utilities
5. Set up Habit Context
6. Set up Theme Context
7. Test storage and contexts

### Phase 2: Core Components (Days 3-4)
1. Create base UI components (Button, TextInput, etc.)
2. Create IconPicker and ColorPicker
3. Create HabitCard component
4. Create HabitList component
5. Test components in isolation

### Phase 3: Habit Management (Days 5-7)
1. Update HomeScreen with HabitList
2. Create HabitFormScreen
3. Implement CRUD operations
4. Add FAB to HomeScreen
5. Create HabitDetailScreen
6. Implement archive functionality
7. Test habit creation and editing

### Phase 4: Visualization (Days 8-10)
1. Create HabitGrid component
2. Implement grid data calculation
3. Create Calendar component
4. Implement month navigation
5. Create StatisticsCard component
6. Test visualizations with sample data

### Phase 5: Advanced Features (Days 11-13)
1. Implement streak calculation logic
2. Set up notification system
3. Implement reminder scheduling
4. Test notifications on device
5. Implement theme switching
6. Add archive screen

### Phase 6: Navigation & Polish (Days 14-15)
1. Set up React Navigation
2. Create tab navigator
3. Connect all screens
4. Implement data export/import
5. Create settings screen
6. Add loading states and error handling

### Phase 7: Testing & Refinement (Days 16-17)
1. Test on iOS simulator
2. Test on Android emulator
3. Test on web browser
4. Fix responsive design issues
5. Test data persistence
6. Test export/import functionality
7. Performance optimization

### Phase 8: Documentation & Deployment (Day 18)
1. Update README with features
2. Create user guide
3. Test GitHub Pages deployment
4. Final QA pass
5. Tag release

## Testing Strategy

### Unit Tests (if time permits)
- Storage utilities
- Date utilities
- Streak calculation
- Statistics calculation

### Integration Tests
- Habit CRUD operations
- Completion tracking
- Data export/import

### Manual Testing
- Create, edit, delete habits
- Mark habits complete
- View grid and calendar
- Test notifications
- Test theme switching
- Test on multiple platforms
- Test data persistence
- Test edge cases (no habits, many habits, etc.)

## Performance Considerations

1. **Lazy Loading**: Load only visible components
2. **Memoization**: Use React.memo for expensive components
3. **Virtual Lists**: Use FlatList for long habit lists
4. **Debouncing**: Debounce search and filter operations
5. **Storage Optimization**: Batch storage operations
6. **Image Optimization**: Use appropriate icon sizes

## Accessibility Considerations

1. **Screen Reader Support**: Add accessibility labels
2. **Touch Targets**: Minimum 44x44 points
3. **Color Contrast**: Meet WCAG AA standards
4. **Keyboard Navigation**: Support for web version
5. **Focus Management**: Proper focus order

## Risk Mitigation

### Potential Risks
1. **Notification Permissions**: Users may deny
   - Mitigation: Gracefully handle denied permissions, allow manual re-request
   
2. **Data Loss**: Storage failures
   - Mitigation: Implement data validation and error handling
   
3. **Performance**: Large datasets
   - Mitigation: Implement pagination and virtualization
   
4. **Cross-Platform Issues**: Platform-specific bugs
   - Mitigation: Test early and often on all platforms

## Success Criteria

The implementation is complete when:
- ✓ All CRUD operations for habits work
- ✓ Users can mark habits complete for any day
- ✓ Grid visualization shows last 12 weeks
- ✓ Streak calculation works correctly
- ✓ Data persists across app restarts
- ✓ Export/import functionality works
- ✓ Notifications can be scheduled
- ✓ Theme switching works
- ✓ App works on iOS, Android, and Web
- ✓ All acceptance criteria from spec are met

## Future Enhancements (Out of Current Scope)
- Cloud sync with Firebase
- Social features (share achievements)
- Advanced analytics and insights
- Habit categories and tags
- Widget support for iOS/Android
- Apple Watch and Android Wear apps
- Multiple habit views (list, grid, timeline)
