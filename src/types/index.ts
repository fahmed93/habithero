// TypeScript type definitions for HabitHero

// Example types - to be expanded as the application grows
export interface Habit {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  createdAt: Date;
}

export interface HabitCompletion {
  habitId: string;
  completedAt: Date;
}

// Add more types as needed
