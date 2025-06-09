import type { ViewStyle } from 'react-native';

/**### Props for configuring the customizable Video component*/
export interface VideoProps {
  /**- Source of the video; can be a local module (number) or a remote URL (string)*/
  source: number | string;

  /**- If true, the video starts playing automatically when loaded*/
  autoPlay?: boolean;

  /**- Defines how the video content should scale to fit its container*/
  contentFit?: 'contain' | 'cover' | 'fill';

  /**- Initial playback position of the video in seconds*/
  initialPosition?: number;

  /**- If true, the video will replay automatically after finishing*/
  loop?: boolean;

  /**- Mutes the video audio if set to true*/
  muted?: boolean;

  /**- Adds a shadow effect around the video container*/
  shadow?: '2xl' | 'lg' | 'md' | 'none' | 'sm' | 'xl' | 'xs';

  /**- Plays the video when it is pressed, if enabled*/
  shouldPlayOnPress?: boolean;

  /**- Shows native or custom playback controls over the video*/
  showControls?: boolean;

  /**- Sets custom dimensions and border radius for the video container*/
  size?: Pick<ViewStyle, 'borderRadius' | 'height' | 'width'>;

  /**- Thumbnail generation options for the video*/
  thumbnail?: { enabled: boolean; time: number };

  /**- Volume level of the video from 0 (muted) to 1 (maximum)*/
  volume?: number;
}
