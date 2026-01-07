# Specification: 5-Day Completion View

## Overview
Add a 5-day horizontal completion view to the main screen that shows the last 5 days of habit completion. Each day can be marked as completed, with today's date distinguished and positioned on the right side. The view includes a header row showing each date.

## User Stories

1. As a user, I want to see the last 5 days of completion for each habit so I can quickly review my recent progress
2. As a user, I want to mark any of the last 5 days as completed so I can track habits retroactively
3. As a user, I want today's date to be visually distinguished so I know which day is today
4. As a user, I want to see the dates for each day in the header so I know which day I'm marking

## Functional Requirements

### Display Requirements
1. **Layout**: Horizontal row of 5 days displayed for each habit
2. **Position**: Days arranged left to right, with oldest on left and today on right
3. **Header**: Row showing dates for each of the 5 days
4. **Today Indicator**: Today's column should be visually distinguished (border, background, or label)
5. **Integration**: Component should integrate seamlessly into existing HabitCard or as a separate row

### Interaction Requirements
1. **Tap to Complete**: User can tap any day's cell to toggle completion status
2. **Visual Feedback**: Completed days show a checkmark or filled state
3. **Immediate Update**: Changes persist immediately to storage
4. **Touch Target**: Each day cell should be at least 44x44 for mobile touch targets

### Data Requirements
1. **Date Range**: Calculate last 5 days including today
2. **Completion Data**: Use existing `HabitCompletion` data model
3. **Date Format**: Display short date format (e.g., "Jan 3", "Mon 3", or "1/3")

## Technical Specifications

### New Component: `FiveDayView`

```typescript
interface FiveDayViewProps {
  habit: Habit;
}

// Component renders:
// - Header row with 5 dates
// - Interactive row with 5 completion cells
// - Uses existing toggleCompletion from HabitContext
```

### Date Utilities
Utilize existing `date.ts` utilities:
- `getToday()` - Get current date
- `addDaysToDate()` - Calculate previous days
- `formatDate()` - Format for storage
- Add new utility: `formatShortDate()` - Format for display (e.g., "Mon 3")

### Integration Points
1. **HabitCard Component**: Add FiveDayView below habit info
2. **HabitContext**: Use existing `toggleCompletion()` and `getCompletionForDate()`
3. **Theme**: Use existing theme colors for consistency

## Design Specifications

### Layout
```
┌─────────────────────────────────────────┐
│ Habit Name                              │
│ Description                             │
│ ┌───┬───┬───┬───┬───┐                   │
│ │ 3 │ 4 │ 5 │ 6 │ 7 │ ← Dates header   │
│ ├───┼───┼───┼───┼───┤                   │
│ │ ✓ │   │ ✓ │   │ ✓ │ ← Completion row │
│ └───┴───┴───┴───┴───┘     ↑             │
│                          Today           │
└─────────────────────────────────────────┘
```

### Visual States
1. **Completed**: Checkmark icon, success color background
2. **Incomplete**: Empty or outlined, subtle background
3. **Today**: Highlighted border or background color
4. **Past Days**: Standard styling, slightly muted if old

### Styling
- **Cell Size**: 40x40 minimum (larger if space allows)
- **Spacing**: 4-8px between cells
- **Border Radius**: 8px for rounded corners
- **Colors**: Use theme.success for completed, theme.border for empty
- **Today Highlight**: Use theme.primary with 20% opacity

## Acceptance Criteria

### Must Have
1. ✓ Display exactly 5 days (4 days ago through today)
2. ✓ Today is on the right side
3. ✓ Today is visually distinguished
4. ✓ Header shows date for each day
5. ✓ User can tap any day to toggle completion
6. ✓ Completion state persists to storage
7. ✓ Component integrates with existing HabitCard
8. ✓ Responsive design works on mobile and web
9. ✓ Uses existing theme colors

### Should Have
1. Smooth animation when toggling completion
2. Haptic feedback on mobile when toggling
3. Accessible labels for screen readers
4. Keyboard navigation support

### Nice to Have
1. Swipe gesture to view more days
2. Long press to add notes to specific day
3. Different visual for future dates (if shown)

## Implementation Plan

### Phase 1: Component Creation
1. Create `FiveDayView.tsx` component in `src/components/`
2. Implement date calculation logic
3. Create date header row
4. Create completion toggle row

### Phase 2: Integration
1. Import FiveDayView into HabitCard
2. Position component appropriately
3. Test with existing habits

### Phase 3: Styling & Polish
1. Apply theme colors
2. Add today indicator
3. Ensure touch targets are adequate
4. Test responsive behavior

### Phase 4: Testing
1. Test on web platform
2. Test completion persistence
3. Test with multiple habits
4. Test theme switching
5. Test edge cases (no completions, all completed, etc.)

## Out of Scope
- More than 5 days view
- Swipe to see additional days
- Editing notes per day
- Undo functionality
- Analytics or insights from 5-day view

## Success Metrics
- Component renders correctly for all habits
- Completion toggling works instantly
- Data persists across app restarts
- Visual design matches app theme
- User can quickly mark any of last 5 days
