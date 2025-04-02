/* eslint-disable @custom-typescript/filename-match-component */
declare module '*.ttf' {
  import type { FontSource } from 'expo-font';
  const content: FontSource;
  export default content;
}

declare module '*.svg' {
  import type { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
