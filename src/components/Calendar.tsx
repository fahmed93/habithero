import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { Habit, HabitCompletion } from '../types';
import { 
  formatDate, 
  getMonthStart, 
  getMonthEnd, 
  getDaysInRange, 
  getDayOfWeek,
  addDaysToDate,
  isToday,
  isSameDay
} from '../utils/date';
import { isCompletedOnDate } from '../utils/streaks';

interface CalendarProps {
  habit: Habit;
  completions: HabitCompletion[];
  onDayPress?: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  habit,
  completions,
  onDayPress,
}) => {
  const { theme } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = getMonthStart(currentMonth);
  const monthEnd = getMonthEnd(currentMonth);
  const daysInMonth = getDaysInRange(monthStart, monthEnd);
  
  // Get first day of week for the month
  const firstDayOfWeek = getDayOfWeek(monthStart);
  
  // Create calendar grid with empty cells for padding
  const calendarDays: (Date | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...daysInMonth,
  ];

  const monthName = currentMonth.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const renderDay = (date: Date | null, index: number) => {
    if (!date) {
      return <View key={`empty-${index}`} style={styles.dayCell} />;
    }

    const completed = isCompletedOnDate(habit.id, date, completions);
    const today = isToday(date);
    const dayNumber = date.getDate();

    return (
      <TouchableOpacity
        key={formatDate(date)}
        style={[
          styles.dayCell,
          today && styles.todayCell,
          completed && [styles.completedCell, { backgroundColor: habit.color + '20' }],
        ]}
        onPress={() => onDayPress?.(date)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.dayText,
            { color: theme.text },
            today && styles.todayText,
            completed && { color: habit.color, fontWeight: 'bold' },
          ]}
        >
          {dayNumber}
        </Text>
        {completed && (
          <View style={styles.checkMark}>
            <MaterialCommunityIcons
              name="check-circle"
              size={16}
              color={habit.color}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
          <MaterialCommunityIcons name="chevron-left" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.monthTitle, { color: theme.text }]}>{monthName}</Text>
        <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
          <MaterialCommunityIcons name="chevron-right" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Week day labels */}
      <View style={styles.weekDaysRow}>
        {weekDays.map((day) => (
          <View key={day} style={styles.weekDayCell}>
            <Text style={[styles.weekDayText, { color: theme.textSecondary }]}>
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.calendarGrid}>
        {calendarDays.map((date, index) => renderDay(date, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  weekDaysRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%', // 100% / 7 days
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    position: 'relative',
  },
  dayText: {
    fontSize: 14,
  },
  todayCell: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  todayText: {
    fontWeight: 'bold',
  },
  completedCell: {
    borderRadius: 8,
  },
  checkMark: {
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
});
