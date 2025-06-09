import React, { useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, View } from 'react-native';

import { VideoView } from 'expo-video';

import { useTheme } from 'src/contexts';

import { useLoadVideo, useThumbnail, useVideoPlayer } from './hooks';
import { mergeVideoProps } from './initial';
import type { VideoProps } from './types';

/**
 * ### Custom Video component built on top of expo-video
 * @param {Readonly<VideoProps>} props - Video configuration and display options
 * @returns {React.JSX.Element} Rendered video player with optional thumbnail and controls
 * @example
 * <Video
 *   source={require('./video.mp4')}
 *   showControls
 *   autoPlay={false}
 *   thumbnail={{ enabled: true, time: 1 }}
 * />
 */
const Video: React.FC<Readonly<VideoProps>> = (props): React.JSX.Element => {
  const {
    autoPlay,
    contentFit,
    initialPosition,
    loop,
    muted,
    shadow,
    shouldPlayOnPress,
    showControls,
    size,
    source,
    thumbnail,
    volume,
  } = useMemo(() => mergeVideoProps(props), [props]);

  const { theme } = useTheme();
  const hasPlayedOnce = useRef<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const loadUri = useLoadVideo({ source });
  const generatedThumbnailUri = useThumbnail({
    enabled: thumbnail.enabled,
    time: thumbnail.time,
    uri: loadUri.uri,
  });
  const { player } = useVideoPlayer({
    config: { autoPlay, initialPosition, loop, muted, volume },
    source: loadUri.uri,
    onPlay: () => setIsPlaying(true),
  });

  const handlePress = (): void => {
    if (!shouldPlayOnPress) return;

    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
      hasPlayedOnce.current = true;
    }
  };

  const shouldShowThumbnail =
    thumbnail.enabled && !autoPlay && !hasPlayedOnce.current && !!generatedThumbnailUri.uri;

  return (
    <View
      className={shadow ? `overflow-hidden shadow-${shadow}` : 'overflow-hidden'}
      style={[size, shadow && { shadowColor: theme.palette.shadow }]}
    >
      {!loadUri.uri ? (
        <ActivityIndicator style={StyleSheet.absoluteFill} />
      ) : (
        <>
          <VideoView
            allowsFullscreen
            allowsPictureInPicture
            contentFit={contentFit}
            nativeControls={showControls}
            player={player}
            style={size}
          />
          {shouldShowThumbnail && (
            <Pressable style={StyleSheet.absoluteFill} onPress={handlePress}>
              {!!generatedThumbnailUri.uri && (
                <Image
                  resizeMode="cover"
                  source={{ uri: generatedThumbnailUri.uri }}
                  style={[StyleSheet.absoluteFill, size]}
                />
              )}
            </Pressable>
          )}
          {shouldPlayOnPress && !showControls && !shouldShowThumbnail && (
            <Pressable style={StyleSheet.absoluteFill} onPress={handlePress} />
          )}
        </>
      )}
    </View>
  );
};

export default Video;
