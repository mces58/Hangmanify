import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ColorSchemeName } from 'react-native';
import { useColorScheme } from 'react-native';

import type { Theme } from 'src/constants/styles';
import { DarkTheme, LightTheme, SYSTEM_THEME } from 'src/constants/styles';

interface ThemeContextProps {
  readonly system: SYSTEM_THEME;
  readonly theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  system: SYSTEM_THEME.LIGHT,
  theme: LightTheme,
  toggleTheme: () => {},
});

const getThemeAndSystem = (scheme: ColorSchemeName): Omit<ThemeContextProps, 'toggleTheme'> => ({
  system: scheme === SYSTEM_THEME.DARK ? SYSTEM_THEME.DARK : SYSTEM_THEME.LIGHT,
  theme: scheme === SYSTEM_THEME.DARK ? DarkTheme : LightTheme,
});

/**
 * ### Provides theme context to the application
 * @param {React.JSX.Element} props - React props containing `children`
 * @returns {React.JSX.Element} React context provider for theming
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
const ThemeProvider: React.FC<{ children: React.JSX.Element }> = ({
  children,
}): React.JSX.Element => {
  const systemColorScheme = useColorScheme();
  const currentSystem = getThemeAndSystem(systemColorScheme).system;
  const [theme, setTheme] = useState<Theme>(getThemeAndSystem(systemColorScheme).theme);

  useEffect(() => {
    setTheme(getThemeAndSystem(systemColorScheme).theme);
  }, [systemColorScheme]);

  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === LightTheme ? DarkTheme : LightTheme));
  };

  const contextValue = useMemo<ThemeContextProps>(
    () => ({ system: currentSystem, theme, toggleTheme }),
    [currentSystem, theme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

/**
 * ### Accesses the theme context values
 * @returns {ThemeContextProps} Current theme data and toggling utility
 * @example
 * const { system, theme, toggleTheme } = useTheme();
 * toggleTheme(); // Switch between light and dark
 */
const useTheme = (): ThemeContextProps => useContext<ThemeContextProps>(ThemeContext);

export { ThemeProvider, useTheme };
