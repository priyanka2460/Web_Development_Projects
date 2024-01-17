import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class AdminController extends Controller {
  @service library;

  @action removeThisBook(id) {
    this.library.removeBook(id);
  }
}
