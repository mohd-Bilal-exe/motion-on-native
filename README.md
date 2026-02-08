# Motion on Native

Framer Motion–inspired animations for React Native built on Reanimated.

## Installation

```bash
npm install motion-on-native
# or
yarn add motion-on-native
```

## Prerequisites

This package requires:

- `react-native-reanimated` >= 3.0.0
- `react-native` >= 0.60.0
- `react` >= 16.8.0

## Usage

### Basic Animation

```tsx
import { NativeMotion } from 'motion-on-native';

<NativeMotion.View
  initial={{ opacity: 0, translateX: -100 }}
  animate={{ opacity: 1, translateX: 0 }}
  transition={{ type: 'spring', damping: 15, stiffness: 100 }}
>
  <Text>Animated content</Text>
</NativeMotion.View>;
```

### Exit Animations with AnimatedExit

```tsx
import { NativeMotion, AnimatedExit } from 'motion-on-native';

<AnimatedExit>
  {isVisible && (
    <NativeMotion.View
      key="item"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', damping: 15 }}
    >
      <Text>I will animate out when removed</Text>
    </NativeMotion.View>
  )}
</AnimatedExit>;
```

## Components

- `NativeMotion.View`
- `NativeMotion.Text`
- `NativeMotion.Image`
- `NativeMotion.ImageBackground`
- `NativeMotion.TextInput`
- `NativeMotion.TouchableOpacity`
- `NativeMotion.ScrollView`
- `NativeMotion.FlatList`
- `NativeMotion.SectionList`
- `NativeMotion.Pressable`

## AnimatedExit

Enables exit animations for components being removed from the tree.

### Props

- `mode`: 'sync' | 'wait' - Animation mode (default: 'sync')
- `onExitComplete`: () => void - Callback when all exit animations complete

### Important Notes

- Each child must have a unique `key` prop
- Only direct children with `exit` prop will animate out
- Component unmounts after exit animation completes

## Component Props

- `initial`: AnimationProps | false - Initial animation state
- `animate`: AnimationProps - Target animation state
- `exit`: AnimationProps - Exit animation state (requires AnimatedExit)
- `transition`: TransitionProps - Animation configuration
- `styles`: ViewStyle - Additional styles

## Animation Properties

### Transform

- `opacity`: 0-1
- `translateX`, `translateY`: translation in pixels
- `scale`, `scaleX`, `scaleY`: size multipliers
- `rotate`, `rotateX`, `rotateY`, `rotateZ`: rotation (e.g., '45deg')
- `skewX`, `skewY`: skew transformations

### Layout

- `width`, `height`: dimensions

### Spacing

- `margin`, `marginTop`, `marginBottom`, `marginLeft`, `marginRight`
- `marginHorizontal`, `marginVertical`
- `padding`, `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`
- `paddingHorizontal`, `paddingVertical`

### Border

- `borderRadius`, `borderTopLeftRadius`, `borderTopRightRadius`, `borderBottomLeftRadius`, `borderBottomRightRadius`
- `borderWidth`, `borderTopWidth`, `borderBottomWidth`, `borderLeftWidth`, `borderRightWidth`
- `borderColor`, `borderTopColor`, `borderBottomColor`, `borderLeftColor`, `borderRightColor`

### Colors (BETA)

Color interpolation uses Reanimated color interpolation and may change in future releases.

### Position

- `top`, `bottom`, `left`, `right`: positioning

### Shadow (iOS)

- `shadowColor`, `shadowOpacity`, `shadowRadius`

### Elevation (Android)

- `elevation`: shadow depth

## Transition Configuration

```tsx
// Spring animation (default)
transition={{
  type: 'spring',
  damping: 15,
  stiffness: 100,
  mass: 1
}}

// Timing animation
transition={{
  type: 'timing',
  duration: 300,
  delay: 100
}}

// Repeating animation
transition={{
  type: 'timing',
  duration: 1000,
  repeat: 'infinity', // or number
  repeatType: 'reverse' // or 'loop'
}}
```

### Transition Properties

- `type`: 'spring' | 'timing'
- `duration`: animation duration in ms
- `damping`: spring damping (spring only)
- `stiffness`: spring stiffness (spring only)
- `mass`: spring mass (spring only)
- `delay`: delay before animation starts
- `ease`: easing function name
- `repeat`: number of repeats or 'infinity'
- `repeatType`: 'loop' | 'reverse'

## Scope & Non-goals

Motion on Native focuses on declarative animations and exit presence.
It does not aim to fully replicate Motion’s web feature set
(e.g. layout animations, gestures, or shared layout transitions).

## Acknowledgements

This library adapts core animation concepts and presence-management ideas from
Motion (formerly Framer Motion), which is licensed under the MIT License.

AnimatedExit is inspired by Motion’s presence system, reimplemented for
React Native using Reanimated.

© Framer B.V.

## License

MIT
