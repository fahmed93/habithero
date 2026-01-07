import { 
  format, 
  isToday as dateFnsIsToday,
  startOfDay,
  endOfDay,
  eachDayOfInterval,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  differenceInDays,
  parseISO,
  subWeeks,
  addDays
} from 'date-fns';

/**
 * Format date to YYYY-MM-DD format for storage
 */
export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * Check if a date is today
 */
export const isToday = (date: Date): boolean => {
  return dateFnsIsToday(date);
};

/**
 * Parse date string (YYYY-MM-DD) to Date object
 */
export const parseDate = (dateString: string): Date => {
  return parseISO(dateString);
};

/**
 * Get array of dates in a range
 */
export const getDaysInRange = (start: Date, end: Date): Date[] => {
  return eachDayOfInterval({ start, end });
};

/**
 * Get the start of the week for a given date
 */
export const getWeekStart = (date: Date): Date => {
  return startOfWeek(date, { weekStartsOn: 0 }); // Sunday as first day
};

/**
 * Get the end of the week for a given date
 */
export const getWeekEnd = (date: Date): Date => {
  return endOfWeek(date, { weekStartsOn: 0 });
};

/**
 * Get the start of the month for a given date
 */
export const getMonthStart = (date: Date): Date => {
  return startOfMonth(date);
};

/**
 * Get the end of the month for a given date
 */
export const getMonthEnd = (date: Date): Date => {
  return endOfMonth(date);
};

/**
 * Get today at start of day
 */
export const getToday = (): Date => {
  return startOfDay(new Date());
};

/**
 * Get dates for the last N weeks (for grid visualization)
 */
export const getLast12Weeks = (): Date[] => {
  const today = getToday();
  const start = subWeeks(today, 12);
  return getDaysInRange(start, today);
};

/**
 * Calculate difference in days between two dates
 */
export const daysBetween = (date1: Date, date2: Date): number => {
  return differenceInDays(date2, date1);
};

/**
 * Add days to a date
 */
export const addDaysToDate = (date: Date, days: number): Date => {
  return addDays(date, days);
};

/**
 * Format date for display (e.g., "Monday, Jan 7")
 */
export const formatDisplayDate = (date: Date): string => {
  return format(date, 'EEEE, MMM d');
};

/**
 * Format date for display with year (e.g., "Jan 7, 2026")
 */
export const formatFullDate = (date: Date): string => {
  return format(date, 'MMM d, yyyy');
};

/**
 * Get day of week (0 = Sunday, 6 = Saturday)
 */
export const getDayOfWeek = (date: Date): number => {
  return date.getDay();
};

/**
 * Check if two dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return formatDate(date1) === formatDate(date2);
};
