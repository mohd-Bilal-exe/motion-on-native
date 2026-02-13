import { ViewStyle } from 'react-native';

export interface AnimationProps {
  // Transform properties
  opacity?: number;
  translateX?: number;
  translateY?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  rotate?: string;
  rotateX?: string;
  rotateY?: string;
  rotateZ?: string;
  skewX?: string;
  skewY?: string;

  // Layout properties
  width?: number;
  height?: number;

  // Spacing properties
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  padding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;

  // Border properties
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderWidth?: number;
  borderTopWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;
  borderColor?: string;

  // Color properties
  backgroundColor?: string;
  color?: string;

  // Position properties
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;

  // Shadow properties (iOS)
  shadowColor?: string;
  shadowOpacity?: number;
  shadowRadius?: number;

  // Elevation (Android)
  elevation?: number;
}

export interface TransitionProps {
  type?: 'spring' | 'timing';
  duration?: number;
  damping?: number;
  stiffness?: number;
  mass?: number;
  delay?: number;
  ease?: 'linear' | 'ease' | 'ease-in' | 'ease-in-out' | 'ease-out' | 'step-start' | 'step-end';
  repeat?: number | 'infinity';
  repeatType?: 'loop' | 'reverse';
}

export interface MotionComponentProps {
  initial?: AnimationProps | false;
  animate?: AnimationProps;
  exit?: AnimationProps;
  presenceAnimation: { entring: LayoutEntryAnimation; exiting: LayoutExitAnimation };
  transition?: TransitionProps;
  whileHover?: AnimationProps; // Future Implementation
  whileTap?: AnimationProps; // Future Implementation
  whileFocus?: AnimationProps; // Future Implementation
  layout?: boolean; // Future Implementation
  layoutId?: string; // Future Implementation
  styles?: ViewStyle;
  children?: React.ReactNode;
  animationId?: string | number;
  onExitComplete?: () => void;
  isPresent?: boolean;
}

export type LayoutEntryAnimation =
  | 'FadeIn'
  | 'FadeInRight'
  | 'FadeInLeft'
  | 'FadeInUp'
  | 'FadeInDown'
  | 'BounceIn'
  | 'BounceInRight'
  | 'BounceInLeft'
  | 'BounceInUp'
  | 'BounceInDown'
  | 'FlipInEasyX'
  | 'FlipInEasyY'
  | 'FlipInXDown'
  | 'FlipInXUp'
  | 'FlipInYLeft'
  | 'FlipInYRight'
  | 'LightSpeedInRight'
  | 'LightSpeedInLeft'
  | 'PinwheelIn'
  | 'RollInRight'
  | 'RollInLeft'
  | 'RotateInDownLeft'
  | 'RotateInDownRight'
  | 'RotateInUpLeft'
  | 'RotateInUpRight'
  | 'SlideInRight'
  | 'SlideInLeft'
  | 'SlideInUp'
  | 'SlideInDown'
  | 'StretchInX'
  | 'StretchInY'
  | 'ZoomIn'
  | 'ZoomInDown'
  | 'ZoomInEasyDown'
  | 'ZoomInEasyUp'
  | 'ZoomInLeft'
  | 'ZoomInRight'
  | 'ZoomInRotate'
  | 'ZoomInUp';
export type LayoutExitAnimation =
  | 'FadeOut'
  | 'FadeOutRight'
  | 'FadeOutLeft'
  | 'FadeOutUp'
  | 'FadeOutDown'
  | 'BounceOut'
  | 'BounceOutRight'
  | 'BounceOutLeft'
  | 'BounceOutUp'
  | 'BounceOutDown'
  | 'FlipOutEasyX'
  | 'FlipOutEasyY'
  | 'FlipOutXDown'
  | 'FlipOutXUp'
  | 'FlipOutYLeft'
  | 'FlipOutYRight'
  | 'LightSpeedOutRight'
  | 'LightSpeedOutLeft'
  | 'PinwheelOut'
  | 'RollOutRight'
  | 'RollOutLeft'
  | 'RotateOutDownLeft'
  | 'RotateOutDownRight'
  | 'RotateOutUpLeft'
  | 'RotateOutUpRight'
  | 'SlideOutRight'
  | 'SlideOutLeft'
  | 'SlideOutUp'
  | 'SlideOutDown'
  | 'StretchOutX'
  | 'StretchOutY'
  | 'ZoomOut'
  | 'ZoomOutDown'
  | 'ZoomOutEasyDown'
  | 'ZoomOutEasyUp'
  | 'ZoomOutLeft'
  | 'ZoomOutRight'
  | 'ZoomOutRotate'
  | 'ZoomOutUp';
