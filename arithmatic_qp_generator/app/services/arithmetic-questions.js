import Service from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

export default class ArithmeticQuestionsService extends Service {
  qBank = A([]);
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
