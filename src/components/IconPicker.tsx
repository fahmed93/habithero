import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

// Curated list of icons suitable for habits
const HABIT_ICONS = [
  'run', 'dumbbell', 'yoga', 'bicycle', 'swim', 'walk',
  'book-open-page-variant', 'notebook', 'pencil', 'school',
  'water', 'food-apple', 'leaf', 'meditation',
  'heart-pulse', 'sleep', 'pill', 'hospital-box',
  'briefcase', 'laptop', 'calendar-check', 'clock-outline',
  'music', 'guitar', 'microphone', 'piano',
  'brush', 'palette', 'draw', 'camera',
  'chat', 'phone', 'email', 'account-group',
  'home', 'flower', 'earth', 'weather-sunny',
];

interface IconPickerProps {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
  label?: string;
}

export const IconPicker: React.FC<IconPickerProps> = ({
  selectedIcon,
  onSelectIcon,
  label,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.iconScrollContent}
      >
        <View style={styles.iconGrid}>
          {HABIT_ICONS.map((iconName) => (
            <TouchableOpacity
              key={iconName}
              style={[
                styles.iconButton,
                { backgroundColor: theme.surface, borderColor: theme.border },
                selectedIcon === iconName && [
                  styles.selectedIcon,
                  { backgroundColor: theme.primary + '20', borderColor: theme.primary }
                ],
              ]}
              onPress={() => onSelectIcon(iconName)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={iconName as any}
                size={28}
                color={selectedIcon === iconName ? theme.primary : theme.text}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  iconScrollContent: {
    paddingRight: 16,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    maxWidth: 400,
  },
  iconButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIcon: {
    borderWidth: 2,
  },
});
