import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Habit, HabitCompletion } from '../types';
import { loadHabits, saveHabits, loadCompletions, saveCompletions } from '../utils/storage';
import { formatDate, getToday } from '../utils/date';

interface HabitContextType {
  habits: Habit[];
  completions: HabitCompletion[];
  loading: boolean;
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt'>) => Promise<void>;
  updateHabit: (id: string, updates: Partial<Habit>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  toggleArchive: (id: string) => Promise<void>;
  toggleCompletion: (habitId: string, date: Date) => Promise<void>;
  getActiveHabits: () => Habit[];
  getArchivedHabits: () => Habit[];
  isCompletedToday: (habitId: string) => boolean;
  getCompletionForDate: (habitId: string, date: Date) => boolean;
  refreshData: () => Promise<void>;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedHabits, loadedCompletions] = await Promise.all([
          loadHabits(),
          loadCompletions()
        ]);
        setHabits(loadedHabits);
        setCompletions(loadedCompletions);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const refreshData = async () => {
    try {
      const [loadedHabits, loadedCompletions] = await Promise.all([
        loadHabits(),
        loadCompletions()
      ]);
      setHabits(loadedHabits);
      setCompletions(loadedCompletions);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  const addHabit = async (habitData: Omit<Habit, 'id' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: `habit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };

    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    await saveHabits(updatedHabits);
  };

  const updateHabit = async (id: string, updates: Partial<Habit>) => {
    const updatedHabits = habits.map(habit =>
      habit.id === id ? { ...habit, ...updates } : habit
    );
    setHabits(updatedHabits);
    await saveHabits(updatedHabits);
  };

  const deleteHabit = async (id: string) => {
    const updatedHabits = habits.filter(habit => habit.id !== id);
    const updatedCompletions = completions.filter(c => c.habitId !== id);
    
    setHabits(updatedHabits);
    setCompletions(updatedCompletions);
    
    await Promise.all([
      saveHabits(updatedHabits),
      saveCompletions(updatedCompletions)
    ]);
  };

  const toggleArchive = async (id: string) => {
    const habit = habits.find(h => h.id === id);
    if (habit) {
      await updateHabit(id, { archived: !habit.archived });
    }
  };

  const toggleCompletion = async (habitId: string, date: Date) => {
    const dateStr = formatDate(date);
    const existingIndex = completions.findIndex(
      c => c.habitId === habitId && c.date === dateStr
    );

    let updatedCompletions: HabitCompletion[];
    
    if (existingIndex >= 0) {
      // Toggle existing completion
      updatedCompletions = [...completions];
      updatedCompletions[existingIndex] = {
        ...updatedCompletions[existingIndex],
        completed: !updatedCompletions[existingIndex].completed
      };
    } else {
      // Add new completion
      updatedCompletions = [
        ...completions,
        {
          habitId,
          date: dateStr,
          completed: true
        }
      ];
    }

    setCompletions(updatedCompletions);
    await saveCompletions(updatedCompletions);
  };

  const getActiveHabits = () => {
    return habits.filter(h => !h.archived);
  };

  const getArchivedHabits = () => {
    return habits.filter(h => h.archived);
  };

  const isCompletedToday = (habitId: string): boolean => {
    const today = formatDate(getToday());
    return completions.some(
      c => c.habitId === habitId && c.date === today && c.completed
    );
  };

  const getCompletionForDate = (habitId: string, date: Date): boolean => {
    const dateStr = formatDate(date);
    return completions.some(
      c => c.habitId === habitId && c.date === dateStr && c.completed
    );
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        completions,
        loading,
        addHabit,
        updateHabit,
        deleteHabit,
        toggleArchive,
        toggleCompletion,
        getActiveHabits,
        getArchivedHabits,
        isCompletedToday,
        getCompletionForDate,
        refreshData
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = (): HabitContextType => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};
