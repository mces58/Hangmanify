import { Dimensions, PixelRatio } from 'react-native';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const BLEND_ZONE = 5;

const BREAKPOINTS = {
  '2xl': { scale: 1.4, size: 840 },
  '2xs': { scale: 0.65, size: 320 },
  lg: { scale: 1.1, size: 600 },
  'lg-xl': { scale: 1.15, size: 680 },
  md: { scale: 1, size: 480 },
  'md-lg': { scale: 1.05, size: 540 },
  sm: { scale: 0.85, size: 390 },
  'sm-md': { scale: 0.9, size: 420 },
  xl: { scale: 1.2, size: 760 },
  'xl-2xl': { scale: 1.3, size: 800 },
  xs: { scale: 0.75, size: 360 },
  'xs-2xs': { scale: 0.7, size: 340 },
  'xs-sm': { scale: 0.75, size: 375 },
} as const;

const easeIn = (t: number): number => t * t;
const easeOut = (t: number): number => t * (2 - t);

const getScale = (width: number): number => {
  const breakpoints = Object.values(BREAKPOINTS).sort((x, y) => x.size - y.size);

  if (width <= breakpoints[0].size) return breakpoints[0].scale;
  if (width >= breakpoints[breakpoints.length - 1].size)
    return breakpoints[breakpoints.length - 1].scale;

  for (let i = 0; i < breakpoints.length - 1; i++) {
    const current = breakpoints[i];
    const next = breakpoints[i + 1];

    if (width >= current.size && width < next.size) {
      const scaleRange = next.scale - current.scale;
      const widthRange = next.size - current.size;
      const delta = width - current.size;

      let finalProgress;

      if (delta < BLEND_ZONE) {
        const t = delta / BLEND_ZONE;
        finalProgress = easeIn(t) * (BLEND_ZONE / widthRange);
      } else if (delta > widthRange - BLEND_ZONE) {
        const t = (delta - (widthRange - BLEND_ZONE)) / BLEND_ZONE;
        finalProgress =
          (widthRange - BLEND_ZONE) / widthRange + easeOut(t) * (BLEND_ZONE / widthRange);
      } else finalProgress = delta / widthRange;

      return current.scale + scaleRange * finalProgress;
    }
  }

  return 1;
};

const scale = getScale(deviceWidth);

const clampPercent = (percent: number): number => Math.max(0, Math.min(100, percent));

/**
 * ### Scales a horizontal size value based on screen width and scale factor
 * @param {number} size - The original design size
 * @returns {number} The scaled value
 * @example
 * const width = hs(16);
 */
const hs = (size: number): number => (deviceWidth / guidelineBaseWidth) * size * scale;

/**
 * ### Scales a vertical size value based on screen height
 * @param {number} size - The original design size
 * @returns {number} The scaled value
 * @example
 * const height = vs(12);
 */
const vs = (size: number): number => (deviceHeight / guidelineBaseHeight) * size;

/**
 * ### Converts a percentage into a pixel value based on screen width
 * @param {number} percent - A value between 0 and 100
 * @returns {number} The corresponding pixel width
 * @example
 * const boxWidth = wp(50); // 50% of screen width
 */
const wp = (percent: number): number => (deviceWidth * clampPercent(percent)) / 100;

/**
 * ### Converts a percentage into a pixel value based on screen height
 * @param {number} percent - A value between 0 and 100
 * @returns {number} The corresponding pixel height
 * @example
 * const boxHeight = hp(30); // 30% of screen height
 */
const hp = (percent: number): number => (deviceHeight * clampPercent(percent)) / 100;

/**
 * ### Applies moderate scaling to a size based on device width
 * @param {number} size - The original size
 * @param {number} [factor=0.5] - Scaling factor (between 0 and 1)
 * @returns {number} The moderately scaled size
 * @example
 * const spacing = ms(20); // Scaled between 20 and hs(20)
 */
const ms = (size: number, factor = 0.5): number => size + (hs(size) - size) * factor;

/**
 * ### Scales font size based on device width and font scaling settings
 * @param {number} size - The original font size
 * @returns {number} The scaled font size
 * @example
 * const headingFontSize = fs(18);
 */
const fs = (size: number): number => {
  const fontScale = PixelRatio.getFontScale();
  return Math.round(PixelRatio.roundToNearestPixel(hs(size) * fontScale));
};

export const dimensions = { fs, hp, hs, ms, vs, wp };
