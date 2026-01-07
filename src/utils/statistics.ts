import { Habit, HabitCompletion, Statistics } from '../types';
import { getCurrentStreak, getLongestStreak, getCompletionCount } from './streaks';
import { getToday, addDaysToDate } from './date';

/**
 * Calculate comprehensive statistics for a habit
 */
export const calculateStatistics = (
  habit: Habit,
  completions: HabitCompletion[]
): Statistics => {
  const habitCompletions = completions.filter(c => c.habitId === habit.id && c.completed);
  const totalCompletions = habitCompletions.length;
  
  const currentStreak = getCurrentStreak(habit, completions);
  const longestStreak = getLongestStreak(habit, completions);
  
  // Calculate last 30 days
  const today = getToday();
  const thirtyDaysAgo = addDaysToDate(today, -30);
  const last30Days = getCompletionCount(habit.id, thirtyDaysAgo, today, completions);
  
  // Calculate completion rate (based on days since creation)
  const createdAt = new Date(habit.createdAt);
  const daysSinceCreation = Math.max(1, Math.floor((today.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)));
  const completionRate = (totalCompletions / daysSinceCreation) * 100;
  
  // Calculate weekly average
  const weeksSinceCreation = Math.max(1, daysSinceCreation / 7);
  const weeklyAverage = totalCompletions / weeksSinceCreation;
  
  return {
    totalCompletions,
    currentStreak,
    longestStreak,
    completionRate: Math.min(100, Math.round(completionRate)),
    last30Days,
    weeklyAverage: Math.round(weeklyAverage * 10) / 10
  };
};

/**
 * Calculate overall statistics across all habits
 */
export const calculateOverallStatistics = (
  habits: Habit[],
  completions: HabitCompletion[]
): {
  totalHabits: number;
  activeHabits: number;
  totalCompletions: number;
  completionsToday: number;
  averageStreak: number;
} => {
  const activeHabits = habits.filter(h => !h.archived);
  const totalCompletions = completions.filter(c => c.completed).length;
  
  const today = getToday();
  const todayStr = today.toISOString().split('T')[0];
  const completionsToday = completions.filter(
    c => c.completed && c.date === todayStr
  ).length;
  
  const streaks = activeHabits.map(h => getCurrentStreak(h, completions));
  const averageStreak = streaks.length > 0 
    ? Math.round((streaks.reduce((sum, s) => sum + s, 0) / streaks.length) * 10) / 10
    : 0;
  
  return {
    totalHabits: habits.length,
    activeHabits: activeHabits.length,
    totalCompletions,
    completionsToday,
    averageStreak
  };
};
