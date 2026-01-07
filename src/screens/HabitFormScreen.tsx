import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useHabits } from '../contexts/HabitContext';
import { TextInput } from '../components/TextInput';
import { ColorPicker } from '../components/ColorPicker';
import { IconPicker } from '../components/IconPicker';
import { Button } from '../components/Button';
import { Habit } from '../types';

interface HabitFormScreenProps {
  habit?: Habit;
  onClose: () => void;
}

export const HabitFormScreen: React.FC<HabitFormScreenProps> = ({
  habit,
  onClose,
}) => {
  const { theme } = useTheme();
  const { addHabit, updateHabit } = useHabits();

  const [name, setName] = useState(habit?.name || '');
  const [description, setDescription] = useState(habit?.description || '');
  const [icon, setIcon] = useState(habit?.icon || 'run');
  const [color, setColor] = useState(habit?.color || '#007AFF');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>(
    habit?.frequency || 'daily'
  );
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ name?: string }>({});

  const validate = (): boolean => {
    const newErrors: { name?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Habit name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setSaving(true);
    try {
      const habitData = {
        name: name.trim(),
        description: description.trim() || undefined,
        icon,
        color,
        frequency,
        archived: habit?.archived || false,
        targetPerWeek: frequency === 'weekly' ? 3 : undefined,
        targetPerMonth: frequency === 'monthly' ? 12 : undefined,
      };

      if (habit) {
        await updateHabit(habit.id, habitData);
      } else {
        await addHabit(habitData);
      }

      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to save habit. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={[styles.closeButtonText, { color: theme.primary }]}>
            Cancel
          </Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>
          {habit ? 'Edit Habit' : 'New Habit'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TextInput
          label="Habit Name"
          value={name}
          onChangeText={setName}
          placeholder="e.g., Morning Run"
          error={errors.name}
          maxLength={50}
          showCharCount
        />

        <TextInput
          label="Description (Optional)"
          value={description}
          onChangeText={setDescription}
          placeholder="e.g., Run for 30 minutes"
          multiline
          numberOfLines={2}
          maxLength={100}
          showCharCount
        />

        <IconPicker
          label="Icon"
          selectedIcon={icon}
          onSelectIcon={setIcon}
        />

        <ColorPicker
          label="Color"
          selectedColor={color}
          onSelectColor={setColor}
        />

        <View style={styles.frequencySection}>
          <Text style={[styles.label, { color: theme.text }]}>Frequency</Text>
          <View style={styles.frequencyButtons}>
            {(['daily', 'weekly', 'monthly'] as const).map((freq) => (
              <TouchableOpacity
                key={freq}
                style={[
                  styles.frequencyButton,
                  {
                    backgroundColor: frequency === freq ? theme.primary : theme.surface,
                    borderColor: frequency === freq ? theme.primary : theme.border,
                  },
                ]}
                onPress={() => setFrequency(freq)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.frequencyButtonText,
                    {
                      color: frequency === freq ? '#ffffff' : theme.text,
                    },
                  ]}
                >
                  {freq.charAt(0).toUpperCase() + freq.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={habit ? 'Save Changes' : 'Create Habit'}
            onPress={handleSave}
            loading={saving}
          />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  frequencySection: {
    marginBottom: 16,
  },
  frequencyButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  frequencyButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  frequencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 32,
  },
});
