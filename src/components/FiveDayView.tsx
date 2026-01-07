import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Habit } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { useHabits } from '../contexts/HabitContext';
import { getLastNDays, formatShortDate, isToday } from '../utils/date';

interface FiveDayViewProps {
  habit: Habit;
}

export const FiveDayView: React.FC<FiveDayViewProps> = ({ habit }) => {
  const { theme } = useTheme();
  const { getCompletionForDate, toggleCompletion } = useHabits();
  
  // Get the last 5 days including today
  const days = getLastNDays(5);

  const handleToggle = async (date: Date, e: any) => {
    e.stopPropagation();
    await toggleCompletion(habit.id, date);
  };

  return (
    <View style={styles.container}>
      {/* Date header row */}
      <View style={styles.headerRow}>
        {days.map((day, index) => {
          const isTodayDate = isToday(day);
          return (
            <View
              key={index}
              style={[
                styles.headerCell,
                isTodayDate && { backgroundColor: theme.primary + '15' }
              ]}
            >
              <Text
                style={[
                  styles.headerText,
                  { color: isTodayDate ? theme.primary : theme.textSecondary }
                ]}
              >
                {formatShortDate(day)}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Completion row */}
      <View style={styles.completionRow}>
        {days.map((day, index) => {
          const isCompleted = getCompletionForDate(habit.id, day);
          const isTodayDate = isToday(day);
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.completionCell,
                { borderColor: theme.border },
                isCompleted && { backgroundColor: theme.success, borderColor: theme.success },
                !isCompleted && { backgroundColor: theme.surface },
                isTodayDate && !isCompleted && { borderColor: theme.primary, borderWidth: 2 },
              ]}
              onPress={(e) => handleToggle(day, e)}
              activeOpacity={0.7}
            >
              {isCompleted && (
                <MaterialCommunityIcons name="check" size={18} color="#ffffff" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  headerText: {
    fontSize: 11,
    fontWeight: '500',
  },
  completionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completionCell: {
    flex: 1,
    aspectRatio: 1,
    minHeight: 44,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
});
