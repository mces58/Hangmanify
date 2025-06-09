import { useCallback, useEffect, useState } from 'react';

import type { VideoPlayer as ExpoVideoPlayer, VideoSource } from 'expo-video';
import { useVideoPlayer as useExpoVideoPlayer } from 'expo-video';

import { generateThumbnail, loadVideoAsset } from './functions';

interface LoadVideo {
  request: {
    source: number | string;
  };
  response: {
    readonly uri: string | null;
  };
}
interface Thumbnail {
  request: {
    enabled: boolean;
    time: number;
    uri: string | null;
  };
  response: {
    readonly uri: string | null;
  };
}
interface VideoPlayer {
  request: {
    source: VideoSource;
    config: {
      autoPlay: boolean;
      initialPosition: number;
      loop: boolean;
      muted: boolean;
      volume: number;
    };
    onPlay?: () => void;
  };
  response: {
    readonly player: ExpoVideoPlayer;
  };
}

/**
 * ### Loads a video asset and resolves its local URI
 * @param {LoadVideo['request']} options - Options including the video file source
 * @param {number | string} options.source - The video file source (local require(...) or remote URI)
 * @returns {LoadVideo['response']} The loaded video URI
 * @example
 * const { uri } = useLoadVideo({ source: require('./video.mp4') });
 */
const useLoadVideo = ({ source }: LoadVideo['request']): LoadVideo['response'] => {
  const [videoUri, setVideoUri] = useState<string | null>(null);

  useEffect((): (() => void) => {
    let isActive = true;

    // @safe
    const loadVideo = async (): Promise<void> => {
      const result = await loadVideoAsset({ source });
      if (isActive && result) setVideoUri(result.uri);
    };

    loadVideo();

    return () => {
      isActive = false;
    };
  }, [source]);

  return { uri: videoUri };
};

/**
 * ### Generates a thumbnail from a video at the specified time
 * @param {Thumbnail['request']} options - Options including whether generation is enabled, target time, and video URI
 * @param {boolean} options.enabled - Whether thumbnail generation is active
 * @param {number} options.time - Target time (in seconds) to extract the thumbnail
 * @param {string | null} options.uri - Video URI
 * @returns {Thumbnail['response']} The thumbnail URI or null
 * @example
 * const { uri: thumbnail } = useThumbnail({ enabled: true, time: 2, uri: videoUri });
 */
const useThumbnail = ({ enabled, time, uri }: Thumbnail['request']): Thumbnail['response'] => {
  const [thumbnailUri, setThumbnailUri] = useState<string | null>(null);

  useEffect((): (() => void) => {
    let isActive = true;

    // @safe
    const generate = async (): Promise<void> => {
      if (!enabled || !uri) return;

      const results = await generateThumbnail({ time: Math.max(0, time) * 1000, uri });
      if (isActive && results) setThumbnailUri(results.uri);
    };

    generate();

    return () => {
      isActive = false;
    };
  }, [enabled, uri, time]);

  return { uri: thumbnailUri };
};

/**
 * ### Initializes a video player with custom config and optional autoplay
 * @param {VideoPlayer['request']} options - Configuration options for the video player
 * @param {VideoSource} options.source - Source for the video (e.g., local or remote URI)
 * @param {object} options.config - Playback settings
 * @param {() => void} options.onPlay - Callback triggered after autoplay
 * @returns {VideoPlayer['response']} The initialized video player instance
 * @example
 * const { player } = useVideoPlayer({
 *   source: videoSource,
 *   config: { autoPlay: true, loop: false, muted: false, volume: 1, initialPosition: 0 },
 *   onPlay: () => console.log('Playing'),
 * });
 */
const useVideoPlayer = ({
  config,
  onPlay,
  source,
}: VideoPlayer['request']): VideoPlayer['response'] => {
  const initializePlayer = useCallback(
    (play: ExpoVideoPlayer) => {
      play.loop = config.loop;
      play.muted = config.muted;
      play.volume = Math.min(1, Math.max(0, config.volume));
      play.currentTime = Math.max(0, config.initialPosition);

      if (config.autoPlay) {
        play.play();
        onPlay?.();
      }
    },
    [config.autoPlay, config.initialPosition, config.loop, config.muted, config.volume, onPlay]
  );

  const player = useExpoVideoPlayer(source, initializePlayer);
  return { player };
};

export { useLoadVideo, useThumbnail, useVideoPlayer };
