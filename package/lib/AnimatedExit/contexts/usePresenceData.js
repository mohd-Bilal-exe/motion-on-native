"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePresenceData = usePresenceData;
const react_1 = require("react");
const PresenceContexts_1 = require("./PresenceContexts");
function usePresenceData() {
    const context = (0, react_1.useContext)(PresenceContexts_1.PresenceContext);
    return context ? context.custom : undefined;
}
