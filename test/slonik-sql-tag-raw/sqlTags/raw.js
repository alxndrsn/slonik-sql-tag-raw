// @flow

import test from 'ava';
import {
  sql,
} from 'slonik';
import raw from '../../../src/sqlTags/raw';

test('creates slonik-compatible fragment', (t) => {
  const fromRaw = raw('SELECT "someColumn" FROM some_table WHERE other_column = \'value\'');

  t.deepEqual(fromRaw, {
    sql: 'SELECT "someColumn" FROM some_table WHERE other_column = \'value\'',
    type: Symbol.for('SLONIK_TOKEN_SQL'),
    values: [],
  });

  const fromSlonikCore = sql`SELECT "someColumn" FROM some_table WHERE other_column = 'value'`;

  t.deepEqual(fromRaw, fromSlonikCore);
});
