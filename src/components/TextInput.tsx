import React from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  maxLength?: number;
  showCharCount?: boolean;
}

export const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  value,
  maxLength,
  showCharCount,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      )}
      <RNTextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.surface,
            color: theme.text,
            borderColor: error ? theme.error : theme.border,
          },
          style,
        ]}
        placeholderTextColor={theme.textSecondary}
        value={value}
        maxLength={maxLength}
        {...props}
      />
      {(error || (showCharCount && maxLength)) && (
        <View style={styles.footer}>
          {error && (
            <Text style={[styles.error, { color: theme.error }]}>{error}</Text>
          )}
          {showCharCount && maxLength && (
            <Text style={[styles.charCount, { color: theme.textSecondary }]}>
              {value?.length || 0}/{maxLength}
            </Text>
          )}
        </View>
      )}
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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 48,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  error: {
    fontSize: 12,
    flex: 1,
  },
  charCount: {
    fontSize: 12,
  },
});
