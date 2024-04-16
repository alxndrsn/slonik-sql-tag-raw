"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slonik = require("slonik");
/**
 * @see https://github.com/mysqljs/sqlstring/blob/f946198800a8d7f198fcf98d8bb80620595d01ec/lib/SqlString.js#L73
 */
const interpolatePositionalParameterReferences = (inputSql, inputValues = []) => {
  const resultValues = [];
  const bindingNames = (inputSql.match(/\$(\d+)/g) || []).map(match => {
    return Number.parseInt(match.slice(1), 10);
  }).sort();
  if (bindingNames[bindingNames.length - 1] > inputValues.length) {
    throw new _slonik.InvalidInputError('The greatest parameter position is greater than the number of parameter values.');
  }
  if (bindingNames.length > 0 && bindingNames[0] !== 1) {
    throw new _slonik.InvalidInputError('Parameter position must start at 1.');
  }
  const resultSql = inputSql.replace(/\$(\d+)/g, (match, g1) => {
    const parameterPosition = Number.parseInt(g1, 10);
    const boundValue = inputValues[parameterPosition - 1];
    if ((0, _slonik.isSqlToken)(boundValue)) {
      // $FlowFixMe
      const sqlFragment = (0, _slonik.createSqlTokenSqlFragment)(boundValue, resultValues.length);
      resultValues.push(...sqlFragment.values);
      return sqlFragment.sql;
    } else {
      resultValues.push(inputValues[parameterPosition - 1]);
      return '$' + resultValues.length;
    }
  });
  return {
    sql: resultSql,
    values: resultValues
  };
};
var _default = exports.default = interpolatePositionalParameterReferences;
//# sourceMappingURL=interpolatePositionalParameterReferences.js.map