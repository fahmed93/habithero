import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { Theme, AppSettings } from '../types';
import { loadSettings, saveSettings } from '../utils/storage';

const lightTheme: Theme = {
  background: '#f5f5f5',
  surface: '#ffffff',
  primary: '#007AFF',
  text: '#000000',
  textSecondary: '#666666',
  border: '#e0e0e0',
  success: '#34C759',
  error: '#FF3B30',
  cardBackground: '#ffffff',
  inactive: '#d1d1d6'
};

const darkTheme: Theme = {
  background: '#000000',
  surface: '#1c1c1e',
  primary: '#0A84FF',
  text: '#ffffff',
  textSecondary: '#98989d',
  border: '#38383a',
  success: '#30D158',
  error: '#FF453A',
  cardBackground: '#1c1c1e',
  inactive: '#48484a'
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  themeSetting: 'light' | 'dark' | 'auto';
  setTheme: (setting: 'light' | 'dark' | 'auto') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeSetting, setThemeSetting] = useState<'light' | 'dark' | 'auto'>('auto');
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  // Load theme preference on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const settings = await loadSettings();
        if (settings.theme) {
          setThemeSetting(settings.theme);
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };
    loadThemePreference();
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  // Determine which theme to use
  const isDark = themeSetting === 'auto' 
    ? systemColorScheme === 'dark'
    : themeSetting === 'dark';

  const theme = isDark ? darkTheme : lightTheme;

  const setTheme = async (setting: 'light' | 'dark' | 'auto') => {
    setThemeSetting(setting);
    try {
      const settings = await loadSettings();
      await saveSettings({ ...settings, theme: setting });
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, themeSetting, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
