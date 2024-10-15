import { createContext, ReactNode, useEffect } from 'react';
import { useStorage } from '@/hooks/useStorage'; // Assuming you have the `useStorage` hook

// Define the shape of the context
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
  storageAvailable: boolean; // Track storage availability
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  storageAvailable: true, // Default to true, will update dynamically
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Use `useStorage` hook to manage theme with fallback if storage is unavailable
  const [theme, setTheme, , storageAvailable] = useStorage('theme', 'dark', 'localStorage');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme); // Pass the new theme directly to setTheme
  };

  // Set the theme class on the document root
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);

    // Optionally update the meta theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      if (theme === 'dark') {
        metaThemeColor.setAttribute('content', '#14191f'); // Dark theme color
      } else {
        metaThemeColor.setAttribute('content', '#b9bbc6'); // Light theme color
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, storageAvailable }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
