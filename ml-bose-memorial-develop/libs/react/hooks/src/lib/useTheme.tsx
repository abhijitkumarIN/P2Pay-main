import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useLocalStorage, useUserInfo } from '.';

interface Theme {
  flavor: string;
  font?: string;
  kit?: string;
}

interface ThemeContextProps {
  theme: Theme;
  themeClass: string;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export enum ThemeFlavor {
  AppStack = 'appstack',
  Flat = 'flat',
  Glass = 'glass',
  Material = 'material',
  Modern = 'modern',
}

export enum ThemeKit {
  Dark = 'dark',
  Light = 'light',
}

export const DefaultTheme: Theme = {
  flavor: ThemeFlavor.Material,
  font: 'Fira Sans',
  kit: ThemeKit.Dark,
};

function getThemePreferencesStoreKey(userName: string): string | null {
  return userName ? `user-preferences-theme-${userName}` : null;
}

/**
 * Builds a css class with the theme to be applied in the app.
 * The `default-theme` contains the default css styles and it is extended by each `theme.flavor`.
 * @returns the class name of the theme.
 */
function buildThemeClass(theme: Theme = DefaultTheme) {
  return `default-theme ${theme.flavor}-${theme.kit}`;
}

export function useGetThemeStoredValue(theme = DefaultTheme) {
  const _user = useUserInfo();
  const userName = _user?.userInfo?.username;

  const keyOfThemeLocalStorage = getThemePreferencesStoreKey(userName);
  const { setLocalStorageValue: localStoreTheme, localStorageValue: storedTheme } = useLocalStorage(
    keyOfThemeLocalStorage,
    theme,
  );

  return { storedTheme, localStoreTheme };
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeClass: buildThemeClass(),
  theme: DefaultTheme,
  setTheme: (theme: Theme): Theme => {
    return theme;
  },
});

export function useTheme(): ThemeContextProps {
  const themeContext = useContext(ThemeContext);
  return themeContext;
}

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [theme, setTheme] = useState<Theme>(DefaultTheme);
  const [themeClass, setThemeClass] = useState<string>(buildThemeClass());
  const { localStoreTheme } = useGetThemeStoredValue();
  const onSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStoreTheme(newTheme);
  };

  useEffect(() => {
    setThemeClass(buildThemeClass(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        setTheme: onSetTheme,
        theme,
        themeClass,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
