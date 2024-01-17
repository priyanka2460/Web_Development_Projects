import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class IndexController extends Controller {
  @service library;

  @tracked message = '';
  @tracked isMessage = false;
  @tracked borrowedDate = '';

  /**
   * This helper function checks if the book is available in the library or not.
   * @param id : This is the id of the book in the library. 
   * @returns : returns a message that book is not available.
   */
  checkAvailability = (id) => {
    let book = this.library.libraryItems.findBy('id', id);
    if (book.count == 0) {
      return 'Not Available';
    }
  };

  @action getDate(element) {
    this.borrowedDate = element.target.value;
  }

  /**
   * This action check for the conditions if a student trying trying to get the book like if he/she is logged in or not, he/she has returned the previous book or not and date of borrowing is given or not.
   * Assign the selected book to the student's data with the date of borrowing.
   * Also updates the count of the book in the library.
   * @param id : This is the id of the book in the library. 
   */
  @action getBook(id) {
    let book = this.library.libraryItems.findBy('id', id);
    if (book.count == 0) {
      return;
    }
    if (this.library.loggedStudent == '') {
      this.message = 'Please login to get the books.';
      this.isMessage = true;
      setTimeout(() => {
        this.message = '';
        this.isMessage = false;
      }, 3000);
      return;
    }
    if (this.library.loggedStudent.id != undefined) {
      this.message = 'First return the borrowed book then try to get the book';
      this.isMessage = true;
      setTimeout(() => {
        this.message = '';
        this.isMessage = false;
      }, 6000);
      return;
    }
    if(this.borrowedDate == ''){
      this.message = 'Please enter the date!';
      this.isMessage = true;
      setTimeout(() => {
        this.message = '';
        this.isMessage = false;
      }, 3000);
      return;
    }
    let updatedBook = {
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      img: book.img,
      count: book.count - 1,
    };
    this.library.libraryItems.splice(
      this.library.libraryItems.indexOf(book),
      1,
      updatedBook
    );
    this.library.libraryItems = this.library.libraryItems;

    let student = this.library.studentsData.findBy(
      'phone',
      this.library.loggedStudent.phone
    );
    let studentFine = 0;
    if(this.library.loggedStudent.fine >= 0){
      studentFine = this.library.loggedStudent.fine;
    }
    let updatedStudent = {
      register: true,
      name: this.library.loggedStudent.name,
      address: this.library.loggedStudent.address,
      email: this.library.loggedStudent.email,
      phone: this.library.loggedStudent.phone,
      password: this.library.loggedStudent.password,
      title: book.title,
      dateBorrowed: this.borrowedDate,
      fine: studentFine
    };
    this.library.studentsData.splice(this.library.studentsData.indexOf(student), 1, updatedStudent);
    this.library.studentsData = this.library.studentsData;

    let addBorrowedDate = {
      dateBorrowed: this.borrowedDate
    };
    let updatedloggedStudent = {
      ...this.library.loggedStudent,
      ...updatedBook,
      ...addBorrowedDate
    };
    this.library.addLoggedStudent(updatedloggedStudent);

    this.borrowedDate = '';
  }
}
