import { modifier } from 'ember-modifier';

export default modifier(function clickWhen(element, [isClick]) {
  if (isClick) {
    element.click();
  }
});
