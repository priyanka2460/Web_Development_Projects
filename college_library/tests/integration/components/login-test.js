import { module, test } from 'qunit';
import { setupRenderingTest } from 'college-library/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | login', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Login />`);

    assert.dom('.login-form').exists();
  });
});
