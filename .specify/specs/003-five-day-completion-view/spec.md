# Specification: 5-Day Habit Completion View

## Overview
Enhance the main screen (HomeScreen) to display a horizontal 5-day completion view for each habit, allowing users to quickly see and mark completion status for the last 5 days. This provides a quick overview of recent habit progress without navigating to detail views.

## User Story
As a user, I want to see the last 5 days of completion status for each habit on the main screen, so I can quickly review my recent progress and mark completions without opening individual habit details.

## Requirements

### Functional Requirements

#### 1. Date Header Display
- Display a shared date header at the top of the habit list showing the last 5 days
- Dates should be displayed horizontally from left to right (oldest to newest)
- Today's date should be on the right side
- Today's date should be visually distinguished from other dates (e.g., highlighted, different style)
- Date format should be concise (e.g., "Mon 5", "Tue 6", "Today")

#### 2. Habit Completion Row
- Each habit card should display 5 day cells horizontally
- Each cell represents one day's completion status
- Cell alignment should match the date header above
- Visual indicators for completion status:
  - Completed: Filled indicator (colored circle/square matching habit color)
  - Not completed: Empty indicator (outline only)
  - Future dates: Disabled/grayed out (if applicable)

#### 3. Quick Completion Toggle
- Users can tap any cell to toggle completion status for that day
- Tapping a completed cell should unmark it
- Tapping an incomplete cell should mark it as complete
- Immediate visual feedback on tap (haptic feedback on mobile)
- Smooth animation when toggling status

#### 4. Layout and Design
- Horizontal scrolling if needed to view all 5 days on small screens
- Responsive design that works on various screen sizes
- Maintain existing habit card styling and layout
- Clear visual hierarchy between dates and completion cells
- Consistent spacing and alignment across all habit rows

#### 5. Data Persistence
- Completion changes should be saved immediately to local storage
- Changes should persist across app restarts
- Sync with existing HabitCompletion data model

### Non-Functional Requirements

#### Usability
- Touch targets must be at least 44x44 points for accessibility
- Clear visual distinction between completed and incomplete states
- Intuitive interaction (tap to toggle)
- No confusion with existing quick toggle for today

#### Performance
- Smooth scrolling if horizontal scroll is needed
- Instant feedback on completion toggle
- Efficient rendering for lists with many habits
- No lag when updating completion status

#### Compatibility
- Works on iOS, Android, and Web
- Responsive across different screen sizes
- Consistent behavior across platforms
- Works with both light and dark themes

#### Accessibility
- Proper accessibility labels for screen readers
- High contrast between states for visibility
- Clear focus indicators for keyboard navigation (web)
- Touch targets meet minimum size requirements

## Technical Specifications

### Data Model
Uses existing `HabitCompletion` interface:
```typescript
interface HabitCompletion {
  habitId: string;
  date: string; // YYYY-MM-DD format
  completed: boolean;
}
```

### Component Structure
```
HomeScreen
├── DateHeader (new component)
│   └── 5 date cells (showing dates for last 5 days)
└── HabitList (existing, enhanced)
    └── HabitCard (existing, enhanced)
        └── CompletionRow (new component)
            └── 5 completion cells (toggleable)
```

### New Components

#### DateHeader
- Props: dates (Date[]), today (Date)
- Displays 5 dates horizontally
- Highlights today's date
- Fixed position at top of list (sticky header)

#### CompletionRow
- Props: habit (Habit), dates (Date[]), completions (HabitCompletion[]), onToggle (function)
- Displays 5 completion cells
- Each cell shows completion status for corresponding date
- Handles tap events to toggle completion

### State Management
- Use existing `HabitContext` for completion state
- Add/update `toggleCompletion(habitId: string, date: string)` function
- Existing `getCompletionForDate(habitId: string, date: string)` function

### Date Utilities
Extend `src/utils/date.ts`:
- `getLast5Days(today?: Date): Date[]` - Returns array of last 5 days including today
- `isToday(date: Date): boolean` - Check if date is today (already exists)
- `formatDayHeader(date: Date, isToday: boolean): string` - Format date for header display

### Styling Considerations
- Use habit's color for completion indicators
- Opacity/brightness adjustment for empty state
- Border for today's column in both header and cells
- Theme-aware colors (light/dark mode support)
- Responsive spacing based on screen width

## User Interface Design

### Visual Layout
```
┌─────────────────────────────────────────┐
│  🎯 HabitHero                    ⚙️     │
│  Tuesday, January 7                      │
├─────────────────────────────────────────┤
│  Date Header (Sticky)                   │
│  [Thu 3] [Fri 4] [Sat 5] [Sun 6] [Today]│
├─────────────────────────────────────────┤
│  📚 Read Daily                          │
│  [◉] [◯] [◉] [◉] [◉]  →               │
├─────────────────────────────────────────┤
│  💪 Exercise                             │
│  [◉] [◉] [◯] [◉] [◯]  →               │
├─────────────────────────────────────────┤
│  🧘 Meditate                             │
│  [◯] [◉] [◉] [◯] [◉]  →               │
└─────────────────────────────────────────┘
```

### Visual States
1. **Completed**: Solid circle/square with habit color
2. **Incomplete**: Outlined circle/square with border
3. **Today's Column**: Highlighted background or border
4. **Disabled**: Grayed out (if needed for future dates)

### Interaction Flow
1. User taps a completion cell
2. Haptic feedback (mobile)
3. Immediate visual change (completed ↔ incomplete)
4. Data saved to local storage
5. UI reflects new state

## Acceptance Criteria

### Must Have
1. ✓ Date header displays last 5 days horizontally
2. ✓ Today's date is on the right and visually distinct
3. ✓ Each habit shows 5 completion cells aligned with dates
4. ✓ Cells can be tapped to toggle completion status
5. ✓ Visual distinction between completed/incomplete states
6. ✓ Completion changes persist to local storage
7. ✓ Works on iOS, Android, and Web
8. ✓ Responsive design for different screen sizes
9. ✓ Supports both light and dark themes

### Should Have
1. ✓ Smooth animations when toggling completion
2. ✓ Haptic feedback on mobile
3. ✓ Sticky date header that stays visible when scrolling
4. ✓ Clear touch targets (min 44x44 points)
5. ✓ Accessibility labels for screen readers
6. ✓ Loading states while data is fetching

### Nice to Have
1. Swipe gesture to mark multiple days
2. Long press to see completion details/notes
3. Visual streak indicator within the 5-day view
4. Tooltip on hover (web) showing full date
5. Confetti animation on completing all 5 days
6. Statistics summary above date header

## Out of Scope
- Editing completion for dates older than 5 days (use detail screen)
- Adding notes or details to completions
- Filtering or sorting based on 5-day completion
- Exporting 5-day view as image
- Customizing number of days displayed
- Weekly or monthly view variants
- Comparison with other habits

## Success Metrics
- Users can see last 5 days at a glance
- Completion can be toggled in 1 tap per day
- No navigation needed to mark last 5 days
- Reduced need to open habit detail screen for recent days
- Improved user engagement with daily tracking

## Dependencies
- Existing `HabitContext` for state management
- Existing `HabitCompletion` data model
- Existing date utilities in `src/utils/date.ts`
- Existing theme system

## Related Specifications
- Spec 002: HabitKit Features (provides base habit tracking functionality)
- Future: Calendar view (comprehensive date navigation)
- Future: Streak visualization (detailed progress views)
