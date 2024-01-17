import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ShowBooksComponent extends Component {
  @service library;
  @tracked searchTitle;
}
