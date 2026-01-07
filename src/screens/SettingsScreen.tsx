import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { exportData, clearAllData } from '../utils/storage';

interface SettingsScreenProps {
  onNavigateToArchived?: () => void;
  onNavigateToDataManagement?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigateToArchived,
  onNavigateToDataManagement,
}) => {
  const { theme, isDark, themeSetting, setTheme } = useTheme();

  const handleExportData = async () => {
    try {
      const jsonData = await exportData();
      const fileName = `habithero-backup-${new Date().toISOString().split('T')[0]}.json`;
      
      if (Platform.OS === 'web') {
        // For web, create a download link
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
        Alert.alert('Success', 'Data exported successfully!');
      } else {
        // For mobile, show the data (or implement native sharing later)
        Alert.alert('Export Data', 'Feature coming soon for mobile!');
      }
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('Error', 'Failed to export data. Please try again.');
    }
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all habits and data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllData();
              Alert.alert('Success', 'All data has been cleared. Please restart the app.');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear data. Please try again.');
            }
          },
        },
      ]
    );
  };

  const MenuItem: React.FC<{
    icon: string;
    title: string;
    subtitle?: string;
    onPress: () => void;
    danger?: boolean;
  }> = ({ icon, title, subtitle, onPress, danger }) => (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: theme.cardBackground }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <MaterialCommunityIcons
          name={icon as any}
          size={24}
          color={danger ? theme.error : theme.text}
        />
        <View style={styles.menuItemText}>
          <Text style={[styles.menuItemTitle, { color: danger ? theme.error : theme.text }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.menuItemSubtitle, { color: theme.textSecondary }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color={theme.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 60 : 20 }]}>
        <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Theme Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>APPEARANCE</Text>
          <View style={[styles.themeContainer, { backgroundColor: theme.cardBackground }]}>
            {(['light', 'dark', 'auto'] as const).map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.themeOption,
                  themeSetting === option && [
                    styles.themeOptionActive,
                    { backgroundColor: theme.primary + '20', borderColor: theme.primary },
                  ],
                ]}
                onPress={() => setTheme(option)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={
                    option === 'light'
                      ? 'white-balance-sunny'
                      : option === 'dark'
                      ? 'moon-waning-crescent'
                      : 'theme-light-dark'
                  }
                  size={24}
                  color={themeSetting === option ? theme.primary : theme.text}
                />
                <Text
                  style={[
                    styles.themeOptionText,
                    { color: themeSetting === option ? theme.primary : theme.text },
                  ]}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Data Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>DATA</Text>
          <MenuItem
            icon="archive"
            title="Archived Habits"
            subtitle="View and manage archived habits"
            onPress={() => onNavigateToArchived?.()}
          />
          <MenuItem
            icon="export"
            title="Export Data"
            subtitle="Backup your habits and progress"
            onPress={handleExportData}
          />
          <MenuItem
            icon="delete-forever"
            title="Clear All Data"
            subtitle="Delete all habits and progress"
            onPress={handleClearData}
            danger
          />
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>ABOUT</Text>
          <View style={[styles.aboutCard, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.appName, { color: theme.text }]}>🎯 HabitHero</Text>
            <Text style={[styles.appVersion, { color: theme.textSecondary }]}>Version 1.0.0</Text>
            <Text style={[styles.appDescription, { color: theme.textSecondary }]}>
              Build better habits, track your progress, and achieve your goals.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  themeContainer: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  themeOption: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 8,
  },
  themeOptionActive: {
    borderWidth: 2,
  },
  themeOptionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
  },
  aboutCard: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    marginBottom: 12,
  },
  appDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
});
