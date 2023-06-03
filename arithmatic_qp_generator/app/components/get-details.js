import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class GetDetailsComponent extends Component {
  @service('arithmetic-questions') arithmeticQuestions;

  @tracked numberOfQuestions;
  @tracked addition;
  @tracked subtraction;
  @tracked multiplication;
  isHard = false;
  questions = [];
  questionTypes = [];
  operators = [];
  operatorsCount;
  maxRange = 10;
  minRange = 0;
  
  /**
   * This function sets the maxrange and minrange variable according to difficulty level chosen.
   * @param {*} element : It is use to get the values of the input field.
   */
  @action setDifficulty(element) {
    if (element.target.value == 'easy') {
      this.maxRange = 10;
      this.minRange = 0;
    } else if (element.target.value == 'medium') {
      this.maxRange = 100;
      this.minRange = 10;
    } else {
      this.isHard = true;
      this.maxRange = 100;
      this.minRange = 10;
    }
  }

  /**
   * This function checks for the valid inputs and then set the questions accordingly.
   * @returns : It simply returns back for any invalid inputs.
   */
  @action submit() {
    if (this.numberOfQuestions == undefined || this.numberOfQuestions < 0) {
      alert('Number of questions should be greater than 0!');
      return;
    }
    this.getOperators();
    if (this.operatorsCount == 0) {
      alert('Enter at least one question type!');
      return;
    }
    this.setQuestions();
    this.displayRandom();
    this.arithmeticQuestions.isSubmit = true;
  }

  /**
   * This function shuffles the array for all the question types chosen.
   */
  displayRandom() {
    const validate = [];
    while (this.arithmeticQuestions.length() != this.questions.length) {
      const randomIndex = Math.floor(Math.random() * this.questions.length);
      if (!validate.includes(randomIndex)) {
        validate.push(randomIndex);
        this.arithmeticQuestions.add(this.questions[randomIndex]);
      }
    }
  }

  randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * This function simply splits the total number of questions into parts for different operations.
   * @param {*} num : It is the accutal total number of question selected by teacher.
   * @param {*} parts : It is the number of operations/question types selected by teacher.
   * @returns : It returna a array which contains number of questions seperated for each operation.
   */
  splitQuestions(number, parts) {
    let base = Math.floor(number / parts);

    for (let i = 0; i < parts; i++) {
      this.questionTypes.push(base);
    }
    if (this.questionTypes.reduce((a, b) => a + b, 0) == number) {
      return this.questionTypes;
    }
    for (let i = 0; i < parts; i++) {
      this.questionTypes[i]++;
      if (this.questionTypes.reduce((a, b) => a + b, 0) == number) {
        return this.questionTypes;
      }
    }
  }

  generateQuestion(operator) {
    let operand1 = this.randomNumberGenerator(this.minRange, this.maxRange);
    let operand2;
    if (this.isHard) {
      operand2 = this.randomNumberGenerator(this.minRange, this.maxRange);
    } else {
      operand2 = Math.floor(Math.random() * 10);
    }
    let expression = operand1 + ' ' + operator + ' ' + operand2;
    this.questions.push(expression);
    return;
  }

  setQuestions() {
    this.splitQuestions(this.numberOfQuestions, this.operatorsCount);
    for (let i = 0; i < this.questionTypes.length; i++) {
      for (let j = 0; j < this.questionTypes[i]; j++) {
        this.generateQuestion(this.operators[i]);
      }
    }
  }

  getOperators() {
    if (this.addition) {
      this.operators.push('+');
    }
    if (this.subtraction) {
      this.operators.push('-');
    }
    if (this.multiplication) {
      this.operators.push('*');
    }
    this.operatorsCount = this.operators.length;
  }

}
