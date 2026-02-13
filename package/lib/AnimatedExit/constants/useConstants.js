"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConstant = useConstant;
const react_1 = require("react");
/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
 * you can ensure that initialisers don't execute twice or more.
 */
function useConstant(init) {
    const ref = (0, react_1.useRef)(null);
    if (ref.current === null) {
        ref.current = init();
    }
    return ref.current;
}
