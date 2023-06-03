import { module, test } from 'qunit';
import { setupTest } from 'arithmetic-qp-generator/tests/helpers';

module('Unit | Controller | question-paper', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:question-paper');
    assert.ok(controller);
  });
});
