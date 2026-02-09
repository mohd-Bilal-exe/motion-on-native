/**
 * @public
 */
export interface AnimatedExitProps {
  /**
   * By passing `initial={false}`, `AnimatePresence` will disable any initial animations on children
   * that are present when the component is first rendered.
   *
   * ```jsx
   * <AnimatePresence initial={false}>
   *   {isVisible && (
   *     <motion.div
   *       key="modal"
   *       initial={{ opacity: 0 }}
   *       animate={{ opacity: 1 }}
   *       exit={{ opacity: 0 }}
   *     />
   *   )}
   * </AnimatePresence>
   * ```
   *
   * @public
   */
  initial?: boolean;

  /**
   * Fires when all exiting nodes have completed animating out.
   *
   * @public
   */
  onExitComplete?: () => void;

  /**
   * Determines how to handle entering and exiting elements.
   *
   * - `"sync"`: Default. Elements animate in and out as soon as they're added/removed.
   * - `"popLayout"`: Exiting elements are "popped" from the page layout, allowing sibling
   *      elements to immediately occupy their new layouts.
   * - `"wait"`: Only renders one component at a time. Wait for the exiting component to animate out
   *      before animating the next component in.
   *
   * @public
   */
  mode?: 'sync' | 'popLayout' | 'wait';

  /**
   * If true, the `AnimatePresence` component will propagate parent exit animations
   * to its children.
   */
  propagate?: boolean;
}
export interface PresenceContextProps {
  id: string;
  isPresent: boolean;
  register: (id: string | number) => () => void;
  onExitComplete?: (id: string | number) => void;
  initial?: false;
  custom?: any;
}
