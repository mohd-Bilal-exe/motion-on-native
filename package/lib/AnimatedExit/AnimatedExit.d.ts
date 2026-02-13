import * as React from 'react';
import { AnimatedExitProps } from './types/types';
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
export default function AnimatedExit({ children, onExitComplete, mode, propagate, }: React.PropsWithChildren<AnimatedExitProps>): React.JSX.Element | null;
