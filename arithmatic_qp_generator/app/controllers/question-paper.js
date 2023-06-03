import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class QuestionPaperController extends Controller {
  @service('arithmetic-questions') questions;
  @service('student-result') answers;

  serialNum = (index) => {
    return index + 1;
  };

  /**
   * This function saves the students answer into array of object.
   * @param {*} element : It is use to get values from input field.
   */
  @action verify(element) {
    let object = {
      problem: '',
      studentAns: element.target.value,
      result: false,
    };
    this.answers.add(object);
  }

  /**
   * This function checks the student answer with the actual
   * and sets result true for correct one and false for wrong one.
   */
  @action checkAnswers() {
    for (let i = 0; i < this.questions.length(); i++) {
      let correctAns = eval(this.questions.qBank[i]);
      if (this.answers.studentResults[i] == undefined) {
        alert('please enter all the answers!');
        return;
      }
      if (correctAns == this.answers.studentResults[i].studentAns) {
        this.answers.studentResults[i].problem = this.questions.qBank[i];
        this.answers.studentResults[i].result = true;
      } else {
        this.answers.studentResults[i].problem = this.questions.qBank[i];
        this.answers.studentResults[i].result = false;
      }
    }
    this.answers.isResult = true;
  }
}
