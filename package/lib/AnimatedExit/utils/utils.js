"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChildKey = void 0;
exports.onlyElements = onlyElements;
const react_1 = require("react");
const getChildKey = (child) => {
    var _a, _b;
    return (_b = (_a = child.props.animationId) !== null && _a !== void 0 ? _a : child.key) !== null && _b !== void 0 ? _b : '';
};
exports.getChildKey = getChildKey;
function onlyElements(children) {
    const filtered = [];
    react_1.Children.forEach(children, child => {
        if ((0, react_1.isValidElement)(child))
            filtered.push(child);
    });
    return filtered;
}
