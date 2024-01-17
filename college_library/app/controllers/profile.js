import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProfileController extends Controller {
  @service library;

  @tracked isLogin = false;
  @tracked returnedDate;
  @tracked isBookAvailable = false;

  checkLogin = ()=> {
    if(this.library.loggedStudent != ''){
        this.isLogin = true;
    }
  }

  isBookBorrowed = ()=> {
    if (this.library.loggedStudent.id != undefined) {
      this.isBookAvailable = true;
    }
  };

  /**
   * This action function clears the logged data of the student
   * Also updates the student data.
   */
  @action logOut() {
    if(this.library.loggedStudent.id != undefined){
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
            id: this.library.loggedStudent.id,
            title: this.library.loggedStudent.title,
            author: this.library.loggedStudent.author,
            description: this.library.loggedStudent.description,
            img: this.library.loggedStudent.img,
            dateBorrowed: this.library.loggedStudent.dateBorrowed,
            fine: studentFine
        };
        this.library.studentsData.splice(this.library.studentsData.indexOf(student), 1, updatedStudent);
        this.library.studentsData = this.library.studentsData;
    }
    this.library.clearLoggedStudent();
    this.isLogin = false;
  }

  @action getDate(element) {
    this.returnedDate = element.target.value;
  }

  /**
   * This function returns the book that is library data(count of the book) of the book is updated.
   * This action function finds total fine remaining if book is submitted late.
   * Also updates the students data.
   */
  @action returnBook() {
    let dateBorrowed = new Date(this.library.loggedStudent.dateBorrowed);
    let dateReturned = new Date(this.returnedDate);
    let totalTime = dateReturned.getTime() - dateBorrowed.getTime();
    let days = Math.ceil(totalTime / (24 * 60 * 60 * 1000));
    let studentFine = 0;
    if (days > 10) {
      studentFine = 10 * (days - 10);
    } else {
      studentFine = 0;
    }
    if(this.library.loggedStudent.fine >= 0){
      studentFine = this.library.loggedStudent.fine + studentFine;
    }
    let student = this.library.studentsData.findBy(
      'phone',
      this.library.loggedStudent.phone
    );
    let updatedStudent = {
      register: true,
      name: this.library.loggedStudent.name,
      address: this.library.loggedStudent.address,
      email: this.library.loggedStudent.email,
      phone: this.library.loggedStudent.phone,
      password: this.library.loggedStudent.password,
      title: this.library.loggedStudent.title,
      dateBorrowed: this.library.loggedStudent.dateBorrowed,
      dateReturned: this.returnedDate,
      fine: studentFine,
    };
    this.library.studentsData.splice(
      this.library.studentsData.indexOf(student),
      1,
      updatedStudent
    );
    this.library.studentsData = this.library.studentsData;

    let book = this.library.libraryItems.findBy(
      'id',
      this.library.loggedStudent.id
    );
    let updatedBook = {
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      img: book.img,
      count: book.count + 1,
    };
    this.library.libraryItems.splice(
      this.library.libraryItems.indexOf(book),
      1,
      updatedBook
    );
    this.library.libraryItems = this.library.libraryItems;

    let profile = {
      register: true,
      name: this.library.loggedStudent.name,
      address: this.library.loggedStudent.address,
      email: this.library.loggedStudent.email,
      phone: this.library.loggedStudent.phone,
      password: this.library.loggedStudent.password,
      fine: studentFine
    };
    this.library.addLoggedStudent(profile);
    this.isBookAvailable = false;
  }
}
