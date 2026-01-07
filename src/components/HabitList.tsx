import React from 'react';
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';
import { Habit } from '../types';
import { HabitCard } from './HabitCard';
import { useTheme } from '../contexts/ThemeContext';

interface HabitListProps {
  habits: Habit[];
  onHabitPress: (habit: Habit) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export const HabitList: React.FC<HabitListProps> = ({
  habits,
  onHabitPress,
  onRefresh,
  refreshing = false,
}) => {
  const { theme } = useTheme();

  if (habits.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyIcon]}>🎯</Text>
        <Text style={[styles.emptyTitle, { color: theme.text }]}>
          No habits yet
        </Text>
        <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
          Tap the + button to create your first habit
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={habits}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <HabitCard habit={item} onPress={() => onHabitPress(item)} />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        ) : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
