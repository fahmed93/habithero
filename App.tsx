import { ThemeProvider } from './src/contexts/ThemeContext';
import { HabitProvider } from './src/contexts/HabitContext';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <ThemeProvider>
      <HabitProvider>
        <HomeScreen />
      </HabitProvider>
    </ThemeProvider>
  );
}
