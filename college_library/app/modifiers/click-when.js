import { modifier } from 'ember-modifier';

export default modifier(function clickWhen(element, [isLogin]) {
  if (isLogin) {
    element.click();
  }
});
