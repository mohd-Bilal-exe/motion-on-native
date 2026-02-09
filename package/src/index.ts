import React, { ComponentType, useCallback, useEffect, useRef } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  SectionList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { AnimationProps, MotionComponentProps, TransitionProps } from './types/types';

const DEFAULT_TRANSITION: TransitionProps = {
  type: 'spring',
  damping: 15,
  stiffness: 100,
  duration: 300,
  repeat: 0,
  repeatType: 'loop',
};

function createMotionComponent<T extends ComponentType<any>>(Component: T) {
  return React.forwardRef<any, MotionComponentProps & React.ComponentProps<T>>((props, ref) => {
    const {
      initial = {},
      animate = {},
      exit = {},
      presenceAnimation = {},
      transition = DEFAULT_TRANSITION,
      whileHover, // Future Implementation
      whileTap, // Future Implementation
      whileFocus, // Future Implementation
      layout, // Future Implementation
      layoutId, // Future Implementation
      styles = {},
      children,
      animationId = null,
      isPresent,
      onExitComplete,
      exitComplete,
      markPresent,
      ...rest
    } = props;
    const sharedValues: {
      [key: string]: ReturnType<typeof useSharedValue<number> | typeof useSharedValue<string>>;
    } = useRef({
      opacity: useSharedValue(0),
      scale: useSharedValue(1),
      scaleX: useSharedValue(1),
      scaleY: useSharedValue(1),
      x: useSharedValue(0),
      y: useSharedValue(0),
      z: useSharedValue(0),
      translateX: useSharedValue(0),
      translateY: useSharedValue(0),

      shadowOpacity: useSharedValue(0),
      shadowRadius: useSharedValue(0),
      elevation: useSharedValue(0),
      width: useSharedValue(0),
      height: useSharedValue(0),
      margin: useSharedValue(0),
      marginTop: useSharedValue(0),
      marginBottom: useSharedValue(0),
      marginLeft: useSharedValue(0),
      marginRight: useSharedValue(0),
      marginHorizontal: useSharedValue(0),
      marginVertical: useSharedValue(0),
      padding: useSharedValue(0),
      paddingTop: useSharedValue(0),
      paddingBottom: useSharedValue(0),
      paddingLeft: useSharedValue(0),
      paddingRight: useSharedValue(0),
      paddingHorizontal: useSharedValue(0),
      paddingVertical: useSharedValue(0),
      borderRadius: useSharedValue(0),
      borderTopLeftRadius: useSharedValue(0),
      borderTopRightRadius: useSharedValue(0),
      borderBottomLeftRadius: useSharedValue(0),
      borderBottomRightRadius: useSharedValue(0),
      borderWidth: useSharedValue(0),
      borderTopWidth: useSharedValue(0),
      borderBottomWidth: useSharedValue(0),
      borderLeftWidth: useSharedValue(0),
      borderRightWidth: useSharedValue(0),
      top: useSharedValue(0),
      bottom: useSharedValue(0),
      left: useSharedValue(0),
      right: useSharedValue(0),
      // ColorProgress
      backgroundColor: useSharedValue(0), // use Interpolation 'transparent',
      color: useSharedValue(0), // use Interpolation 'transparent',
      borderColor: useSharedValue(0), // use Interpolation 'transparent',
      // Color targets as shared values
      backgroundColorTo: useSharedValue(getInitialValue('backgroundColor', animate) as string),
      colorTo: useSharedValue(getInitialValue('color', animate) as string),
      borderColorTo: useSharedValue(getInitialValue('borderColor', animate) as string),
      shadowColorTo: useSharedValue(getInitialValue('shadowColor', animate) as string),

      // Transform values
      rotate: useSharedValue('0deg'), // use interpolation '0deg',
      rotateX: useSharedValue('0deg'), // use interpolation ''0deg'deg',
      rotateY: useSharedValue('0deg'), // use interpolation ''0deg'deg',
      rotateZ: useSharedValue('0deg'), // use interpolation ''0deg'deg',
      skewX: useSharedValue('0deg'), // use interpolation ''0deg'deg',
      skewY: useSharedValue('0deg'), // use interpolation '0deg',
    }).current;
    let colorFrom = {
      backgroundColor: getInitialValue('backgroundColor', initial) as string,
      color: getInitialValue('color', initial) as string,
      borderColor: getInitialValue('borderColor', initial) as string,
      shadowColor: getInitialValue('shadowColor', initial) as string,
    };

    const trackAniamtion = (finished: boolean | undefined) => {
      if (finished && onExitComplete) {
        runOnJS(onExitComplete)();
      }
    };
    // Animation helper
    const animateToValues = useCallback(
      (targetValues: AnimationProps, transitionConfig = transition, isChildPresent: boolean) => {
        Object.entries(targetValues).forEach(([key, value]) => {
          if (value !== undefined) {
            // Handle color properties
            if (['backgroundColor', 'color', 'borderColor', 'shadowColor'].includes(key)) {
              const progress = sharedValues[key];
              // Capture current interpolated color as new 'from' value
              const currentColor = interpolateColor(
                progress.value as number,
                [0, 1],
                [colorFrom[key as keyof typeof colorFrom], sharedValues[`${key}To`].value as string]
              );
              colorFrom[key as keyof typeof colorFrom] = currentColor;
              sharedValues[`${key}To`].value = value as string;
              progress.value = 0;
              progress.value = withDelay(
                transitionConfig.delay ?? DEFAULT_TRANSITION.delay!,
                withTiming(
                  1,
                  {
                    duration: transitionConfig.duration ?? DEFAULT_TRANSITION.duration!,
                  },
                  trackAniamtion
                )
              );
              return;
            }

            // Handle non-color properties
            const sharedValue = getSharedValue(key);
            if (sharedValue) {
              let config;

              if (
                transitionConfig.repeat &&
                (transitionConfig.repeat > 0 || transitionConfig.repeat === 'infinity')
              ) {
                const baseAnimation =
                  transitionConfig.type === 'spring'
                    ? withDelay(
                        transitionConfig.delay ?? DEFAULT_TRANSITION.delay!,
                        withSpring(
                          value,
                          {
                            damping: transitionConfig.damping ?? DEFAULT_TRANSITION.damping!,
                            stiffness: transitionConfig.stiffness ?? DEFAULT_TRANSITION.stiffness!,
                            mass: transitionConfig.mass ?? 1,
                          },
                          trackAniamtion
                        )
                      )
                    : withDelay(
                        transitionConfig.delay ?? DEFAULT_TRANSITION.delay!,
                        withTiming(
                          value,
                          {
                            duration: transitionConfig.duration ?? DEFAULT_TRANSITION.duration!,
                            easing: Easing.linear,
                          },
                          trackAniamtion
                        )
                      );

                const repeatCount =
                  transitionConfig.repeat === 'infinity' ? -1 : transitionConfig.repeat;
                const reverse = transitionConfig.repeatType === 'reverse';

                config = withRepeat(baseAnimation, repeatCount, reverse);
              } else {
                config =
                  transitionConfig.type === 'spring'
                    ? withSpring(
                        value,
                        {
                          damping: transitionConfig.damping ?? DEFAULT_TRANSITION.damping!,
                          stiffness: transitionConfig.stiffness ?? DEFAULT_TRANSITION.stiffness!,
                          mass: transitionConfig.mass ?? 1,
                        },
                        trackAniamtion
                      )
                    : withTiming(
                        value,
                        {
                          duration: transitionConfig.duration ?? DEFAULT_TRANSITION.duration!,
                        },
                        trackAniamtion
                      );
              }

              if (transitionConfig.delay) {
                sharedValue.value = withDelay(transitionConfig.delay, config);
              } else {
                sharedValue.value = config;
              }
            }
          }
        });
        if (!isChildPresent && exitComplete && animationId) {
          exitComplete.set(animationId, true);
        }
      },
      [transition]
    );

    // Get shared value by key
    const getSharedValue = useCallback((key: string) => {
      return sharedValues[key];
    }, []);
    // Set initial values on mount in initial exist
    useEffect(() => {
      if (initial !== false) {
        Object.entries(initial as AnimationProps).forEach(([key, value]) => {
          const ExtractedsharedValue = sharedValues[key];
          if (ExtractedsharedValue && value !== undefined) {
            ExtractedsharedValue.value = value;
          }
        });
      }
      runOnJS(markPresent)();
    }, []);

    // Handle shouldAnimate: initial -> animate
    useEffect(() => {
      animateToValues(animate, transition, isPresent);
    }, [animate]);

    // Animated style
    const animatedStyle = useAnimatedStyle(() => {
      const style: any = {};
      const transform: any[] = [];
      Object.entries(animate).forEach(([key]) => {
        const sharedValue = sharedValues[key];
        if (
          [
            'translateX',
            'translateY',
            'scale',
            'scaleX',
            'scaleY',
            'rotate',
            'rotateX',
            'rotateY',
            'rotateZ',
            'skewX',
            'skewY',
          ].includes(key)
        ) {
          transform.push({ [key]: sharedValue.value });
        } else if (['borderColor', 'backgroundColor', 'color', 'shadowColor'].includes(key)) {
          style[key] = interpolateColor(
            sharedValue.value as number,
            [0, 1],
            [colorFrom[key as keyof typeof colorFrom], sharedValues[`${key}To`].value as string]
          );
        } else {
          style[key] = sharedValue.value;
        }
      });

      if (transform.length > 0) style.transform = transform;
      return style;
    });

    const AnimatedComponent = Animated.createAnimatedComponent(Component);
    return React.createElement(
      AnimatedComponent,
      {
        ref,
        style: [styles, animatedStyle],
        ...(rest as any),
      },
      children
    );
  });
}

