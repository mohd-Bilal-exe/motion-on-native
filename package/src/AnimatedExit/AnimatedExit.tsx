import * as React from 'react';
import { useContext, useMemo, useRef, useState } from 'react';
import { useConstant } from './constants/useConstants';
import { LayoutGroupContext } from './contexts/LayoutGroupcontexts';
import { usePresence } from './hooks/usePresence';
import { AnimatedExitProps } from './types/types';
import { ComponentKey, getChildKey, onlyElements } from './utils/utils';

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
export default function AnimatedExit({
  children,
  onExitComplete,
  mode = 'sync',
  propagate = false,
}: React.PropsWithChildren<AnimatedExitProps>) {
  function newChildrenMap(): Map<string, boolean> {
    return new Map();
  }
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presenceChildren = useConstant(newChildrenMap);
  /**
   * Filter any children that aren't ReactElements. We can only track components
   * between renders with a props.key.
   */
  const presentChildren = useMemo(() => onlyElements(children), [children]);

  /**
   * Track the keys of the currently rendered children. This is used to
   * determine which children are exiting.
   */
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);

  /**
   * If `initial={false}` we only want to pass this to components in the first render.
   */
  const isInitialRender = useRef(true);

  /**
   * A ref containing the currently present children. When all exit animations
   * are complete, we use this to re-render the component with the latest children
   * *committed* rather than the latest children *rendered*.
   */
  const pendingPresentChildren = useRef(presentChildren);

  /**
   * Track which exiting children have finished animating out.
   */
  const exitComplete = useConstant(() => new Map<ComponentKey, boolean>());

  /**
   * Track which components are currently processing exit to prevent duplicate processing.
   */
  const exitingComponents = useRef(new Set<ComponentKey>());

  /**
   * Save children to render as React state. To ensure this component is concurrent-safe,
   * we check for exiting children via an effect.
   */
  const [diffedChildren, setDiffedChildren] = useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = useState(presentChildren);
  React.useEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;

    /**
     * Update complete status of exiting children.
     */
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);

      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join('-')]);

  const exitingChildren: any[] = [];

  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];

    /**
     * Loop through all the currently rendered components and decide which
     * are exiting.
     */
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);

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

    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);

    /**
     * Early return to ensure once we've set state with the latest diffed
     * children, we can immediately re-render.
     */
    return null;
  }

  if (mode === 'wait' && renderedChildren.length > 1) {
    console.warn(
      `You're attempting to animate multiple children within AnimatedExit, but its mode is set to "wait". This will lead to odd visual behaviour.`
    );
  }

  /**
   * If we've been provided a forceRender function by the LayoutGroupContext,
   * we can use it to force a re-render amongst all surrounding components once
   * all components have finished animating out.
   */
  const { forceRender } = useContext(LayoutGroupContext);
  return (
    <>
      {renderedChildren.map(child => {
        const key = getChildKey(child);

        const isPresent =
          propagate && !isParentPresent
            ? false
            : presentChildren === renderedChildren || presentKeys.includes(key);

        const onExit = () => {
          // console.log(`[${new Date().toISOString()}] 🔴 onExit called for key: ${key}`);

          if (exitingComponents.current.has(key)) {
            //  console.log(`[${new Date().toISOString()}] ⚠️ Already in exitingComponents, returning`);
            return;
          }

          //console.log(`[${new Date().toISOString()}] ✅ Adding ${key} to exitingComponents`);
          exitingComponents.current.add(key);

          // console.log(`[${new Date().toISOString()}] 📊 exitComplete.has(${key}): ${exitComplete.has(key)}`);
          if (exitComplete.has(key)) {
            // console.log(`[${new Date().toISOString()}] ✅ Setting exitComplete[${key}] = true`);
            exitComplete.set(key, true);
          } else {
            // console.log(`[${new Date().toISOString()}] ⚠️ exitComplete doesn't have key, returning`);
            return;
          }

          let isEveryExitComplete = true;
          // console.log(`[${new Date().toISOString()}] 📊 Checking all exitComplete entries:`);
          exitComplete.forEach((isExitComplete, mapKey) => {
            //    console.log(`[${new Date().toISOString()}]   - ${mapKey}: ${isExitComplete}`);
            if (!isExitComplete) isEveryExitComplete = false;
          });

          // console.log(`[${new Date().toISOString()}] 📊 isEveryExitComplete: ${isEveryExitComplete}`);
          if (isEveryExitComplete) {
            //   console.log(`[${new Date().toISOString()}] 🎉 All exits complete! Cleaning up...`);
            forceRender?.();
            setRenderedChildren(pendingPresentChildren.current);
            propagate && safeToRemove?.();
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
        return React.createElement(child.type as any, {
          ...child.props,
          animate: isPresent ? child.props.animate : child.props.exit,
          key,
          isPresent,
          markPresent: () => {
            presenceChildren.set(child.props.animationId, true);
          },
          onExitComplete: checkAnimationComplete,
          exitComplete,
        });
      })}
    </>
  );
}
