import { Asset } from 'expo-asset';
import * as VideoThumbnails from 'expo-video-thumbnails';

interface GenerateThumbnail {
  request: {
    time: number;
    uri: string;
  };
  response: {
    readonly height: number;
    readonly uri: string;
    readonly width: number;
  };
}
interface LoadVideoAsset {
  request: {
    source: number | string;
  };
  response: {
    readonly uri: string | null;
  };
}

/**
 * ### Generates a thumbnail from a video at a specific timestamp
 * @param {GenerateThumbnail['request']} options - Options including video URI and timestamp
 * @param {string} options.uri - Video file URI
 * @param {number} options.time - Timestamp (in seconds) for the thumbnail
 * @returns {Promise<GenerateThumbnail['response'] | null>} Thumbnail metadata or null on error
 * @example
 * const { height, uri, width } = await generateThumbnail({ uri: videoUri, time: 2 });
 */
const generateThumbnail = async ({
  time,
  uri,
}: GenerateThumbnail['request']): Promise<GenerateThumbnail['response'] | null> => {
  try {
    const result = await VideoThumbnails.getThumbnailAsync(uri, { time });
    return { height: result.height, uri: result.uri, width: result.width };
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * ### Loads and resolves the local URI of a video asset
 * @param {LoadVideoAsset['request']} options - Options including the video asset source
 * @param {number | string} options.source - Video asset source (local module via `require` or remote URI)
 * @returns {Promise<LoadVideoAsset['response'] | null>} Loaded asset URI or null on error
 * @example
 * const { uri } = await loadVideoAsset({ source: require('./video.mp4') });
 */
const loadVideoAsset = async ({
  source,
}: LoadVideoAsset['request']): Promise<LoadVideoAsset['response'] | null> => {
  try {
    const asset = Asset.fromModule(source);
    await asset.downloadAsync();
    return { uri: asset.localUri };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { generateThumbnail, loadVideoAsset };
