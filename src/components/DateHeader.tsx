import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { formatDayHeader } from '../utils/date';

interface DateHeaderProps {
  dates: Date[];
  todayIndex: number;
}

export const DateHeader: React.FC<DateHeaderProps> = ({ dates, todayIndex }) => {
  const { theme } = useTheme();
  const today = new Date();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
      <View style={styles.row}>
        {dates.map((date, index) => {
          const isTodayCell = index === todayIndex;
          const label = formatDayHeader(date, today);

          return (
            <View
              key={date.toISOString()}
              style={[
                styles.cell,
                isTodayCell && {
                  backgroundColor: theme.primary + '15',
                  borderRadius: 8,
                }
              ]}
            >
              <Text
                style={[
                  styles.dateText,
                  { color: theme.textSecondary },
                  isTodayCell && {
                    color: theme.primary,
                    fontWeight: '700',
                  }
                ]}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  dateText: {
    fontSize: 12,
    textAlign: 'center',
  },
});
