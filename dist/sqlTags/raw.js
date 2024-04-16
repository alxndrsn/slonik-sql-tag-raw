"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utilities = require("../utilities");
const raw = (sql, values) => {
  if (Array.isArray(values)) {
    // $FlowFixMe
    return {
      type: Symbol.for('SLONIK_TOKEN_SQL'),
      ...(0, _utilities.interpolatePositionalParameterReferences)(sql, values)
    };
  } else {
    // $FlowFixMe
    return {
      type: Symbol.for('SLONIK_TOKEN_SQL'),
      ...(0, _utilities.interpolateNamedParameterReferences)(sql, values)
    };
  }
};
var _default = exports.default = raw;
//# sourceMappingURL=raw.js.map