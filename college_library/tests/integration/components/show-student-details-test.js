import { module, test } from 'qunit';
import { setupRenderingTest } from 'college-library/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | show-student-details', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<ShowStudentDetails />`);

    assert.dom('.show-students-details-container').exists();
  });
});
