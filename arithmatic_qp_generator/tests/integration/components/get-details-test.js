import { module, test } from 'qunit';
import { setupRenderingTest } from 'arithmetic-qp-generator/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | get-details', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders form page for getting details about questions', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<GetDetails />`);

    assert.dom('form').exists();
    assert.dom('.form-head').hasText('Give Details');
    assert.dom('.numOfQues label').includesText('Number of questions:');
    assert.dom('.typeOfQues label').hasText('Type of questions:');
    assert.dom('.quesDifficulty label').hasText('Difficulty Level:');
    assert.dom('.generate button').hasText('Generate');
  });
});
