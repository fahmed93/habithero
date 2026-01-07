import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../contexts/ThemeContext';

interface CompletionCellProps {
  completed: boolean;
  color: string;
  isToday: boolean;
  date: Date;
  onPress: () => void;
  disabled?: boolean;
}

export const CompletionCell: React.FC<CompletionCellProps> = ({
  completed,
  color,
  isToday,
  date,
  onPress,
  disabled = false
}) => {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (disabled) return;

    // Haptic feedback on mobile
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Scale animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  // Accessibility label
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const accessibilityLabel = completed
    ? `${dateStr}, completed. Tap to unmark.`
    : `${dateStr}, not completed. Tap to mark as completed.`;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: completed }}
      // Ensure minimum 44x44 touch target
      hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
    >
      <Animated.View
        style={[
          styles.cell,
          completed && {
            backgroundColor: color,
            borderColor: color,
          },
          !completed && {
            backgroundColor: 'transparent',
            borderColor: color,
            borderWidth: 2,
          },
          isToday && {
            borderWidth: 3,
            borderColor: theme.primary,
          },
          disabled && {
            opacity: 0.3,
          },
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  cell: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
  },
});
