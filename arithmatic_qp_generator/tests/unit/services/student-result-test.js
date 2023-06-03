import { module, test } from 'qunit';
import { setupTest } from 'arithmetic-qp-generator/tests/helpers';

module('Unit | Service | student-result', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:student-result');
    assert.ok(service);
  });
});
