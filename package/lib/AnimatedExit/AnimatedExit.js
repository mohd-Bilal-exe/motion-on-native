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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnimatedExit;
const React = __importStar(require("react"));
const react_1 = require("react");
const useConstants_1 = require("./constants/useConstants");
const LayoutGroupcontexts_1 = require("./contexts/LayoutGroupcontexts");
const usePresence_1 = require("./hooks/usePresence");
const utils_1 = require("./utils/utils");
/**
 * `AnimatedExit` enables the animation of components when they are removed from the tree.
 *
 * When adding/removing more than a single child, every child **must** be given a unique `key` prop.
 *
 * Any `NativeMotion` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { NativeMotion, AnimatedExit } from 'motion-on-native'
 *
 * export const Items = ({ items }) => (
 *   <AniamtedExit>
 *     {items.map(item => (
 *       <NativeMotion.View
 *         key={item.id}
 *         initial={{ opacity: 0 }}
 *         animate={{ opacity: 1 }}
 *         exit={{ opacity: 0 }}
 *       />
 *     ))}
 *   </AniamtedExit>
 * )
 * ```
 *
 * You can sequence exit animations throughout a tree.
 *
 * If a child contains multiple `NativeMotion` components with `exit` props, it will only unmount the child
 * once all `NativeMotion` components have finished animating out.
 *
 * @public
 */
