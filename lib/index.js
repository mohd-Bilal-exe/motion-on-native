"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeMotion = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const DEFAULT_TRANSITION = {
    type: 'spring',
    damping: 15,
    stiffness: 100,
    duration: 300,
    repeat: 0,
    repeatType: 'loop',
};
function createMotionComponent(Component) {
    return react_1.default.forwardRef((props, ref) => {
        const { initial = {}, animate = {}, exit = {}, // Future Implementation
        transition = DEFAULT_TRANSITION, whileHover, // Future Implementation
        whileTap, // Future Implementation
        whileFocus, // Future Implementation
        layout, // Future Implementation
        layoutId, // Future Implementation
        styles = {}, children } = props, rest = __rest(props, ["initial", "animate", "exit", "transition", "whileHover", "whileTap", "whileFocus", "layout", "layoutId", "styles", "children"]);
        const sharedValues = (0, react_1.useRef)({
            opacity: (0, react_native_reanimated_1.useSharedValue)(0),
            scale: (0, react_native_reanimated_1.useSharedValue)(1),
            scaleX: (0, react_native_reanimated_1.useSharedValue)(1),
            scaleY: (0, react_native_reanimated_1.useSharedValue)(1),
            x: (0, react_native_reanimated_1.useSharedValue)(0),
            y: (0, react_native_reanimated_1.useSharedValue)(0),
            z: (0, react_native_reanimated_1.useSharedValue)(0),
            translateX: (0, react_native_reanimated_1.useSharedValue)(0),
            translateY: (0, react_native_reanimated_1.useSharedValue)(0),
            shadowOpacity: (0, react_native_reanimated_1.useSharedValue)(0),
            shadowRadius: (0, react_native_reanimated_1.useSharedValue)(0),
            elevation: (0, react_native_reanimated_1.useSharedValue)(0),
            width: (0, react_native_reanimated_1.useSharedValue)(0),
            height: (0, react_native_reanimated_1.useSharedValue)(0),
            margin: (0, react_native_reanimated_1.useSharedValue)(0),
            marginTop: (0, react_native_reanimated_1.useSharedValue)(0),
            marginBottom: (0, react_native_reanimated_1.useSharedValue)(0),
            marginLeft: (0, react_native_reanimated_1.useSharedValue)(0),
            marginRight: (0, react_native_reanimated_1.useSharedValue)(0),
            marginHorizontal: (0, react_native_reanimated_1.useSharedValue)(0),
            marginVertical: (0, react_native_reanimated_1.useSharedValue)(0),
            padding: (0, react_native_reanimated_1.useSharedValue)(0),
            paddingTop: (0, react_native_reanimated_1.useSharedValue)(0),
            paddingBottom: (0, react_native_reanimated_1.useSharedValue)(0),
            paddingLeft: (0, react_native_reanimated_1.useSharedValue)(0),
            paddingRight: (0, react_native_reanimated_1.useSharedValue)(0),
            paddingHorizontal: (0, react_native_reanimated_1.useSharedValue)(0),
            paddingVertical: (0, react_native_reanimated_1.useSharedValue)(0),
            borderRadius: (0, react_native_reanimated_1.useSharedValue)(0),
            borderTopLeftRadius: (0, react_native_reanimated_1.useSharedValue)(0),
            borderTopRightRadius: (0, react_native_reanimated_1.useSharedValue)(0),
            borderBottomLeftRadius: (0, react_native_reanimated_1.useSharedValue)(0),
            borderBottomRightRadius: (0, react_native_reanimated_1.useSharedValue)(0),
            borderWidth: (0, react_native_reanimated_1.useSharedValue)(0),
            borderTopWidth: (0, react_native_reanimated_1.useSharedValue)(0),
            borderBottomWidth: (0, react_native_reanimated_1.useSharedValue)(0),
            borderLeftWidth: (0, react_native_reanimated_1.useSharedValue)(0),
            borderRightWidth: (0, react_native_reanimated_1.useSharedValue)(0),
            top: (0, react_native_reanimated_1.useSharedValue)(0),
            bottom: (0, react_native_reanimated_1.useSharedValue)(0),
            left: (0, react_native_reanimated_1.useSharedValue)(0),
            right: (0, react_native_reanimated_1.useSharedValue)(0),
            // ColorProgress
            backgroundColor: (0, react_native_reanimated_1.useSharedValue)(0), // use Interpolation 'transparent',
            color: (0, react_native_reanimated_1.useSharedValue)(0), // use Interpolation 'transparent',
            borderColor: (0, react_native_reanimated_1.useSharedValue)(0), // use Interpolation 'transparent',
            // Color targets as shared values
            backgroundColorTo: (0, react_native_reanimated_1.useSharedValue)(getInitialValue('backgroundColor', animate)),
            colorTo: (0, react_native_reanimated_1.useSharedValue)(getInitialValue('color', animate)),
            borderColorTo: (0, react_native_reanimated_1.useSharedValue)(getInitialValue('borderColor', animate)),
            shadowColorTo: (0, react_native_reanimated_1.useSharedValue)(getInitialValue('shadowColor', animate)),
            // Transform values
            rotate: (0, react_native_reanimated_1.useSharedValue)('0deg'), // use interpolation '0deg',
            rotateX: (0, react_native_reanimated_1.useSharedValue)('0deg'), // use interpolation ''0deg'deg',
            rotateY: (0, react_native_reanimated_1.useSharedValue)('0deg'), // use interpolation ''0deg'deg',
            rotateZ: (0, react_native_reanimated_1.useSharedValue)('0deg'), // use interpolation ''0deg'deg',
            skewX: (0, react_native_reanimated_1.useSharedValue)('0deg'), // use interpolation ''0deg'deg',
            skewY: (0, react_native_reanimated_1.useSharedValue)('0deg'), // use interpolation '0deg',
        }).current;
        let colorFrom = {
            backgroundColor: getInitialValue('backgroundColor', initial),
            color: getInitialValue('color', initial),
            borderColor: getInitialValue('borderColor', initial),
            shadowColor: getInitialValue('shadowColor', initial),
        };
        // Animation helper
        const animateToValues = (targetValues, transitionConfig = transition) => {
            Object.entries(targetValues).forEach(([key, value]) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                if (value !== undefined) {
                    // Handle color properties
                    if (['backgroundColor', 'color', 'borderColor', 'shadowColor'].includes(key)) {
                        const progress = sharedValues[key];
                        // Capture current interpolated color as new 'from' value
                        const currentColor = (0, react_native_reanimated_1.interpolateColor)(progress.value, [0, 1], [colorFrom[key], sharedValues[`${key}To`].value]);
                        colorFrom[key] = currentColor;
                        sharedValues[`${key}To`].value = value;
                        progress.value = 0;
                        progress.value = (0, react_native_reanimated_1.withTiming)(1, {
                            duration: (_a = transitionConfig.duration) !== null && _a !== void 0 ? _a : DEFAULT_TRANSITION.duration,
                        });
                        return;
                    }
                    // Handle non-color properties
                    const sharedValue = getSharedValue(key);
                    if (sharedValue) {
                        let config;
                        if (transitionConfig.repeat &&
                            (transitionConfig.repeat > 0 || transitionConfig.repeat === 'infinity')) {
                            const baseAnimation = transitionConfig.type === 'spring'
                                ? (0, react_native_reanimated_1.withSpring)(value, {
                                    damping: (_b = transitionConfig.damping) !== null && _b !== void 0 ? _b : DEFAULT_TRANSITION.damping,
                                    stiffness: (_c = transitionConfig.stiffness) !== null && _c !== void 0 ? _c : DEFAULT_TRANSITION.stiffness,
                                    mass: (_d = transitionConfig.mass) !== null && _d !== void 0 ? _d : 1,
                                })
                                : (0, react_native_reanimated_1.withTiming)(value, {
                                    duration: (_e = transitionConfig.duration) !== null && _e !== void 0 ? _e : DEFAULT_TRANSITION.duration,
                                    easing: react_native_reanimated_1.Easing.linear,
                                });
                            const repeatCount = transitionConfig.repeat === 'infinity' ? -1 : transitionConfig.repeat;
                            const reverse = transitionConfig.repeatType === 'reverse';
                            config = (0, react_native_reanimated_1.withRepeat)(baseAnimation, repeatCount, reverse);
                        }
                        else {
                            config =
                                transitionConfig.type === 'spring'
                                    ? (0, react_native_reanimated_1.withSpring)(value, {
                                        damping: (_f = transitionConfig.damping) !== null && _f !== void 0 ? _f : DEFAULT_TRANSITION.damping,
                                        stiffness: (_g = transitionConfig.stiffness) !== null && _g !== void 0 ? _g : DEFAULT_TRANSITION.stiffness,
                                        mass: (_h = transitionConfig.mass) !== null && _h !== void 0 ? _h : 1,
                                    })
                                    : (0, react_native_reanimated_1.withTiming)(value, {
                                        duration: (_j = transitionConfig.duration) !== null && _j !== void 0 ? _j : DEFAULT_TRANSITION.duration,
                                    });
                        }
                        if (transitionConfig.delay) {
                            setTimeout(() => {
                                sharedValue.value = config;
                            }, transitionConfig.delay);
                        }
                        else {
                            sharedValue.value = config;
                        }
                    }
                }
            });
        };
        // Get shared value by key
        const getSharedValue = (key) => {
            return sharedValues[key];
        };
        // Set initial values on mount
        (0, react_1.useEffect)(() => {
            if (initial !== false) {
                Object.entries(initial).forEach(([key, value]) => {
                    const ExtractedsharedValue = sharedValues[key];
                    if (ExtractedsharedValue && value !== undefined) {
                        ExtractedsharedValue.value = value;
                    }
                });
            }
        }, []);
        // Handle shouldAnimate: initial -> animate
        (0, react_1.useEffect)(() => {
            animateToValues(animate, transition);
        }, [animate]);
        // Animated style
        const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
            const style = {};
            const transform = [];
            const passedProps = Object.assign(Object.assign({}, (initial !== false ? initial : {})), animate);
            Object.entries(passedProps).forEach(([key, value]) => {
                const sharedValue = sharedValues[key];
                if ([
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
                ].includes(key)) {
                    transform.push({ [key]: sharedValue.value });
                }
                else if (['borderColor', 'backgroundColor', 'color', 'shadowColor'].includes(key)) {
                    style[key] = (0, react_native_reanimated_1.interpolateColor)(sharedValue.value, [0, 1], [colorFrom[key], sharedValues[`${key}To`].value]);
                }
                else {
                    style[key] = sharedValue.value;
                }
            });
            // Position properties
            if (transform.length > 0)
                style.transform = transform;
            return style;
        });
        const AnimatedComponent = react_native_reanimated_1.default.createAnimatedComponent(Component);
        return react_1.default.createElement(AnimatedComponent, Object.assign({ ref, style: [styles, animatedStyle] }, rest), children);
    });
}
function getInitialValue(key, initial) {
    if (initial === false) {
        const initValue = getDefaultValue(key);
        return initValue;
    }
    const value = initial[key];
    return value !== undefined ? value : getDefaultValue(key);
}
function getDefaultValue(key) {
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
    return defaultValues[key];
}
exports.NativeMotion = {
    View: createMotionComponent(react_native_1.View),
    Text: createMotionComponent(react_native_1.Text),
    Image: createMotionComponent(react_native_1.Image),
    ImageBackground: createMotionComponent(react_native_1.ImageBackground),
    TextInput: createMotionComponent(react_native_1.TextInput),
    TouchableOpacity: createMotionComponent(react_native_1.TouchableOpacity),
    ScrollView: createMotionComponent(react_native_1.ScrollView),
    FlatList: createMotionComponent(react_native_1.FlatList),
    SectionList: createMotionComponent(react_native_1.SectionList),
    Pressable: createMotionComponent(react_native_1.Pressable),
};
