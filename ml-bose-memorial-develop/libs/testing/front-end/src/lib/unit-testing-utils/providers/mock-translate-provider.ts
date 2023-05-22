import { TranslationProvider } from '@kleeen/core-react';
import { stringsTranslate } from '@kleeen/settings';

export function TranslateProvider({ locale }) {
  return TranslationProvider({
    defaultLocale: 'en',
    locale,
    localeData: stringsTranslate,
    onError: (err: string): void => {
      console.error('TranslateProvider', err);
    },
  });
}
