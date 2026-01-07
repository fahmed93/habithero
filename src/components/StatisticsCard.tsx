import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Statistics } from '../types';

interface StatisticsCardProps {
  statistics: Statistics;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({ statistics }) => {
  const { theme } = useTheme();

  const StatItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <View style={styles.statItem}>
      <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{label}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.title, { color: theme.text }]}>Statistics</Text>
      <View style={styles.statsGrid}>
        <StatItem label="Total" value={statistics.totalCompletions} />
        <StatItem label="Current Streak" value={`${statistics.currentStreak} days`} />
        <StatItem label="Longest Streak" value={`${statistics.longestStreak} days`} />
        <StatItem label="Completion Rate" value={`${statistics.completionRate}%`} />
        <StatItem label="Last 30 Days" value={statistics.last30Days} />
        <StatItem label="Weekly Avg" value={statistics.weeklyAverage} />
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
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: '30%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
});
