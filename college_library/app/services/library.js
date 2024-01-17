import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class LibraryService extends Service {
  @tracked libraryItems = A([
    {
      id: 1,
      title: 'The Alchemist',
      description:
        'The Alchemist is a classic novel in which a boy named Santiago embarks on a journey seeking treasure in the Egyptian pyramids after having a recurring dream about it and on the way meets mentors, falls in love, and most importantly, learns the true importance of who he is and how to improve himself.',
      author: 'Paulo Coelho',
      img: 'https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg',
      count: 2,
    },
    {
      id: 2,
      title: 'Rich Dad Poor Dad',
      description:
        "Rich Dad, Poor Dad is one of the most famous books in all of personal finance. Rich Dad Poor Dad is Robert's story of growing up with two dads — his real father and the father of his best friend, his rich dad — and the ways in which both men shaped his thoughts about money and investing.",
      author: 'Robert Kiyosaki and Sharon Lechter',
      img: 'https://m.media-amazon.com/images/I/51Hfv2MfNGL._SX331_BO1,204,203,200_.jpg',
      count: 3,
    },
    {
      id: 3,
      title: 'Ikigai',
      description:
        "The Japanese word “ikigai” means a “life purpose” or “raison d'être.” Ikigai refers to defining your personal meaning of life in relation to your talents, passions, and profession, as well as what you can give to the wider world.",
      author: 'Francesc Miralles and Hector Garcia',
      img: 'https://m.media-amazon.com/images/I/814L+vq01mL.jpg',
      count: 4,
    },
    {
      id: 4,
      title: 'The Secret',
      description:
        ' The Secret is a self-help book by Rhonda Byrne that explains how the law of attraction, which states that positive energy attracts positive things into your life, governs your thinking and actions, and how you can use the power of positive thinking to achieve anything you can imagine.',
      author: 'Rhonda Byrne',
      img: 'https://m.media-amazon.com/images/I/81fdQIY6ykL.jpg',
      count: 1,
    },
    {
      id: 5,
      title: 'The Kite Runner',
      description: 'The Kite Runner is the story of Amir, a Sunni Muslim, who struggles to find his place in the world because of the aftereffects and fallout from a series of traumatic childhood events.',
      author: 'Khaled Hosseini',
      img: 'https://m.media-amazon.com/images/I/81IzbD2IiIL.jpg',
      count: 0
    },
    {
      id: 6,
      title: 'To Kill a Mockingbird',
      description: 'To Kill a Mockingbird is both a young girl\'s coming-of-age story and a darker drama about the roots and consequences of racism and prejudice, probing how good and evil can coexist within a single community or individual.',
      author: 'Harper Lee',
      img: 'https://m.media-amazon.com/images/I/81gepf1eMqL.jpg',
      count: 1
    }
  ]);

  @tracked studentsData = A([]);

  @tracked loggedStudent = '';

  addBook(book) {
    this.libraryItems.pushObject(book);
  }
  removeBook(bookId) {
    let book = this.libraryItems.findBy('id', bookId);
    this.libraryItems.removeObject(book);
  }
  getBooksLength(){
    return this.libraryItems.length;
  }

  addStudent(student) {
    this.studentsData.pushObject(student);
  }
  checkStudent(property, value) {
    let student = this.studentsData.findBy(property, value);
    return student;
  }

  addLoggedStudent(student) {
    this.loggedStudent = student;
    this.loggedStudent = this.loggedStudent;
  }
  clearLoggedStudent() {
    this.loggedStudent = '';
  }
}
