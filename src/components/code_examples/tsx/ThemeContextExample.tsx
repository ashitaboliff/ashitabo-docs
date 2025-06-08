'use client';
import React, { createContext, useState, useContext, type ReactNode } from 'react';

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Contextオブジェクトを作成 (デフォルト値を指定)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Context Providerコンポーネント
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Contextを使用するためのカスタムフック
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
