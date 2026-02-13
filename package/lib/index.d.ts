import React from 'react';
import { View } from 'react-native';
import { MotionComponentProps } from './types/types';
export { AnimatedExit } from './AnimatedExit';
export type { AnimatedExitProps } from './AnimatedExit';
export declare const NativeMotion: {
    View: React.ForwardRefExoticComponent<MotionComponentProps & import("react-native").ViewProps & React.RefAttributes<any>>;
    Text: React.ForwardRefExoticComponent<MotionComponentProps & import("react-native").TextProps & React.RefAttributes<any>>;
    Image: React.ForwardRefExoticComponent<MotionComponentProps & import("react-native").ImageProps & React.RefAttributes<any>>;
    ImageBackground: React.ForwardRefExoticComponent<MotionComponentProps & import("react-native").ImageBackgroundProps & React.RefAttributes<any>>;
    TextInput: React.ForwardRefExoticComponent<MotionComponentProps & import("react-native").TextInputProps & React.RefAttributes<any>>;
    TouchableOpacity: React.ForwardRefExoticComponent<Omit<MotionComponentProps & import("react-native").TouchableOpacityProps & React.RefAttributes<View>, "ref"> & React.RefAttributes<any>>;
    ScrollView: React.ForwardRefExoticComponent<MotionComponentProps & import("react-native").ScrollViewProps & React.RefAttributes<any>>;
    FlatList: React.ForwardRefExoticComponent<MotionComponentProps & import("react-native").FlatListProps<unknown> & React.RefAttributes<any>>;
    SectionList: React.ForwardRefExoticComponent<MotionComponentProps & import("react-native").SectionListProps<unknown, unknown> & React.RefAttributes<any>>;
    Pressable: React.ForwardRefExoticComponent<Omit<MotionComponentProps & import("react-native").PressableProps & React.RefAttributes<View>, "ref"> & React.RefAttributes<any>>;
};
