import { Habit, HabitCompletion } from '../types';
import { formatDate, parseDate, getToday, daysBetween, addDaysToDate, getWeekStart, getMonthStart } from './date';

/**
 * Get completions for a specific habit
 */
const getHabitCompletions = (habitId: string, completions: HabitCompletion[]): HabitCompletion[] => {
  return completions
    .filter(c => c.habitId === habitId && c.completed)
    .sort((a, b) => a.date.localeCompare(b.date));
};

/**
 * Check if a habit was completed on a specific date
 */
export const isCompletedOnDate = (
  habitId: string,
  date: Date,
  completions: HabitCompletion[]
): boolean => {
  const dateStr = formatDate(date);
  return completions.some(c => c.habitId === habitId && c.date === dateStr && c.completed);
};

/**
 * Calculate current streak for daily habits
 */
const getDailyStreak = (habitId: string, completions: HabitCompletion[]): number => {
  const habitCompletions = getHabitCompletions(habitId, completions);
  if (habitCompletions.length === 0) return 0;

  const today = getToday();
  const todayStr = formatDate(today);
  const yesterdayStr = formatDate(addDaysToDate(today, -1));
  
  // Check if completed today or yesterday (streak is still active)
  const lastCompletion = habitCompletions[habitCompletions.length - 1];
  if (lastCompletion.date !== todayStr && lastCompletion.date !== yesterdayStr) {
    return 0; // Streak broken
  }

  let streak = 0;
  let currentDate = today;
  
  // Count backwards from today
  for (let i = habitCompletions.length - 1; i >= 0; i--) {
    const completion = habitCompletions[i];
    const completionDate = parseDate(completion.date);
    const expectedDate = formatDate(currentDate);
    
    if (completion.date === expectedDate) {
      streak++;
      currentDate = addDaysToDate(currentDate, -1);
    } else if (daysBetween(completionDate, currentDate) > 1) {
      // Gap found, stop counting
      break;
    }
  }
  
  return streak;
};

/**
 * Calculate current streak for weekly habits
 */
const getWeeklyStreak = (
  habit: Habit,
  completions: HabitCompletion[]
): number => {
  const habitCompletions = getHabitCompletions(habit.id, completions);
  if (habitCompletions.length === 0) return 0;

  const target = habit.targetPerWeek || 1;
  const today = getToday();
  let streak = 0;
  let currentWeekStart = getWeekStart(today);
  
  while (true) {
    const weekEnd = addDaysToDate(currentWeekStart, 6);
    const weekStartStr = formatDate(currentWeekStart);
    const weekEndStr = formatDate(weekEnd);
    
    // Count completions in this week
    const weekCompletions = habitCompletions.filter(c => 
      c.date >= weekStartStr && c.date <= weekEndStr
    );
    
    if (weekCompletions.length >= target) {
      streak++;
      currentWeekStart = addDaysToDate(currentWeekStart, -7);
    } else {
      break;
    }
  }
  
  return streak;
};

/**
 * Calculate current streak for monthly habits
 */
const getMonthlyStreak = (
  habit: Habit,
  completions: HabitCompletion[]
): number => {
  const habitCompletions = getHabitCompletions(habit.id, completions);
  if (habitCompletions.length === 0) return 0;

  const target = habit.targetPerMonth || 1;
  const today = getToday();
  let streak = 0;
  let checkDate = today;
  
  while (true) {
    const monthStart = getMonthStart(checkDate);
    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
    const monthStartStr = formatDate(monthStart);
    const monthEndStr = formatDate(monthEnd);
    
    // Count completions in this month
    const monthCompletions = habitCompletions.filter(c => 
      c.date >= monthStartStr && c.date <= monthEndStr
    );
    
    if (monthCompletions.length >= target) {
      streak++;
      // Move to previous month
      checkDate = addDaysToDate(monthStart, -1);
    } else {
      break;
    }
  }
  
  return streak;
};

/**
 * Calculate current streak based on habit frequency
 */
export const getCurrentStreak = (
  habit: Habit,
  completions: HabitCompletion[]
): number => {
  switch (habit.frequency) {
    case 'daily':
      return getDailyStreak(habit.id, completions);
    case 'weekly':
      return getWeeklyStreak(habit, completions);
    case 'monthly':
      return getMonthlyStreak(habit, completions);
    default:
      return 0;
  }
};

/**
 * Calculate longest streak ever for a habit
 */
export const getLongestStreak = (
  habit: Habit,
  completions: HabitCompletion[]
): number => {
  const habitCompletions = getHabitCompletions(habit.id, completions);
  if (habitCompletions.length === 0) return 0;

  if (habit.frequency === 'daily') {
    let longestStreak = 0;
    let currentStreak = 1;
    
    for (let i = 1; i < habitCompletions.length; i++) {
      const prevDate = parseDate(habitCompletions[i - 1].date);
      const currDate = parseDate(habitCompletions[i].date);
      const dayDiff = daysBetween(prevDate, currDate);
      
      if (dayDiff === 1) {
        currentStreak++;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    }
    
    return Math.max(longestStreak, currentStreak);
  }
  
  // For weekly/monthly, use similar logic but with week/month boundaries
  // For simplicity, returning current streak as longest for now
  // TODO: Implement full longest streak calculation for weekly/monthly
  return getCurrentStreak(habit, completions);
};

/**
 * Get completion count for a specific date range
 */
export const getCompletionCount = (
  habitId: string,
  startDate: Date,
  endDate: Date,
  completions: HabitCompletion[]
): number => {
  const startStr = formatDate(startDate);
  const endStr = formatDate(endDate);
  
  return completions.filter(c => 
    c.habitId === habitId && 
    c.completed &&
    c.date >= startStr && 
    c.date <= endStr
  ).length;
};