function getInitialValue(key: string, initial: AnimationProps | false): number | string {
  if (initial === false) {
    const initValue = getDefaultValue(key);
    return initValue;
  }

  const value = (initial as AnimationProps)[key as keyof AnimationProps];
  return value !== undefined ? value : getDefaultValue(key);
}

function getDefaultValue(key: string): number | string {
  const defaultValues = {
    opacity: 1,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    x: 0,
    y: 0,
    z: 0,
    translateX: 0,
    translateY: 0,
    rotate: '0deg',
    rotateX: '0deg',
    rotateY: '0deg',
    rotateZ: '0deg',
    skewX: '0deg',
    skewY: '0deg',
    backgroundColor: 'transparent',
    color: 'transparent',
    borderColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    width: 0,
    height: 0,
    margin: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginHorizontal: 0,
    marginVertical: 0,
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  return defaultValues[key as keyof typeof defaultValues];
}

export { AnimatedExit } from './AnimatedExit';
export type { AnimatedExitProps } from './AnimatedExit';
export const NativeMotion = {
  View: createMotionComponent(View),
  Text: createMotionComponent(Text),
  Image: createMotionComponent(Image),
  ImageBackground: createMotionComponent(ImageBackground),
  TextInput: createMotionComponent(TextInput),
  TouchableOpacity: createMotionComponent(TouchableOpacity),
  ScrollView: createMotionComponent(ScrollView),
  FlatList: createMotionComponent(FlatList),
  SectionList: createMotionComponent(SectionList),
  Pressable: createMotionComponent(Pressable),
};
