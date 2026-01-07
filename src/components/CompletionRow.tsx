import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CompletionCell } from './CompletionCell';
import { Habit } from '../types';
import { formatDate, isToday } from '../utils/date';

interface CompletionRowProps {
  habit: Habit;
  dates: Date[];
  completions: Map<string, boolean>;
  onToggleCompletion: (date: Date) => void;
}

export const CompletionRow: React.FC<CompletionRowProps> = ({
  habit,
  dates,
  completions,
  onToggleCompletion
}) => {
  const today = new Date();

  return (
    <View style={styles.row}>
      {dates.map((date) => {
        const dateStr = formatDate(date);
        const completed = completions.get(dateStr) || false;
        const isTodayCell = isToday(date);

        return (
          <CompletionCell
            key={dateStr}
            completed={completed}
            color={habit.color}
            isToday={isTodayCell}
            date={date}
            onPress={() => onToggleCompletion(date)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4,
  },
});
