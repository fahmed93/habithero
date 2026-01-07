# Implementation Plan: 5-Day Habit Completion View

## Overview
This plan outlines the technical approach for adding a 5-day completion view to the main screen. The implementation will be done incrementally to ensure stability and maintainability.

## Approach
Enhance the existing HomeScreen and HabitCard components with a horizontal 5-day completion display. The approach focuses on:
1. **Minimal Changes**: Extend existing components rather than replacing them
2. **Reusable Components**: Create new, focused components for the 5-day view
3. **Existing Patterns**: Use established patterns from the codebase (context, hooks, styling)
4. **Progressive Enhancement**: Build incrementally, testing at each step

## Technical Design

### Architecture Overview
```
HomeScreen (updated)
├── Header (existing)
├── DateHeader (NEW - sticky header with 5 dates)
└── HabitList (enhanced)
    └── HabitCard (enhanced)
        ├── Habit Info (existing)
        └── CompletionRow (NEW - 5 day cells)
```

### Component Breakdown

#### 1. DateHeader Component
**File**: `src/components/DateHeader.tsx`

**Purpose**: Display a horizontal row of the last 5 dates with today highlighted

**Props**:
```typescript
interface DateHeaderProps {
  dates: Date[];        // Array of 5 dates
  todayIndex: number;   // Index of today in the dates array (should be 4)
}
```

**Responsibilities**:
- Render 5 date cells horizontally
- Format dates appropriately (e.g., "Mon 5", "Today")
- Highlight today's date with distinct styling
- Responsive layout (fixed width cells or flex distribution)
- Theme-aware styling

**Layout**:
- Flex row layout
- Equal width cells (20% each)
- Centered text
- Border or background for today
- Minimum height for touch targets

#### 2. CompletionRow Component
**File**: `src/components/CompletionRow.tsx`

**Purpose**: Display 5 completion cells for a single habit

**Props**:
```typescript
interface CompletionRowProps {
  habit: Habit;
  dates: Date[];
  completions: Map<string, boolean>;  // date string -> completed boolean
  onToggleCompletion: (date: Date) => void;
}
```

**Responsibilities**:
- Render 5 completion cells aligned with DateHeader
- Show completion status (filled vs outlined)
- Handle tap to toggle completion
- Provide haptic feedback on mobile
- Animate state changes
- Use habit color for styling

**Layout**:
- Flex row layout matching DateHeader
- Equal width cells (20% each)
- Circular or square indicators
- Touchable cells with minimum size
- Smooth transitions

#### 3. CompletionCell Component
**File**: `src/components/CompletionCell.tsx`

**Purpose**: Individual cell representing one day's completion status

**Props**:
```typescript
interface CompletionCellProps {
  completed: boolean;
  color: string;         // Habit color
  isToday: boolean;
  date: Date;
  onPress: () => void;
  disabled?: boolean;
}
```

**Responsibilities**:
- Render a single completion indicator
- Handle press events
- Visual feedback on press
- Animate completion toggle
- Accessibility labels

**Visual States**:
- Completed: Solid circle with habit color
- Incomplete: Outlined circle with habit color
- Today: Additional highlight/border
- Pressed: Scale animation

### Data Flow

#### Getting Last 5 Days
```typescript
// In HomeScreen or custom hook
const getLast5Days = (): Date[] => {
  const today = new Date();
  const days: Date[] = [];
  for (let i = 4; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    days.push(date);
  }
  return days;
};
```

#### Getting Completions for Dates
```typescript
// Using existing HabitContext
const { getCompletionForDate, toggleCompletion } = useHabits();

const completionsForDates = dates.map(date => ({
  date,
  completed: getCompletionForDate(habit.id, formatDate(date))
}));
```

#### Toggling Completion
```typescript
const handleToggleCompletion = (habitId: string, date: Date) => {
  const dateString = formatDate(date);
  toggleCompletion(habitId, dateString);
  // Haptic feedback
  if (Platform.OS !== 'web') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
};
```

### State Management

#### Existing Context Usage
- Use `HabitContext` for all habit and completion data
- No new context needed
- Leverage existing `toggleCompletion` function
- Use existing `getCompletionForDate` function

#### Local State
- Dates array computed once in HomeScreen
- Passed down to all child components
- No local completion state (use context only)

### Styling Strategy

#### Theme Integration
```typescript
// Use existing theme context
const { theme } = useTheme();

// Completion cell styling
const completionStyles = {
  completed: {
    backgroundColor: habitColor,
    borderColor: habitColor,
  },
  incomplete: {
    backgroundColor: 'transparent',
    borderColor: habitColor,
    borderWidth: 2,
  },
  today: {
    backgroundColor: theme.surface,
    borderWidth: 2,
    borderColor: theme.primary,
  }
};
```

