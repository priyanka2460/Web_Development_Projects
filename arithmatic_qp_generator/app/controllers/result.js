import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ResultController extends Controller {
  @service('arithmetic-questions') questions;
  @service('student-result') results;

  @action clear() {
    this.questions.empty();
    this.results.empty();
    this.questions.isSubmit = false;
    this.results.isResult = false;
  }

  /**
   * It is the helper function used to get length of array.
   * @returns : It returns length of array by calling function from service.
   */
  totalQuestions = () => {
    return this.questions.length();
  };

  /**
   * It is the helper function.
   * @param {*} index : It is the index of array.
   * @returns : It returns index + 1, to get actual serial numbers starting from 1.
   */
  serialNum = (index) => {
    return index + 1;
  };

  /**
   * This function counts the total correct answers.
   * @returns : It returns the marks obtained by student
   */
  marksObtained = () => {
    let correctAns = 0;
    this.results.studentResults.forEach((element) => {
      if (element.result == true) correctAns++;
    });
    return correctAns;
  };
}
