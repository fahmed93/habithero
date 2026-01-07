import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../contexts/ThemeContext';
import { useHabits } from '../contexts/HabitContext';
import { HabitList } from '../components/HabitList';
import { HabitFormScreen } from './HabitFormScreen';
import { HabitDetailScreen } from './HabitDetailScreen';
import { Habit } from '../types';
import { formatDisplayDate, getToday } from '../utils/date';

export default function HomeScreen() {
  const { theme, isDark } = useTheme();
  const { getActiveHabits, refreshData, loading } = useHabits();
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  const activeHabits = getActiveHabits();
  const today = getToday();
  const dateString = formatDisplayDate(today);

  const handleHabitPress = (habit: Habit) => {
    setSelectedHabit(habit);
  };

  const handleCloseDetail = () => {
    setSelectedHabit(null);
  };

  const handleCloseForm = () => {
    setShowAddHabit(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 60 : 20 }]}>
        <View>
          <Text style={[styles.greeting, { color: theme.text }]}>
            🎯 HabitHero
          </Text>
          <Text style={[styles.date, { color: theme.textSecondary }]}>
            {dateString}
          </Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
            Loading habits...
          </Text>
        </View>
      ) : (
        <View style={styles.content}>
          <HabitList
            habits={activeHabits}
            onHabitPress={handleHabitPress}
            onRefresh={refreshData}
          />
        </View>
      )}

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={() => setShowAddHabit(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={showAddHabit}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseForm}
      >
        <HabitFormScreen onClose={handleCloseForm} />
      </Modal>

      <Modal
        visible={selectedHabit !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseDetail}
      >
        {selectedHabit && (
          <HabitDetailScreen
            habit={selectedHabit}
            onClose={handleCloseDetail}
          />
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabIcon: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: '300',
  },
});
