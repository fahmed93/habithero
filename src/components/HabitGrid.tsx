import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Habit, HabitCompletion } from '../types';
import { formatDate, getLast12Weeks, getDayOfWeek } from '../utils/date';
import { isCompletedOnDate } from '../utils/streaks';

interface HabitGridProps {
  habit: Habit;
  completions: HabitCompletion[];
  onDayPress?: (date: Date) => void;
}

export const HabitGrid: React.FC<HabitGridProps> = ({
  habit,
  completions,
  onDayPress,
}) => {
  const { theme } = useTheme();
  const days = getLast12Weeks();

  // Group days by week
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  
  days.forEach((day, index) => {
    const dayOfWeek = getDayOfWeek(day);
    
    // Start new week on Sunday
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    
    currentWeek.push(day);
    
    // Push last week
    if (index === days.length - 1) {
      weeks.push(currentWeek);
    }
  });

  const getCellColor = (date: Date): string => {
    const completed = isCompletedOnDate(habit.id, date, completions);
    if (!completed) {
      return theme.border;
    }
    // Use habit color with varying opacity
    return habit.color;
  };

  const getCellOpacity = (date: Date): number => {
    const completed = isCompletedOnDate(habit.id, date, completions);
    return completed ? 1 : 0.15;
  };

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.title, { color: theme.text }]}>Last 12 Weeks</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          {/* Day labels */}
          <View style={styles.dayLabels}>
            {dayLabels.map((label, index) => (
              <Text
                key={index}
                style={[styles.dayLabel, { color: theme.textSecondary }]}
              >
                {label}
              </Text>
            ))}
          </View>
          
          {/* Grid */}
          <View style={styles.grid}>
            {weeks.map((week, weekIndex) => (
              <View key={weekIndex} style={styles.column}>
                {/* Fill empty cells at the start of first week */}
                {weekIndex === 0 && getDayOfWeek(week[0]) > 0 && (
                  <>
                    {Array.from({ length: getDayOfWeek(week[0]) }).map((_, i) => (
                      <View key={`empty-${i}`} style={styles.emptyCell} />
                    ))}
                  </>
                )}
                
                {week.map((day, dayIndex) => (
                  <TouchableOpacity
                    key={`${weekIndex}-${dayIndex}`}
                    style={[
                      styles.cell,
                      {
                        backgroundColor: getCellColor(day),
                        opacity: getCellOpacity(day),
                      },
                    ]}
                    onPress={() => onDayPress?.(day)}
                    activeOpacity={0.7}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* Legend */}
      <View style={styles.legend}>
        <Text style={[styles.legendText, { color: theme.textSecondary }]}>Less</Text>
        <View style={[styles.legendCell, { backgroundColor: theme.border, opacity: 0.15 }]} />
        <View style={[styles.legendCell, { backgroundColor: habit.color, opacity: 1 }]} />
        <Text style={[styles.legendText, { color: theme.textSecondary }]}>More</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
  },
  dayLabels: {
    marginRight: 8,
    justifyContent: 'space-around',
  },
  dayLabel: {
    fontSize: 10,
    height: 12,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    gap: 3,
  },
  column: {
    gap: 3,
  },
  cell: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  emptyCell: {
    width: 12,
    height: 12,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 4,
  },
  legendText: {
    fontSize: 10,
  },
  legendCell: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
});
