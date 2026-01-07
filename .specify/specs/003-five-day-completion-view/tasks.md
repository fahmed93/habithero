# Implementation Tasks: 5-Day Habit Completion View

## Overview
This document breaks down the implementation of the 5-day completion view into concrete, actionable tasks organized by phase.

## Phase 1: Date Utilities Extension

### Task 1.1: Add getLastNDays Function
- [ ] Open `src/utils/date.ts`
- [ ] Add `getLastNDays(n: number = 5, today?: Date): Date[]` function
- [ ] Implement loop to generate last N days
- [ ] Ensure dates are in chronological order (oldest first, newest last)
- [ ] Handle optional today parameter for testing
- [ ] Test with n=5, verify today is last element
- [ ] Test with different reference dates
- [ ] Test month boundary cases (e.g., spanning from previous month)
- [ ] Test year boundary cases (e.g., December 31 to January)
- [ ] Export function

**Validation**:
- Function returns exactly N dates
- Today is always the last date in the array
- Dates are consecutive days
- Works across month and year boundaries

### Task 1.2: Add formatDayHeader Function
- [ ] Add `formatDayHeader(date: Date, today: Date): string` function
- [ ] Import necessary date-fns functions (format)
- [ ] Implement logic: return "Today" if date equals today
- [ ] For other dates, return format like "Mon 5" (day name + day number)
- [ ] Use date-fns `format` with 'EEE d' pattern
- [ ] Handle edge cases (invalid dates, null dates)
- [ ] Test with today's date (should return "Today")
- [ ] Test with past dates (should return formatted string)
- [ ] Test with dates in different months
- [ ] Export function

**Validation**:
- Returns "Today" for current day
- Returns correct format for other days
- Handles various dates correctly
- Format is concise and readable

### Task 1.3: Add getTodayIndex Helper Function
- [ ] Add `getTodayIndex(dates: Date[], today?: Date): number` function
- [ ] Use existing `isToday` function for comparison
- [ ] Return index of today in the dates array
- [ ] Return -1 if today is not found
- [ ] Test with array where today is last element
- [ ] Test with array where today is in middle
- [ ] Test with array where today is not present
- [ ] Export function

**Validation**:
- Returns correct index for today
- Returns -1 when today not in array
- Works with optional today parameter

## Phase 2: CompletionCell Component

### Task 2.1: Create CompletionCell Component File
- [ ] Create `src/components/CompletionCell.tsx`
- [ ] Add TypeScript interface for props:
  ```typescript
  interface CompletionCellProps {
    completed: boolean;
    color: string;
    isToday: boolean;
    date: Date;
    onPress: () => void;
    disabled?: boolean;
  }
  ```
- [ ] Import necessary React Native components (View, TouchableOpacity, StyleSheet)
- [ ] Import theme context
- [ ] Set up component skeleton

### Task 2.2: Implement Cell Rendering
- [ ] Create circular or square indicator
- [ ] Set appropriate size (at least 36x36 to allow 44x44 touch target)
- [ ] Implement completed state styling:
  - Solid background with habit color
  - No border or subtle border
- [ ] Implement incomplete state styling:
  - Transparent background
  - Border with habit color (2px)
- [ ] Implement today highlight:
  - Additional border or background highlight
  - Distinct from regular cells
- [ ] Make cell themeable (use theme colors)

