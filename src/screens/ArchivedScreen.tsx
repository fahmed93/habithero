import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useHabits } from '../contexts/HabitContext';
import { HabitList } from '../components/HabitList';

interface ArchivedScreenProps {
  onClose?: () => void;
}

export const ArchivedScreen: React.FC<ArchivedScreenProps> = ({ onClose }) => {
  const { theme } = useTheme();
  const { getArchivedHabits, toggleArchive, deleteHabit } = useHabits();
  const archivedHabits = getArchivedHabits();

  const handleHabitPress = (habit: any) => {
    Alert.alert(
      habit.name,
      'What would you like to do?',
      [
        {
          text: 'Unarchive',
          onPress: async () => {
            await toggleArchive(habit.id);
          },
        },
        {
          text: 'Delete Permanently',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Delete Habit',
              `Are you sure you want to permanently delete "${habit.name}"? This action cannot be undone.`,
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: async () => {
                    await deleteHabit(habit.id);
                  },
                },
              ]
            );
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={theme.text} />
          </TouchableOpacity>
        )}
        <Text style={[styles.title, { color: theme.text }]}>Archived Habits</Text>
        {onClose && <View style={styles.placeholder} />}
      </View>

      {archivedHabits.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📦</Text>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>
            No archived habits
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
            Archive habits you want to pause without deleting them
          </Text>
        </View>
      ) : (
        <View style={styles.content}>
          <HabitList habits={archivedHabits} onHabitPress={handleHabitPress} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
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
