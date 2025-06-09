import React, { createContext, useContext, useMemo, useState } from 'react';

import type { TranslateOptions } from 'i18n-js';
import { helpers } from 'src/utils';

import type {
  AvailableLanguages,
  DotNotationKeys,
  TranslationKeys,
} from 'src/constants/localization';
import { i18n, LANGUAGE_CODES, LOCAL_UNITS } from 'src/constants/localization';

type TranslateFunction = (
  key: DotNotationKeys<TranslationKeys>,
  options?: TranslateOptions
) => string;

interface I18nContextProps {
  readonly locale: AvailableLanguages;
  readonly t: TranslateFunction;
  toggleI18n: (locale: AvailableLanguages) => void;
}

const getTranslation: TranslateFunction = (key, options) => {
  const translation = helpers.getNestedValue(i18n.translations[i18n.locale], key);
  if (typeof translation !== 'string') return key;
  return options ? helpers.interpolate(translation, options) : translation;
};

const I18nContext = createContext<I18nContextProps>({
  locale: (LOCAL_UNITS.languageCode as AvailableLanguages) ?? LANGUAGE_CODES.EN,
  t: getTranslation,
  toggleI18n: () => {},
});

/**
 * ### Provides internationalization context to the app
 * @param {React.JSX.Element} props - React props containing `children`
 * @returns {React.JSX.Element} React context provider element
 * @example
 * <I18nProvider>
 *   <App />
 * </I18nProvider>
 */
const I18nProvider: React.FC<{ children: React.JSX.Element }> = ({
  children,
}): React.JSX.Element => {
  const [locale, setLocale] = useState<AvailableLanguages>(i18n.locale as AvailableLanguages);

  const toggleI18n = (newLocale: AvailableLanguages): void => {
    i18n.locale = newLocale;
    setLocale(newLocale);
  };

  const contextValue = useMemo<I18nContextProps>(
    () => ({ locale, t: getTranslation, toggleI18n }),
    [locale]
  );

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};

/**
 * ### Accesses the i18n context values
 * @returns {I18nContextProps} Locale info and translation utilities
 * @example
 * const { t, locale, toggleI18n } = useI18n();
 * const greeting = t('home.welcome', { name: 'Can' });
 */
const useI18n = (): I18nContextProps => useContext<I18nContextProps>(I18nContext);

export { I18nProvider, useI18n };
