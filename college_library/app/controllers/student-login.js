import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class StudentLoginController extends Controller {
  @tracked isLogin = false;

  @action login() {
    this.isLogin = this.isLogin == true ? false :true;
  }
}
