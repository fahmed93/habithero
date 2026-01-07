import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit, HabitCompletion } from '../types';

const HABITS_KEY = '@habithero_habits';
const COMPLETIONS_KEY = '@habithero_completions';
const SETTINGS_KEY = '@habithero_settings';

// Helper to serialize dates
const serializeHabits = (habits: Habit[]): string => {
  return JSON.stringify(habits, (key, value) => {
    if (key === 'createdAt' && value instanceof Date) {
      return value.toISOString();
    }
    return value;
  });
};

// Helper to deserialize dates
const deserializeHabits = (json: string): Habit[] => {
  return JSON.parse(json, (key, value) => {
    if (key === 'createdAt' && typeof value === 'string') {
      return new Date(value);
    }
    return value;
  });
};

export const saveHabits = async (habits: Habit[]): Promise<void> => {
  try {
    const json = serializeHabits(habits);
    await AsyncStorage.setItem(HABITS_KEY, json);
  } catch (error) {
    console.error('Error saving habits:', error);
    throw new Error('Failed to save habits');
  }
};

export const loadHabits = async (): Promise<Habit[]> => {
  try {
    const json = await AsyncStorage.getItem(HABITS_KEY);
    if (json === null) {
      return [];
    }
    return deserializeHabits(json);
  } catch (error) {
    console.error('Error loading habits:', error);
    return [];
  }
};

export const saveCompletions = async (completions: HabitCompletion[]): Promise<void> => {
  try {
    const json = JSON.stringify(completions);
    await AsyncStorage.setItem(COMPLETIONS_KEY, json);
  } catch (error) {
    console.error('Error saving completions:', error);
    throw new Error('Failed to save completions');
  }
};

export const loadCompletions = async (): Promise<HabitCompletion[]> => {
  try {
    const json = await AsyncStorage.getItem(COMPLETIONS_KEY);
    if (json === null) {
      return [];
    }
    return JSON.parse(json);
  } catch (error) {
    console.error('Error loading completions:', error);
    return [];
  }
};

export const saveSettings = async (settings: any): Promise<void> => {
  try {
    const json = JSON.stringify(settings);
    await AsyncStorage.setItem(SETTINGS_KEY, json);
  } catch (error) {
    console.error('Error saving settings:', error);
    throw new Error('Failed to save settings');
  }
};

export const loadSettings = async (): Promise<any> => {
  try {
    const json = await AsyncStorage.getItem(SETTINGS_KEY);
    if (json === null) {
      return {};
    }
    return JSON.parse(json);
  } catch (error) {
    console.error('Error loading settings:', error);
    return {};
  }
};

export const exportData = async (): Promise<string> => {
  try {
    const habits = await loadHabits();
    const completions = await loadCompletions();
    const settings = await loadSettings();
    
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      habits: habits.map(h => ({
        ...h,
        createdAt: h.createdAt.toISOString()
      })),
      completions,
      settings
    };
    
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    throw new Error('Failed to export data');
  }
};

export const importData = async (jsonString: string): Promise<void> => {
  try {
    const data = JSON.parse(jsonString);
    
    // Validate data structure
    if (!data.version || !data.habits || !data.completions) {
      throw new Error('Invalid data format');
    }
    
    // Convert date strings back to Date objects
    const habits = data.habits.map((h: any) => ({
      ...h,
      createdAt: new Date(h.createdAt)
    }));
    
    await saveHabits(habits);
    await saveCompletions(data.completions);
    if (data.settings) {
      await saveSettings(data.settings);
    }
  } catch (error) {
    console.error('Error importing data:', error);
    throw new Error('Failed to import data');
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(HABITS_KEY);
    await AsyncStorage.removeItem(COMPLETIONS_KEY);
    await AsyncStorage.removeItem(SETTINGS_KEY);
  } catch (error) {
    console.error('Error clearing data:', error);
    throw new Error('Failed to clear data');
  }
};
