import { module, test } from 'qunit';
import { click, visit, currentURL, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'arithmetic-qp-generator/tests/helpers';
import Service from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

// Stub arithmetic-questions service
class Question extends Service {
  qBank = A(["1+1"]);
  @tracked isSubmit = false;
  add(item) {
    this.qBank.pushObject(item);
  }

  length() {
    return this.qBank.length;
  }

  empty() {
    this.qBank.clear();
  }
}

module('Acceptance | question paper generator', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:arithmetic-questions', Question);
  });

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('.heading').hasText('Generate Question Paper');

    await fillIn('Input', 1);
    await click('[data-test-input]');
    assert.dom('.generate button').hasText('Generate');
    await click('.generate button');

    assert.strictEqual(currentURL(), '/question-paper');
  });

  test('visiting /question-paper', async function (assert) {
    await visit('/question-paper');

    assert.strictEqual(currentURL(), '/question-paper');
    assert.dom('.heading').hasText('Arithmetic Question Paper');

    await fillIn('Input', 1);
    assert.dom('.question-paper-button button').hasText('Submit');
    await click('.question-paper-button button');

    assert.strictEqual(currentURL(), '/result');
  });

  test('visiting /result', async function (assert) {
    await visit('/result');

    assert.strictEqual(currentURL(), '/result');
    assert.dom('.heading').hasText('Result');

    assert.dom('.link-to-page').hasText('Create a new question paper');
    await click('.link-to-page .button');
    
    assert.strictEqual(currentURL(), '/');
  });
});