#### Responsive Design
- Use `Dimensions` or percentage widths
- Ensure minimum touch target size (44x44)
- Horizontal scroll if needed on very small screens
- Fixed cell widths vs flex distribution

### Utility Functions

#### Date Utilities
**File**: `src/utils/date.ts` (extend existing)

```typescript
/**
 * Get an array of the last N days including today
 */
export const getLastNDays = (n: number = 5, today?: Date): Date[] => {
  const reference = today || new Date();
  const days: Date[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date(reference);
    date.setDate(reference.getDate() - i);
    days.push(date);
  }
  return days;
};

/**
 * Format date for display in header
 * Returns "Today" for today, "Mon 5" for other dates
 */
export const formatDayHeader = (date: Date, today: Date): string => {
  if (isToday(date, today)) {
    return 'Today';
  }
  const dayName = format(date, 'EEE'); // Mon, Tue, etc
  const dayNumber = format(date, 'd');  // 5, 6, etc
  return `${dayName} ${dayNumber}`;
};

/**
 * Get index of today in a date array
 */
export const getTodayIndex = (dates: Date[], today?: Date): number => {
  const reference = today || new Date();
  return dates.findIndex(date => isToday(date, reference));
};
```

## Implementation Phases

### Phase 1: Date Utilities (30 minutes)
**Goal**: Add date utility functions needed for 5-day view

**Tasks**:
1. Add `getLastNDays` function to `src/utils/date.ts`
2. Add `formatDayHeader` function
3. Add `getTodayIndex` helper function
4. Test utilities with various dates
5. Handle edge cases (month boundaries, etc.)

**Validation**:
- Functions return correct dates
- Today is always the last element
- Date formatting is correct

### Phase 2: CompletionCell Component (1 hour)
**Goal**: Create the individual completion cell component

**Tasks**:
1. Create `src/components/CompletionCell.tsx`
2. Implement basic rendering (circle/square)
3. Add completed vs incomplete states
4. Add press handler with haptic feedback
5. Add today highlighting
6. Add animation on press
7. Style for light and dark themes
8. Add accessibility labels
9. Test on mobile and web

**Validation**:
- Cell renders correctly in both states
- Press handler works
- Haptic feedback on mobile
- Animation is smooth
- Accessible to screen readers

### Phase 3: CompletionRow Component (1 hour)
**Goal**: Create the row of 5 completion cells

**Tasks**:
1. Create `src/components/CompletionRow.tsx`
2. Render 5 CompletionCell components
3. Map dates to completion status
4. Handle toggle callbacks
5. Ensure alignment matches header width
6. Test with different habit colors
7. Test with various completion patterns
8. Responsive layout testing

**Validation**:
- All 5 cells render correctly
- Cells align properly
- Toggling works for all cells
- Different habit colors display correctly

### Phase 4: DateHeader Component (1 hour)
**Goal**: Create the shared date header

**Tasks**:
1. Create `src/components/DateHeader.tsx`
2. Render 5 date cells horizontally
3. Format dates using utility function
4. Highlight today's date
5. Match cell widths with CompletionRow
6. Make it sticky (optional)
7. Style for light and dark themes
8. Test responsive behavior

**Validation**:
- Header displays all 5 dates
- Today is highlighted
- Formatting is correct
- Aligns with completion rows below

### Phase 5: HabitCard Integration (1 hour)
**Goal**: Add CompletionRow to existing HabitCard

**Tasks**:
1. Update `src/components/HabitCard.tsx`
2. Add CompletionRow below habit info
3. Pass necessary props (habit, dates, completions)
4. Handle completion toggle events
5. Maintain existing functionality
6. Test layout with new row
7. Ensure card height adjusts appropriately
8. Test with existing quick toggle

**Validation**:
- Card displays completion row
- Existing features still work
- Layout is not broken
- Quick toggle for today still works

### Phase 6: HomeScreen Integration (1 hour)
**Goal**: Add DateHeader to HomeScreen

**Tasks**:
1. Update `src/screens/HomeScreen.tsx`
2. Calculate last 5 days
3. Add DateHeader above HabitList
4. Pass dates to HabitList and cards
5. Test sticky header behavior
6. Ensure scrolling works correctly
7. Test with no habits (empty state)
8. Test with many habits

**Validation**:
- Header displays above habit list
- Dates are correct
- Scrolling works smoothly
- Header stays visible (if sticky)

### Phase 7: Polish & Testing (1 hour)
**Goal**: Refine implementation and test thoroughly

**Tasks**:
1. Test on iOS simulator/device
2. Test on Android emulator/device
3. Test on web browser
4. Test light and dark themes
5. Test various screen sizes
6. Test edge cases (no completions, all completed, etc.)
7. Verify accessibility
8. Add loading states if needed
9. Performance testing with many habits
10. Final UI polish (spacing, colors, etc.)

