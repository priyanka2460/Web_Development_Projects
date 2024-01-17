import { module, test } from 'qunit';
import { setupTest } from 'college-library/tests/helpers';

module('Unit | Route | student-login', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:student-login');
    assert.ok(route);
  });
});
