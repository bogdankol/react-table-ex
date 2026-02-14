import { createContext, useState, useContext, ReactNode } from 'react';

enum Theme {
  light = 'light',
  dark = 'dark'
}
export const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode}) {
  const [theme, setTheme] = useState(Theme.light);

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.light ? Theme.dark : Theme.light));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}