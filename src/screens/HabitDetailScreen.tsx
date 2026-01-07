import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useHabits } from '../contexts/HabitContext';
import { Habit } from '../types';
import { HabitFormScreen } from './HabitFormScreen';
import { getCurrentStreak, getLongestStreak } from '../utils/streaks';
import { calculateStatistics } from '../utils/statistics';
import { getToday } from '../utils/date';

interface HabitDetailScreenProps {
  habit: Habit;
  onClose: () => void;
}

export const HabitDetailScreen: React.FC<HabitDetailScreenProps> = ({
  habit,
  onClose,
}) => {
  const { theme } = useTheme();
  const { completions, deleteHabit, toggleArchive, isCompletedToday, toggleCompletion } = useHabits();
  const [showEdit, setShowEdit] = useState(false);

  const isCompleted = isCompletedToday(habit.id);
  const currentStreak = getCurrentStreak(habit, completions);
  const longestStreak = getLongestStreak(habit, completions);
  const stats = calculateStatistics(habit, completions);

  const handleToggleToday = async () => {
    await toggleCompletion(habit.id, getToday());
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Habit',
      `Are you sure you want to delete "${habit.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteHabit(habit.id);
            onClose();
          },
        },
      ]
    );
  };

  const handleArchive = async () => {
    await toggleArchive(habit.id);
    onClose();
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Habit Details</Text>
        <TouchableOpacity onPress={() => setShowEdit(true)} style={styles.editButton}>
          <Text style={[styles.editButtonText, { color: theme.primary }]}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Habit Header */}
        <View style={[styles.habitHeader, { backgroundColor: theme.cardBackground }]}>
          <View style={[styles.iconContainer, { backgroundColor: habit.color + '20' }]}>
            <MaterialCommunityIcons
              name={habit.icon as any}
              size={48}
              color={habit.color}
            />
          </View>
          <Text style={[styles.habitName, { color: theme.text }]}>{habit.name}</Text>
          {habit.description && (
            <Text style={[styles.habitDescription, { color: theme.textSecondary }]}>
              {habit.description}
            </Text>
          )}
          <View style={styles.frequencyBadge}>
            <Text style={[styles.frequencyText, { color: theme.primary }]}>
              {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)} Goal
            </Text>
          </View>
        </View>

        {/* Today's Toggle */}
        <View style={[styles.todaySection, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Today</Text>
          <TouchableOpacity
            style={[
              styles.todayButton,
              isCompleted && { backgroundColor: theme.success },
              !isCompleted && { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 2 },
            ]}
            onPress={handleToggleToday}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={isCompleted ? 'check-circle' : 'circle-outline'}
              size={32}
              color={isCompleted ? '#ffffff' : theme.textSecondary}
            />
            <Text
              style={[
                styles.todayButtonText,
                { color: isCompleted ? '#ffffff' : theme.text },
              ]}
            >
              {isCompleted ? 'Completed' : 'Mark Complete'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Statistics */}
        <View style={[styles.statsSection, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {stats.currentStreak}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Current Streak
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {stats.longestStreak}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Longest Streak
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {stats.totalCompletions}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Total
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {stats.completionRate}%
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Completion Rate
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.cardBackground }]}
            onPress={handleArchive}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={habit.archived ? 'archive-arrow-up' : 'archive-arrow-down'}
              size={20}
              color={theme.text}
            />
            <Text style={[styles.actionButtonText, { color: theme.text }]}>
              {habit.archived ? 'Unarchive' : 'Archive'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.cardBackground }]}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="delete" size={20} color={theme.error} />
            <Text style={[styles.actionButtonText, { color: theme.error }]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showEdit}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseEdit}
      >
        <HabitFormScreen habit={habit} onClose={handleCloseEdit} />
      </Modal>
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
  editButton: {
    padding: 4,
  },
  editButtonText: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  habitHeader: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  habitName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  habitDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  frequencyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  frequencyText: {
    fontSize: 14,
    fontWeight: '600',
  },
  todaySection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  todayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  todayButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statBox: {
    flex: 1,
    minWidth: '45%',
    padding: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  actionsSection: {
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
