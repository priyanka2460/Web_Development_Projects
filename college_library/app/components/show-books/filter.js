import Component from '@glimmer/component';

export default class ShowBooksFilterComponent extends Component {
  get results() {
    let { books, query } = this.args;

    if (query) {
      books = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    return books;
  }
}
