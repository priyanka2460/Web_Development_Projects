import { module, test } from 'qunit';
import { setupTest } from 'college-library/tests/helpers';

module('Unit | Route | admin', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:admin');
    assert.ok(route);
  });
});
