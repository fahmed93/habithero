import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Habit } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { useHabits } from '../contexts/HabitContext';
import { getCurrentStreak } from '../utils/streaks';
import { CompletionRow } from './CompletionRow';
import { formatDate } from '../utils/date';

interface HabitCardProps {
  habit: Habit;
  onPress: () => void;
  dates?: Date[];
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, onPress, dates }) => {
  const { theme } = useTheme();
  const { completions, isCompletedToday, toggleCompletion, getCompletionForDate } = useHabits();
  const isCompleted = isCompletedToday(habit.id);
  const streak = getCurrentStreak(habit, completions);

  const handleToggle = async (e: any) => {
    e.stopPropagation();
    await toggleCompletion(habit.id, new Date());
  };

  const handleToggleCompletion = async (date: Date) => {
    await toggleCompletion(habit.id, date);
  };

  // Build completions map for the 5 days
  const completionsMap = new Map<string, boolean>();
  if (dates) {
    dates.forEach(date => {
      const dateStr = formatDate(date);
      const isComplete = getCompletionForDate(habit.id, date);
      completionsMap.set(dateStr, isComplete);
    });
  }

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.topSection}>
          <View style={styles.leftSection}>
            <View style={[styles.iconContainer, { backgroundColor: habit.color + '20' }]}>
              <MaterialCommunityIcons
                name={habit.icon as any}
                size={28}
                color={habit.color}
              />
            </View>
            <View style={styles.habitInfo}>
              <Text style={[styles.habitName, { color: theme.text }]} numberOfLines={1}>
                {habit.name}
              </Text>
              {habit.description && (
                <Text style={[styles.habitDescription, { color: theme.textSecondary }]} numberOfLines={1}>
                  {habit.description}
                </Text>
              )}
              {streak > 0 && (
                <View style={styles.streakBadge}>
                  <Text style={[styles.streakText, { color: theme.textSecondary }]}>
                    🔥 {streak} day{streak !== 1 ? 's' : ''}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.checkButton,
              isCompleted && { backgroundColor: theme.success },
              !isCompleted && { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 2 },
            ]}
            onPress={handleToggle}
            activeOpacity={0.7}
          >
            {isCompleted && (
              <MaterialCommunityIcons name="check" size={20} color="#ffffff" />
            )}
          </TouchableOpacity>
        </View>
        
        {dates && dates.length > 0 && (
          <CompletionRow
            habit={habit}
            dates={dates}
            completions={completionsMap}
            onToggleCompletion={handleToggleCompletion}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  content: {
    flex: 1,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  habitDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  streakBadge: {
    marginTop: 4,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '500',
  },
  checkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
