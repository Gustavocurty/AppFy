import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 680;

export const horizontalScale = size => (width / guidelineBaseWidth) * size;
export const verticalScale = size => (height / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;
export const responsiveFont = size => {
  const scaled = moderateScale(size);
  return Platform.OS === 'web' ? Math.min(size + 2, scaled) : scaled;
};

export const isSmallDevice = width <= 360;
export const isMediumDevice = width > 360 && width <= 430;
export const isLargeDevice = width > 430;
