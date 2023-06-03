import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Modifier | click-when', function (hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it clicks the link if form is submited', async function (assert) {
    await render(hbs`<a {{click-when true}}></a>`);

    assert.ok(true);
  });
});
