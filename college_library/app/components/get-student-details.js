import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class GetStudentDetailsComponent extends Component {
  @service library;

  @tracked studentName = '';
  @tracked studentAddress = '';
  @tracked studentEmail = '';
  @tracked studentPhone = '';
  @tracked studentPassword = '';
  @tracked isMessage = false;
  @tracked message = '';

  /**
   * This function stores the students details into student's data.
   * Also checks that all the input fields are provided or not and returns an error message.
   */
  @action submitDetails() {
    if(this.studentName == '' || this.studentAddress == '' || this.studentEmail == '' || this.studentPhone == '' || this.studentPassword == ''){
      this.message = "Please enter all the required fields.";
      this.isMessage = true;
      setTimeout(() => {
        this.message = '';
        this.isMessage = false;
      }, 3000);
      return;
    }
    let student = {
      register: true,
      name: this.studentName,
      address: this.studentAddress,
      email: this.studentEmail,
      phone: this.studentPhone,
      password: this.studentPassword,
      fine: 0
    };
    this.library.addStudent(student);
    this.studentName = '';
    this.studentAddress = '';
    this.studentEmail = '';
    this.studentPhone = '';
    this.studentPassword = '';
    this.message = "Please login to continue..";
    this.isMessage = true;
    setTimeout(() => {
      this.message = '';
      this.isMessage = false;
    }, 5000);
  }
}
