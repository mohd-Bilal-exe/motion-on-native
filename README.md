# Motion on Native

Framer Motion-like animations for React Native using Reanimated.

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

```tsx
import { NativeMotion } from 'motion-on-native';

<NativeMotion.View
  initial={{ opacity: 0, translateX: -100 }}
  animate={{ opacity: 1, translateX: 0 }}
  transition={{ type: 'spring', damping: 15, stiffness: 100 }}
>
  <Text>Animated content</Text>
</NativeMotion.View>
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

## Props

- `initial`: AnimationProps | false - Initial animation state
- `animate`: AnimationProps - Target animation state
- `exit`: AnimationProps - Exit animation state
- `transition`: TransitionProps - Animation configuration
- `onExitComplete`: () => void - Called when exit animation completes
- `whileHover`: AnimationProps - Animation state while hovering
- `whileTap`: AnimationProps - Animation state while tapping
- `whileFocus`: AnimationProps - Animation state while focused
- `layout`: boolean - Enable layout animations
- `layoutId`: string - Layout animation identifier
- `styles`: ViewStyle - Additional styles

## Animation Properties

### Transform
- `opacity`: 0-1
- `x`, `y`, `z`: translation shortcuts
- `translateX`, `translateY`: translation in pixels
- `scale`, `scaleX`, `scaleY`: size multipliers
- `rotate`, `rotateX`, `rotateY`, `rotateZ`: rotation (e.g., '45deg')
- `skewX`, `skewY`: skew transformations

### Layout
- `width`, `height`: dimensions
- `minWidth`, `minHeight`, `maxWidth`, `maxHeight`: size constraints

### Spacing
- `margin`, `marginTop`, `marginBottom`, `marginLeft`, `marginRight`
- `marginHorizontal`, `marginVertical`
- `padding`, `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`
- `paddingHorizontal`, `paddingVertical`

### Border
- `borderRadius`, `borderTopLeftRadius`, `borderTopRightRadius`, `borderBottomLeftRadius`, `borderBottomRightRadius`
- `borderWidth`, `borderTopWidth`, `borderBottomWidth`, `borderLeftWidth`, `borderRightWidth`
- `borderColor`, `borderTopColor`, `borderBottomColor`, `borderLeftColor`, `borderRightColor`

### Colors
- `backgroundColor`: color value
- `color`: text color

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

## License

MIT
