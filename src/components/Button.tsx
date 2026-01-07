import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}) => {
  const { theme } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 48,
    };

    if (disabled) {
      return {
        ...baseStyle,
        backgroundColor: theme.inactive,
      };
    }

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: theme.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.border,
        };
      case 'danger':
        return {
          ...baseStyle,
          backgroundColor: theme.error,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: 16,
      fontWeight: '600',
    };

    if (disabled) {
      return {
        ...baseStyle,
        color: theme.textSecondary,
      };
    }

    switch (variant) {
      case 'primary':
      case 'danger':
        return {
          ...baseStyle,
          color: '#ffffff',
        };
      case 'secondary':
        return {
          ...baseStyle,
          color: theme.text,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? theme.text : '#ffffff'} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