function AnimatedExit({ children, onExitComplete, mode = 'sync', propagate = false, }) {
    function newChildrenMap() {
        return new Map();
    }
    const [isParentPresent, safeToRemove] = (0, usePresence_1.usePresence)(propagate);
    const presenceChildren = (0, useConstants_1.useConstant)(newChildrenMap);
    /**
     * Filter any children that aren't ReactElements. We can only track components
     * between renders with a props.key.
     */
    const presentChildren = (0, react_1.useMemo)(() => (0, utils_1.onlyElements)(children), [children]);
    /**
     * Track the keys of the currently rendered children. This is used to
     * determine which children are exiting.
     */
    const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(utils_1.getChildKey);
    /**
     * If `initial={false}` we only want to pass this to components in the first render.
     */
    const isInitialRender = (0, react_1.useRef)(true);
    /**
     * A ref containing the currently present children. When all exit animations
     * are complete, we use this to re-render the component with the latest children
     * *committed* rather than the latest children *rendered*.
     */
    const pendingPresentChildren = (0, react_1.useRef)(presentChildren);
    /**
     * Track which exiting children have finished animating out.
     */
    const exitComplete = (0, useConstants_1.useConstant)(() => new Map());
    /**
     * Track which components are currently processing exit to prevent duplicate processing.
     */
    const exitingComponents = (0, react_1.useRef)(new Set());
    /**
     * Save children to render as React state. To ensure this component is concurrent-safe,
     * we check for exiting children via an effect.
     */
    const [diffedChildren, setDiffedChildren] = (0, react_1.useState)(presentChildren);
    const [renderedChildren, setRenderedChildren] = (0, react_1.useState)(presentChildren);
    React.useEffect(() => {
        isInitialRender.current = false;
        pendingPresentChildren.current = presentChildren;
        /**
         * Update complete status of exiting children.
         */
        for (let i = 0; i < renderedChildren.length; i++) {
            const key = (0, utils_1.getChildKey)(renderedChildren[i]);
            if (!presentKeys.includes(key)) {
                if (exitComplete.get(key) !== true) {
                    exitComplete.set(key, false);
                }
            }
            else {
                exitComplete.delete(key);
                exitingComponents.current.delete(key);
            }
        }
    }, [renderedChildren, presentKeys.length, presentKeys.join('-')]);
    const exitingChildren = [];
    if (presentChildren !== diffedChildren) {
        let nextChildren = [...presentChildren];
        /**
         * Loop through all the currently rendered components and decide which
         * are exiting.
         */
        for (let i = 0; i < renderedChildren.length; i++) {
            const child = renderedChildren[i];
            const key = (0, utils_1.getChildKey)(child);
            if (!presentKeys.includes(key)) {
                nextChildren.splice(i, 0, child);
                exitingChildren.push(child);
            }
        }
        /**
         * If we're in "wait" mode, and we have exiting children, we want to
         * only render these until they've all exited.
         */
        if (mode === 'wait' && exitingChildren.length) {
            nextChildren = exitingChildren;
        }
        setRenderedChildren((0, utils_1.onlyElements)(nextChildren));
        setDiffedChildren(presentChildren);
        /**
         * Early return to ensure once we've set state with the latest diffed
         * children, we can immediately re-render.
         */
        return null;
    }
    if (mode === 'wait' && renderedChildren.length > 1) {
        console.warn(`You're attempting to animate multiple children within AnimatedExit, but its mode is set to "wait". This will lead to odd visual behaviour.`);
    }
    /**
     * If we've been provided a forceRender function by the LayoutGroupContext,
     * we can use it to force a re-render amongst all surrounding components once
     * all components have finished animating out.
     */
    const { forceRender } = (0, react_1.useContext)(LayoutGroupcontexts_1.LayoutGroupContext);
    return (<>
      {renderedChildren.map(child => {
            const key = (0, utils_1.getChildKey)(child);
            const isPresent = propagate && !isParentPresent
                ? false
                : presentChildren === renderedChildren || presentKeys.includes(key);
            const onExit = () => {
                console.log(`[${new Date().toISOString()}] 🔴 onExit called for key: ${key}`);
                if (exitingComponents.current.has(key)) {
                    console.log(`[${new Date().toISOString()}] ⚠️ Already in exitingComponents, returning`);
                    return;
                }
                console.log(`[${new Date().toISOString()}] ✅ Adding ${key} to exitingComponents`);
                exitingComponents.current.add(key);
                console.log(`[${new Date().toISOString()}] 📊 exitComplete.has(${key}): ${exitComplete.has(key)}`);
                if (exitComplete.has(key)) {
                    console.log(`[${new Date().toISOString()}] ✅ Setting exitComplete[${key}] = true`);
                    exitComplete.set(key, true);
                }
                else {
                    console.log(`[${new Date().toISOString()}] ⚠️ exitComplete doesn't have key, returning`);
                    return;
                }
                let isEveryExitComplete = true;
                console.log(`[${new Date().toISOString()}] 📊 Checking all exitComplete entries:`);
                exitComplete.forEach((isExitComplete, mapKey) => {
                    console.log(`[${new Date().toISOString()}]   - ${mapKey}: ${isExitComplete}`);
                    if (!isExitComplete)
                        isEveryExitComplete = false;
                });
                console.log(`[${new Date().toISOString()}] 📊 isEveryExitComplete: ${isEveryExitComplete}`);
                if (isEveryExitComplete) {
                    console.log(`[${new Date().toISOString()}] 🎉 All exits complete! Cleaning up...`);
                    forceRender === null || forceRender === void 0 ? void 0 : forceRender();
                    setRenderedChildren(pendingPresentChildren.current);
                    propagate && (safeToRemove === null || safeToRemove === void 0 ? void 0 : safeToRemove());
                    onExitComplete && onExitComplete();
                }
            };
            const checkAnimationComplete = () => {
                const isExiting = exitComplete.has(key);
                if (isExiting) {
                    onExit();
                }
            };
            // Animate exit working just fine but DOM se nhii nikal rha
            return React.createElement(child.type, Object.assign(Object.assign({}, child.props), { animate: isPresent ? child.props.animate : child.props.exit, key,
                isPresent, markPresent: () => {
                    presenceChildren.set(child.props.animationId, true);
                }, onExitComplete: checkAnimationComplete, exitComplete }));
        })}
    </>);
}
