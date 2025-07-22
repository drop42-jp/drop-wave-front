import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { defaultTheme } from "../lib/themes";

const ThemeContext = createContext<{} | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Apply default theme colors to CSS variables on mount
  useEffect(() => {
    const root = document.documentElement;

    // Apply default theme colors as CSS variables
    Object.entries(defaultTheme.colors).forEach(([property, value]) => {
      root.style.setProperty(`--${property}`, value);
    });

    // Add default theme class
    root.classList.add("theme-default");
  }, []);

  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
};