### Task 2.3: Add Interaction Handling
- [ ] Wrap indicator in TouchableOpacity
- [ ] Set minimum touch target size (44x44 using hitSlop if needed)
- [ ] Add onPress handler that calls props.onPress
- [ ] Add disabled state handling (if disabled, don't call onPress)
- [ ] Add activeOpacity for visual feedback
- [ ] Test press detection on all platforms

### Task 2.4: Add Haptic Feedback
- [ ] Import expo-haptics (or install if not available)
- [ ] Add haptic feedback in onPress handler:
  ```typescript
  if (Platform.OS !== 'web') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
  ```
- [ ] Test haptic feedback on iOS simulator/device
- [ ] Test haptic feedback on Android emulator/device
- [ ] Ensure no errors on web platform

### Task 2.5: Add Animation
- [ ] Import Animated from react-native
- [ ] Create animated scale value
- [ ] Animate scale on press (1 -> 0.9 -> 1)
- [ ] Use Animated.timing with duration ~100ms
- [ ] Apply scale transform to indicator
- [ ] Test animation is smooth
- [ ] Ensure animation works on all platforms

### Task 2.6: Add Accessibility
- [ ] Add accessibilityRole="button"
- [ ] Add accessibilityLabel with date and status:
  - Completed: "January 5, completed"
  - Incomplete: "Mark January 5 as completed"
- [ ] Add accessibilityHint if helpful
- [ ] Add accessibilityState={{ selected: completed }}
- [ ] Test with screen reader on mobile
- [ ] Test keyboard navigation on web

### Task 2.7: Create Styles and Export
- [ ] Create StyleSheet with cell styles
- [ ] Define reusable style objects
- [ ] Export CompletionCell component
- [ ] Add TypeScript type exports if needed
- [ ] Test component in isolation (if possible)

## Phase 3: CompletionRow Component

### Task 3.1: Create CompletionRow Component File
- [ ] Create `src/components/CompletionRow.tsx`
- [ ] Add TypeScript interface for props:
  ```typescript
  interface CompletionRowProps {
    habit: Habit;
    dates: Date[];
    completions: Map<string, boolean>;
    onToggleCompletion: (date: Date) => void;
  }
  ```
- [ ] Import CompletionCell component
- [ ] Import necessary types (Habit)
- [ ] Import formatDate utility
- [ ] Set up component skeleton

### Task 3.2: Implement Row Layout
- [ ] Create View with flex row layout
- [ ] Ensure row takes full width
- [ ] Add equal spacing for 5 cells
- [ ] Use flex: 1 for each cell or fixed percentage (20%)
- [ ] Add horizontal padding/margin if needed
- [ ] Test layout on different screen sizes

### Task 3.3: Map Dates to CompletionCells
- [ ] Iterate over dates array (should be 5 dates)
- [ ] For each date, render a CompletionCell
- [ ] Pass completed status from completions map
  - Format date to YYYY-MM-DD
  - Look up in completions map
  - Default to false if not found
- [ ] Pass habit color
- [ ] Pass isToday flag (compare date with today)
- [ ] Pass onPress handler for each cell
- [ ] Add key prop for each cell (date string)

### Task 3.4: Implement Toggle Handler
- [ ] Create handleToggle function that takes date
- [ ] Call props.onToggleCompletion with the date
- [ ] Ensure handler is passed correctly to each cell
- [ ] Test toggling different cells
- [ ] Verify correct date is passed to callback

### Task 3.5: Style and Spacing
- [ ] Add appropriate spacing between cells
- [ ] Ensure alignment matches DateHeader width
- [ ] Add consistent padding
- [ ] Test with different habit colors
- [ ] Ensure row doesn't overflow on small screens
- [ ] Test with very long habit names (ensure row still fits)

### Task 3.6: Test and Export
- [ ] Test with various completion patterns (all complete, none complete, mixed)
- [ ] Test with different dates
- [ ] Test toggling each cell
- [ ] Verify visual alignment
- [ ] Export component

## Phase 4: DateHeader Component

### Task 4.1: Create DateHeader Component File
- [ ] Create `src/components/DateHeader.tsx`
- [ ] Add TypeScript interface for props:
  ```typescript
  interface DateHeaderProps {
    dates: Date[];
    todayIndex: number;
  }
  ```
- [ ] Import necessary React Native components
- [ ] Import theme context
- [ ] Import date utilities (formatDayHeader)
- [ ] Set up component skeleton

### Task 4.2: Implement Header Layout
- [ ] Create View with flex row layout
- [ ] Match width with CompletionRow (full width)
- [ ] Create 5 equal-width cells
- [ ] Add centered text alignment
- [ ] Add appropriate height for readability
- [ ] Add background color from theme

### Task 4.3: Render Date Cells
- [ ] Iterate over dates array
- [ ] For each date, render a date cell
- [ ] Format date using formatDayHeader utility
- [ ] Display formatted text
- [ ] Highlight today's cell (using todayIndex)
  - Different background color
  - Border
  - Bold text
  - Or combination of above
- [ ] Add key prop for each cell (date string)

### Task 4.4: Style Date Cells
- [ ] Apply theme colors
- [ ] Style today differently:
  - Use theme.primary for border or background
  - Bold font weight
  - Possibly different text color
- [ ] Style other dates with theme.textSecondary
- [ ] Ensure text is readable in both light and dark themes
- [ ] Add subtle borders or dividers between cells (optional)

### Task 4.5: Make Header Sticky (Optional)
- [ ] If using FlatList, can use stickyHeaderIndices
- [ ] Or position as absolute with top: 0
- [ ] Test scroll behavior
- [ ] Ensure header stays visible when scrolling
- [ ] Ensure header doesn't overlap content
- [ ] If too complex, skip for MVP

### Task 4.6: Test and Export
- [ ] Test with different dates
- [ ] Test today highlighting
- [ ] Test in light and dark themes
- [ ] Test on different screen sizes
- [ ] Verify alignment with CompletionRow below
- [ ] Export component

## Phase 5: HabitCard Integration

### Task 5.1: Update HabitCard Component
- [ ] Open `src/components/HabitCard.tsx`
- [ ] Import CompletionRow component
- [ ] Add dates prop to HabitCard interface
- [ ] Add completions prop (or get from context)
- [ ] Identify where to add CompletionRow (likely below habit info, above or replacing quick toggle)

### Task 5.2: Add CompletionRow to Card Layout
- [ ] Add CompletionRow component to render tree
- [ ] Pass habit prop
- [ ] Pass dates prop
- [ ] Compute or pass completions for the 5 dates
- [ ] Pass onToggleCompletion handler
- [ ] Position below habit name/icon
- [ ] Ensure proper spacing

### Task 5.3: Implement Toggle Handler
- [ ] Import useHabits hook if not already imported
- [ ] Get toggleCompletion function from context
- [ ] Create handler: `handleToggleCompletion(date: Date)`
- [ ] Inside handler, call toggleCompletion with habit.id and formatted date
- [ ] Pass handler to CompletionRow

### Task 5.4: Get Completions Data
- [ ] Use useHabits hook to get completion data
- [ ] For each of the 5 dates, check completion status
- [ ] Create completions map: Map<string, boolean>
- [ ] Pass to CompletionRow
- [ ] Or retrieve inside CompletionRow (decide on best approach)

### Task 5.5: Adjust Card Layout
- [ ] Adjust card height to accommodate new row
- [ ] Ensure spacing is consistent
- [ ] Test with existing quick toggle (decide if keep or replace)
- [ ] If keeping both, ensure they don't conflict
- [ ] Ensure card doesn't become too tall
- [ ] Test in list context

### Task 5.6: Test Integration
- [ ] Test HabitCard with CompletionRow renders
- [ ] Test toggling completion from card
- [ ] Test multiple cards in a list
- [ ] Test with different habit colors
- [ ] Verify existing functionality still works
- [ ] Test press on habit info (should still navigate to detail)

## Phase 6: HomeScreen Integration

### Task 6.1: Update HomeScreen Component
- [ ] Open `src/screens/HomeScreen.tsx`
- [ ] Import DateHeader component
- [ ] Import date utilities (getLastNDays)
- [ ] Calculate last 5 days at component level
- [ ] Calculate today index

### Task 6.2: Calculate Dates
- [ ] Add state or constant for dates:
  ```typescript
  const dates = useMemo(() => getLastNDays(5), []);
  const todayIndex = useMemo(() => dates.length - 1, [dates]);
  ```
- [ ] Or recalculate daily (using today as reference)
- [ ] Ensure dates are consistent across all components

### Task 6.3: Add DateHeader to Layout
- [ ] Add DateHeader component above HabitList
- [ ] Pass dates and todayIndex props
- [ ] Position below existing header
- [ ] Ensure it's visible above the list
- [ ] Add appropriate margin/padding

### Task 6.4: Pass Dates to HabitList
- [ ] Update HabitList component to accept dates prop
- [ ] Pass dates from HomeScreen to HabitList
- [ ] HabitList should pass dates to each HabitCard
- [ ] Ensure dates flow through component tree correctly

### Task 6.5: Test Scrolling Behavior
- [ ] Test scrolling with DateHeader in place
- [ ] If implementing sticky header, test scroll behavior
- [ ] Ensure header stays in correct position
- [ ] Test with few habits (no scroll)
- [ ] Test with many habits (scrolling required)
- [ ] Verify no layout issues

### Task 6.6: Test Empty State
- [ ] Test HomeScreen with no habits
- [ ] Ensure DateHeader still displays
- [ ] Ensure empty state message still shows
- [ ] Verify no errors or crashes

## Phase 7: Polish & Testing

### Task 7.1: Test on iOS
- [ ] Run app on iOS simulator
- [ ] Test date header display
- [ ] Test completion cell interactions
- [ ] Test toggling completions
- [ ] Test haptic feedback
- [ ] Test light and dark themes
- [ ] Test different screen sizes (SE, Pro, Pro Max)
- [ ] Fix any iOS-specific issues

### Task 7.2: Test on Android
- [ ] Run app on Android emulator
- [ ] Test date header display
- [ ] Test completion cell interactions
- [ ] Test toggling completions
- [ ] Test haptic feedback
- [ ] Test light and dark themes
- [ ] Test different screen sizes
- [ ] Fix any Android-specific issues

### Task 7.3: Test on Web
- [ ] Run app on web browser
- [ ] Test date header display
- [ ] Test completion cell interactions
- [ ] Test toggling completions (mouse clicks)
- [ ] Test hover states
- [ ] Test keyboard navigation
- [ ] Test light and dark themes
- [ ] Test responsive behavior (resize window)
- [ ] Fix any web-specific issues

### Task 7.4: Theme Testing
- [ ] Switch to light theme
  - Verify all colors are appropriate
  - Verify text is readable
  - Verify today highlight is visible
- [ ] Switch to dark theme
  - Verify all colors are appropriate
  - Verify text is readable
  - Verify today highlight is visible
- [ ] Test theme switching while viewing 5-day view
- [ ] Fix any theme-related issues

### Task 7.5: Accessibility Testing
- [ ] Test with screen reader on iOS (VoiceOver)
  - Navigate through date header
  - Navigate through completion cells
  - Verify labels are descriptive
  - Test toggling with screen reader
- [ ] Test with screen reader on Android (TalkBack)
  - Same tests as iOS
- [ ] Test keyboard navigation on web
  - Tab through completion cells
  - Activate with Enter/Space
  - Verify focus indicators
- [ ] Verify touch targets are adequate (44x44)
- [ ] Test color contrast (use contrast checker)
- [ ] Fix any accessibility issues

### Task 7.6: Edge Case Testing
- [ ] Test with no habits
  - DateHeader should display
  - No completion rows
  - Empty state message
- [ ] Test with one habit
  - Layout should work
  - All interactions work
- [ ] Test with many habits (20+)
  - Scrolling should be smooth
  - Performance should be acceptable
  - No lag when toggling
- [ ] Test with long habit names
  - Name should truncate or wrap
  - Completion row should still fit
  - Layout shouldn't break
- [ ] Test with all days completed
  - All cells should be filled
  - Toggling should work
- [ ] Test with no days completed
  - All cells should be empty
  - Toggling should work
- [ ] Test rapid toggling (tap many cells quickly)
  - All toggles should register
  - No race conditions
  - Data should be consistent

### Task 7.7: Data Persistence Testing
- [ ] Toggle some completions
- [ ] Close and reopen app
- [ ] Verify completions persist
- [ ] Toggle different day (not today)
- [ ] Close and reopen app
- [ ] Verify all completions persist
- [ ] Check detail screen shows same data
- [ ] Export data and verify 5-day completions included

### Task 7.8: Performance Testing
- [ ] Create 50 test habits
- [ ] Open app and measure load time
- [ ] Scroll through list and check smoothness
- [ ] Toggle completions and measure responsiveness
- [ ] Profile app with React DevTools (if available)
- [ ] Identify any performance bottlenecks
- [ ] Optimize if needed:
  - Add React.memo to CompletionCell
  - Optimize completion lookups
  - Reduce re-renders

### Task 7.9: UI Polish
- [ ] Review spacing between all elements
- [ ] Ensure consistent padding and margins
- [ ] Review font sizes and weights
- [ ] Review colors in both themes
- [ ] Ensure today highlight is prominent but not jarring
- [ ] Smooth any rough animations
- [ ] Add subtle shadow or elevation to cells (optional)
- [ ] Ensure visual hierarchy is clear
- [ ] Get feedback from user or team
- [ ] Make final adjustments

### Task 7.10: Code Review and Cleanup
- [ ] Review all new code
- [ ] Remove any console.logs or debug code
- [ ] Ensure consistent code style
- [ ] Add comments where needed (complex logic)
- [ ] Check for unused imports
- [ ] Check for TypeScript errors or warnings
- [ ] Run linter and fix issues
- [ ] Ensure all files are properly formatted

## Phase 8: Documentation

### Task 8.1: Update README (Optional)
- [ ] Add 5-day completion view to feature list
- [ ] Add screenshot or description
- [ ] Update any relevant documentation

### Task 8.2: Code Documentation
- [ ] Add JSDoc comments to new utility functions
- [ ] Add comments to complex component logic
- [ ] Document any gotchas or important notes
- [ ] Update type definitions if needed

### Task 8.3: Spec Completion
- [ ] Mark spec as implemented
- [ ] Note any deviations from original spec
- [ ] Document any future enhancements identified
- [ ] Update acceptance criteria checklist

## Verification Checklist

Before considering the implementation complete, verify:

### Functionality
- [ ] DateHeader displays last 5 days
- [ ] Today is on the right and highlighted
- [ ] Each habit shows 5 completion cells
- [ ] Cells align with date header
- [ ] Tapping a cell toggles completion
- [ ] Completion state is immediately visible
- [ ] Completions persist after app restart
- [ ] Detail screen shows same data

### Visual Design
- [ ] Layout is clean and organized
- [ ] Spacing is consistent
- [ ] Colors work in light theme
- [ ] Colors work in dark theme
- [ ] Today highlight is clear
- [ ] Completed/incomplete states are distinct
- [ ] Touch targets are adequate size
- [ ] No layout overflow or clipping

### Interaction
- [ ] Tapping cells is responsive
- [ ] Haptic feedback works on mobile
- [ ] Animations are smooth
- [ ] No lag or delay in toggling
- [ ] Quick toggle for today still works (if kept)
- [ ] Navigating to detail still works

### Compatibility
- [ ] Works on iOS
- [ ] Works on Android
- [ ] Works on Web
- [ ] Works on small screens (iPhone SE)
- [ ] Works on large screens (iPad, desktop)
- [ ] No platform-specific crashes

### Accessibility
- [ ] Screen reader announces elements correctly
- [ ] Keyboard navigation works (web)
- [ ] Color contrast is sufficient
- [ ] Touch targets meet minimum size
- [ ] Focus indicators are visible

### Performance
- [ ] No lag with 20+ habits
- [ ] Scrolling is smooth
- [ ] Toggling is instant
- [ ] App load time is acceptable
- [ ] No memory leaks

## Notes

- Each task should be completed and tested before moving to the next
- If a task is blocking progress, flag it and seek help
- Regular commits after completing each task or small group of tasks
- Test on actual devices when possible, not just simulators
- Gather user feedback if available
- Be prepared to iterate based on feedback

## Estimated Effort

- **Phase 1**: Date Utilities - 30 minutes
- **Phase 2**: CompletionCell - 1 hour
- **Phase 3**: CompletionRow - 1 hour  
- **Phase 4**: DateHeader - 1 hour
- **Phase 5**: HabitCard Integration - 1 hour
- **Phase 6**: HomeScreen Integration - 1 hour
- **Phase 7**: Polish & Testing - 1.5 hours
- **Phase 8**: Documentation - 30 minutes

**Total**: ~7 hours

## Dependencies & Blockers

### Must Complete First
- Phase 1 must be complete before Phase 2
- Phase 2 must be complete before Phase 3
- Phase 3 and Phase 4 can be done in parallel
- Phase 5 requires Phase 3
- Phase 6 requires Phase 4 and Phase 5
- Phase 7 requires all previous phases

### External Dependencies
- expo-haptics must be installed (or install during Phase 2)
- date-fns must be available (should already be installed)
- Existing HabitContext must work correctly
- Existing theme system must be functional

## Success Criteria

Implementation is complete when:
- ✓ All tasks in all phases are completed
- ✓ All items in verification checklist are checked
- ✓ All acceptance criteria from spec are met
- ✓ App passes testing on all platforms
- ✓ No known bugs or issues
- ✓ Code is clean and documented
- ✓ Feature is ready for user testing/feedback
