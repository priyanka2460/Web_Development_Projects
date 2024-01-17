import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class LoginComponent extends Component {
  @service library;

  @tracked studentInfo = '';
  @tracked studentPassword = '';
  @tracked isSubmit = false;
  @tracked errorMessage = '';
  @tracked isErrorMessage = false;

  /**
   * This function check if the provided details matches the record in the student's data.
   * Gives an error message if the details provided are incorrect.
   * Also check if one is already logged in then gives an error message.
   */
  @action submitDetails() {
    if (this.library.loggedStudent != '') {
      this.errorMessage = 'First log out then try again.';
      this.isErrorMessage = true;
      setTimeout(() => {
        this.errorMessage = '';
        this.isErrorMessage = false;
      }, 3000);
      return;
    }
    let student;
    if (this.studentInfo.includes('@gmail.com')) {
      student = this.library.checkStudent('email', this.studentInfo);
    } else {
      student = this.library.checkStudent('phone', this.studentInfo);
    }
    
    if (student == undefined || student.password != this.studentPassword) {
      this.errorMessage = 'Incorrect password/details! Please try again.';
      this.isErrorMessage = true;
      setTimeout(() => {
        this.errorMessage = '';
        this.isErrorMessage = false;
      }, 3000);
      return;
    }
    this.library.addLoggedStudent(student);
    this.isSubmit = true;
  }
}
