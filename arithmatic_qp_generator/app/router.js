import EmberRouter from '@ember/routing/router';
import config from 'arithmetic-qp-generator/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('question-paper');
  this.route('result');
});
