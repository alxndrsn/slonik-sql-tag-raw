"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slonik = require("slonik");
var _lodash = require("lodash");
var _Logger = _interopRequireDefault(require("../Logger"));
var _interpolatePositionalParameterReferences = _interopRequireDefault(require("./interpolatePositionalParameterReferences"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const log = _Logger.default.child({
  namespace: 'interpolateNamedParameterReferences'
});

/**
 * @see https://regex101.com/r/KrEe8i/2
 */
const namedPlaceholderRegex = /[\s(,]:([_a-z]+)/g;

/**
 * @see https://github.com/mysqljs/sqlstring/blob/f946198800a8d7f198fcf98d8bb80620595d01ec/lib/SqlString.js#L73
 */
const interpolateNamedParameterReferences = (inputSql, inputValues = {}) => {
  const resultValues = [];
  const parameterNames = Object.keys(inputValues);
  for (const parameterName of parameterNames) {
    const parameterValue = inputValues[parameterName];
    resultValues.push(parameterValue);
  }
  const usedParamterNames = [];
  const resultSql = inputSql.replace(namedPlaceholderRegex, (match, g1) => {
    if (!parameterNames.includes(g1)) {
      throw new _slonik.InvalidInputError('Named parameter reference does not have a matching value.');
    }
    usedParamterNames.push(g1);
    const parameterIndex = parameterNames.indexOf(g1) + 1;
    return match.slice(0, -g1.length - 1) + '$' + parameterIndex;
  });
  const unusedParameterNames = (0, _lodash.difference)(parameterNames, usedParamterNames);
  if (unusedParameterNames.length > 0) {
    log.warn({
      unusedParameterNames
    }, 'unused parameter names');
    throw new _slonik.InvalidInputError('Values object contains value(s) not present as named parameter references in the query.');
  }
  return (0, _interpolatePositionalParameterReferences.default)(resultSql, resultValues);
};
var _default = exports.default = interpolateNamedParameterReferences;
//# sourceMappingURL=interpolateNamedParameterReferences.js.map