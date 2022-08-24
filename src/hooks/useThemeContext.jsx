import React, { createContext, useContext } from "react";
import usePersistedState from "./usePersistedState";

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  /** usePersistedState for storing state in local store */
  const [darkMode, setDarkMode] = usePersistedState("darkmode", false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// export a custom hook to use this specific context
export function useThemeContext() {
  return useContext(ThemeContext);
}
