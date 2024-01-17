import EmberRouter from '@ember/routing/router';
import config from 'college-library/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('admin');
  this.route('student-login');
  this.route('profile');
});
