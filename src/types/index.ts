// TypeScript type definitions for HabitHero

export interface Habit {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  targetPerWeek?: number; // for weekly goals
  targetPerMonth?: number; // for monthly goals
  createdAt: Date;
  archived: boolean;
  reminder?: {
    enabled: boolean;
    time: string; // HH:MM format
    days?: number[]; // 0-6 for Sun-Sat
  };
}

export interface HabitCompletion {
  habitId: string;
  date: string; // YYYY-MM-DD format
  completed: boolean;
}

export interface Theme {
  background: string;
  surface: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  error: string;
  cardBackground: string;
  inactive: string;
}

export interface Statistics {
  totalCompletions: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  last30Days: number;
  weeklyAverage: number;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  defaultReminderTime: string;
}
