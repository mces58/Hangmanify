import * as Font from 'expo-font';

import { APP_FONTS } from 'assets/fonts';

// don't import from '../styles' here — it causes a circular dependency:
// themes.ts → styles/index.ts → load-fonts.ts → themes.ts
// instead, import directly from specific files like '../styles/fonts'
import { FONTS } from 'src/constants/styles/fonts';

/**
 * ### Loads custom fonts using Expo's Font module
 * @returns {Promise<void>} Resolves when all fonts are loaded; logs an error if loading fails
 * @example
 * import { loadFonts } from './path/to/fonts';
 * useEffect(() => {
 *   loadFonts();
 * }, []);
 */
export const loadFonts = async (): Promise<void> => {
  try {
    await Font.loadAsync({
      [FONTS.Nunito.Bold]: APP_FONTS.nunito.bold,
      [FONTS.Nunito.Light]: APP_FONTS.nunito.light,
      [FONTS.Nunito.Medium]: APP_FONTS.nunito.medium,
      [FONTS.Nunito.Regular]: APP_FONTS.nunito.regular,
      [FONTS.Nunito.SemiBold]: APP_FONTS.nunito.semibold,
      [FONTS.Poppins.Bold]: APP_FONTS.poppins.bold,
      [FONTS.Poppins.Light]: APP_FONTS.poppins.light,
      [FONTS.Poppins.Medium]: APP_FONTS.poppins.medium,
      [FONTS.Poppins.Regular]: APP_FONTS.poppins.regular,
      [FONTS.Poppins.SemiBold]: APP_FONTS.poppins.semibold,
    });
  } catch (error) {
    console.error('Error loading fonts', error);
  }
};