**Validation**:
- Works on all platforms
- Responsive on all screen sizes
- No performance issues
- Accessible
- Visually polished

## Technical Considerations

### Performance Optimization
1. **Memoization**: Use `React.memo` for CompletionCell to prevent unnecessary re-renders
2. **Flat List**: Ensure FlatList still performs well with enhanced cards
3. **Date Calculation**: Calculate dates once at HomeScreen level
4. **Completion Lookup**: Use Map for O(1) completion lookups

### Accessibility
1. **Labels**: Add descriptive accessibility labels
   - "Mark January 5 as completed"
   - "January 5, completed"
2. **Touch Targets**: Ensure minimum 44x44 points
3. **Screen Reader**: Test with VoiceOver/TalkBack
4. **Keyboard Nav**: Support tab navigation on web

### Error Handling
1. **Invalid Dates**: Validate date calculations
2. **Missing Data**: Handle missing completions gracefully
3. **Storage Errors**: Catch and report storage failures
4. **Theme Errors**: Fallback if theme context unavailable

### Platform Differences
1. **Haptics**: Only on mobile (iOS/Android)
2. **Touch vs Click**: Handle both appropriately
3. **Hover States**: Add for web only
4. **Scroll Behavior**: Test platform-specific scrolling

## Testing Strategy

### Unit Testing (if applicable)
- Date utility functions
- Completion status logic
- Date formatting

### Component Testing
- CompletionCell renders correctly
- CompletionRow handles all states
- DateHeader displays dates correctly

### Integration Testing
- HabitCard with CompletionRow works
- HomeScreen with DateHeader works
- Completion toggling saves to context
- Data persists across app restarts

### Manual Testing Checklist
- [ ] Create a new habit
- [ ] Mark various days as complete using 5-day view
- [ ] Verify completion shows in detail screen
- [ ] Toggle completion on and off
- [ ] Test today's cell specifically
- [ ] Test with multiple habits
- [ ] Test with no habits
- [ ] Restart app and verify data persists
- [ ] Test light theme
- [ ] Test dark theme
- [ ] Test on small screen (iPhone SE)
- [ ] Test on large screen (iPad)
- [ ] Test on web browser
- [ ] Test with screen reader
- [ ] Test scrolling behavior
- [ ] Test haptic feedback (mobile)

## Risks & Mitigations

### Risk 1: Layout Issues on Small Screens
**Mitigation**: 
- Use minimum width for cells
- Add horizontal scroll if needed
- Test early on smallest supported device

### Risk 2: Performance with Many Habits
**Mitigation**:
- Use FlatList's existing optimizations
- Memoize components
- Optimize completion lookups
- Profile performance

### Risk 3: Confusion with Quick Toggle
**Mitigation**:
- Keep quick toggle in its current position
- Make 5-day view visually distinct
- User testing to validate clarity

### Risk 4: Date Calculation Errors
**Mitigation**:
- Thorough testing of date utilities
- Test month/year boundaries
- Test timezone handling
- Add error boundaries

## Success Criteria

Implementation is complete when:
- ✓ DateHeader displays last 5 days with today on right
- ✓ Each habit shows 5 completion cells
- ✓ Cells can be toggled with one tap
- ✓ Today is visually distinct
- ✓ Completions persist to storage
- ✓ Works on iOS, Android, and Web
- ✓ Responsive on all screen sizes
- ✓ Supports light and dark themes
- ✓ Accessible to screen readers
- ✓ No performance degradation
- ✓ All acceptance criteria from spec are met

## Future Enhancements (Out of Scope)

- Customizable number of days (5, 7, or 14)
- Swipe gestures for bulk completion
- Weekly aggregation view
- Comparison mode (compare habits)
- Export 5-day view as image
- Streak visualization within 5-day view
- Tap to add notes/context to completion
- Color intensity based on completion time

## Dependencies

### Required
- Existing HabitContext (✓ available)
- Existing ThemeContext (✓ available)
- Existing date utilities (✓ available, will extend)
- Existing HabitCompletion model (✓ available)
- expo-haptics (check if installed)

### Optional
- React Native Reanimated (for advanced animations)
- Gesture Handler (for swipe actions - future)

## Estimated Timeline

- **Phase 1**: Date Utilities - 30 minutes
- **Phase 2**: CompletionCell Component - 1 hour
- **Phase 3**: CompletionRow Component - 1 hour
- **Phase 4**: DateHeader Component - 1 hour
- **Phase 5**: HabitCard Integration - 1 hour
- **Phase 6**: HomeScreen Integration - 1 hour
- **Phase 7**: Polish & Testing - 1 hour

**Total Estimated Time**: 6.5 hours

This includes development, testing, and refinement. Actual time may vary based on complexity of issues encountered.
