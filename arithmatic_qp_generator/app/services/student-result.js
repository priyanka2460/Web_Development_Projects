import Service from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

export default class StudentResultService extends Service {
  studentResults = A([]);
  @tracked isResult = false;

  add(item) {
    this.studentResults.pushObject(item);
  }

  length() {
    return this.studentResults.length;
  }

  empty() {
    this.studentResults.clear();
  }
}
