import type { ExpoConfig } from '@expo/config';

const getSplashConfig = (): ExpoConfig['splash'] => ({
  backgroundColor: '#F5F5F5',
  image: './assets/images/splash-icon-dark.png',
  resizeMode: 'contain',
});

const getAndroidConfig = (): ExpoConfig['android'] => ({
  package: 'com.mces58.hangmanify',
  adaptiveIcon: {
    backgroundColor: '#151718',
    backgroundImage: './assets/icons/android/adaptive-icon.png',
    foregroundImage: './assets/icons/android/adaptive-icon.png',
    monochromeImage: './assets/icons/android/adaptive-icon.png',
  },
});

const getIosConfig = (): ExpoConfig['ios'] => ({
  icon: {
    dark: './assets/icons/ios/dark.png',
    light: './assets/icons/ios/light.png',
    tinted: './assets/icons/ios/tinted.png',
  },
});

const getWebConfig = (): ExpoConfig['web'] => ({
  bundler: 'metro',
  favicon: './assets/icons/web/favicon.png',
});

const assetPlugin: [string, Record<string, string[]>] = [
  'expo-asset',
  {
    assets: ['./assets/videos/intro.mp4'],
  },
];

const fontPlugin: [string, Record<string, string[]>] = [
  'expo-font',
  {
    fonts: [
      './assets/fonts/nunito/Nunito-Bold.ttf',
      './assets/fonts/nunito/Nunito-Light.ttf',
      './assets/fonts/nunito/Nunito-Medium.ttf',
      './assets/fonts/nunito/Nunito-Regular.ttf',
      './assets/fonts/nunito/Nunito-SemiBold.ttf',
      './assets/fonts/poppins/Poppins-Bold.ttf',
      './assets/fonts/poppins/Poppins-Light.ttf',
      './assets/fonts/poppins/Poppins-Medium.ttf',
      './assets/fonts/poppins/Poppins-Regular.ttf',
      './assets/fonts/poppins/Poppins-SemiBold.ttf',
    ],
  },
];

const splashScreenPlugin: [string, Record<string, unknown>] = [
  'expo-splash-screen',
  {
    backgroundColor: '#F5F5F5',
    image: './assets/images/splash-icon-dark.png',
    resizeMode: 'contain',
    dark: {
      backgroundColor: '#151718',
      image: './assets/images/splash-icon-light.png',
    },
  },
];

const videoPlugin: [string, Record<string, boolean>] = [
  'expo-video',
  {
    supportsBackgroundPlayback: true,
    supportsPictureInPicture: true,
  },
];

export default ({ config }: { config: ExpoConfig }): ExpoConfig => ({
  ...config,
  android: getAndroidConfig(),
  ios: getIosConfig(),
  name: process.env.STORYBOOK_ENABLED ? 'Hangmanify Storybook' : config.name,
  plugins: [assetPlugin, 'expo-localization', fontPlugin, splashScreenPlugin, videoPlugin],
  splash: getSplashConfig(),
  web: getWebConfig(),
  extra: {
    ...config.extra,
    eas: { projectId: 'ce993388-e5cf-41ce-9527-7554d7de672a' },
    storybookEnabled: process.env.STORYBOOK_ENABLED as boolean,
  },
});
