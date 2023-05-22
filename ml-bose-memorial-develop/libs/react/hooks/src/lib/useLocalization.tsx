import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import { KSAuth } from '@kleeen/auth';
import { useLocalStorage } from './useLocalStorage';

interface LocalizationContextProps {
  language: Language;
  setLanguage: Dispatch<SetStateAction<string>>;
  getLanguagePreferencesStoreKey: (string) => string;
}

export enum Language {
  en = 'en',
  es = 'es',
}

const defaultLanguage = Language.en;

export const LocalizationContext = React.createContext<LocalizationContextProps>({
  language: defaultLanguage,
  setLanguage: (language: string): string => {
    return language;
  },
  getLanguagePreferencesStoreKey,
});

export function useLocalization(): LocalizationContextProps {
  const themeContext = useContext(LocalizationContext);

  return themeContext;
}

function getLanguagePreferencesStoreKey(userName: string): string | null {
  return userName ? `user-preferences-language-${userName}` : null;
}

export const LocalizationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [username, setUsername] = useState('');

  /*
  TODO: @Marimba the useUserInfo() was changed, for the reason that over-renders occur.
  TODO: This solution solves the problems. But how to solve this must be investigated at a higher level.
  */
  useEffect(() => {
    const getCurrentUser = async (): Promise<void> => {
      try {
        const response = await KSAuth.currentAuthenticatedUser();
        setUsername(response?.username);
      } catch (err) {
        setUsername('');
      }
    };

    getCurrentUser();
  }, []);

  const keyOfLanguageLocalStorage = getLanguagePreferencesStoreKey(username);
  const { localStorageValue: storedLanguage, setLocalStorageValue } = useLocalStorage(
    keyOfLanguageLocalStorage,
    defaultLanguage,
  );

  const onSetLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setLocalStorageValue(newLanguage);
  };

  useEffect(() => {
    if (language !== storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, [storedLanguage]);

  return (
    <LocalizationContext.Provider
      value={{
        language,
        setLanguage: onSetLanguage,
        getLanguagePreferencesStoreKey,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};
