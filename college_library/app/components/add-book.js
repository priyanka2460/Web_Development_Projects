import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AddBookComponent extends Component {
  @service library;

  @tracked bookTitle = '';
  @tracked bookAuthor = '';
  @tracked bookDescription = '';
  @tracked bookImg;
  @tracked bookCount = '';
  @tracked errorMessage = '';
  @tracked isErrorMessage = false;

  @action addImg(element) {
    this.bookImg = element.target.files[0];
  }

  /**
   * This function adds the new book details into library.
   * Also checks that all the input fields are provided or not and returns an error message.
   */
  @action addBook() {
    if (
      this.bookTitle == '' ||
      this.bookAuthor == '' ||
      this.bookDescription == ''
    ) {
      this.errorMessage = 'Please enter all the fields!';
      this.isErrorMessage = true;
      setTimeout(() => {
        this.errorMessage = '';
        this.isErrorMessage = false;
      }, 3000);
      return;
    }
    let book = {
      id: this.library.getBooksLength() + 1,
      title: this.bookTitle,
      author: this.bookAuthor,
      description: this.bookDescription,
      img: URL.createObjectURL(this.bookImg),
      count: this.bookCount,
    };
    this.library.addBook(book);
    this.bookTitle = '';
    this.bookAuthor = '';
    this.bookDescription = '';
    this.bookCount = '';
  }
}
