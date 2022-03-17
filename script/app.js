// every book isInstance of a book class;
let nav = null;
let addBook = null;
let ListOfBooks = null;
let contactInfo = null;

class MyBook {
  static listOfBook = [];

  static unRender = [];

  static {
    this.updateLocalStorage = () => {
      localStorage.setItem('bookCollection', JSON.stringify(MyBook.listOfBook));
    };
    this.addBookToList = (book) => {
      this.listOfBook.push(book);
      this.updateLocalStorage();
    };
    this.removeBookFomList = (bookToRemove) => {
      this.listOfBook = this.listOfBook.filter((book) => book.id !== bookToRemove.id);
      this.updateLocalStorage();
    };
  }

  constructor(title, author, id = String(Date.now())) {
    this.title = title;
    this.author = author;
    this.id = id;
    this.addBook(); // add book to Book list
  }

  addBook() {
    MyBook.addBookToList(this);
  }

  removeBook() {
    MyBook.removeBookFomList(this);
  }

  addBookToDom = () => {
    const storeBooks = document.querySelector('#storeBooks');
    const bookForm = document.createElement('form');
    bookForm.setAttribute('id', this.id);
    const titleContainer = document.createElement('p');
    titleContainer.classList.add('title-author');
    titleContainer.textContent = String(`"${this.title}"`) + String(' by ') + String(`${this.author}`);
    const removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'remove');
    removeButton.textContent = 'Remove';
    bookForm.appendChild(titleContainer);
    bookForm.appendChild(removeButton);
    storeBooks.appendChild(bookForm);
    bookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.removeBook();
      this.removeBookFromDom(storeBooks);
    });
    MyBook.updateLocalStorage(this);
  };

  removeBookFromDom = (storeBooks) => {
    const book = document.getElementById(`${this.id}`);
    storeBooks.removeChild(book);
  };
}

const updateBookList = () => {
  const bookData = JSON.parse(localStorage.getItem('bookCollection'));
  bookData.forEach((bookData) => {
    const newBook = new MyBook(bookData.title, bookData.author, bookData.id);
    newBook.addBookToDom(); // append book to the DOM
  });
};

const addNewBookEvent = () => {
  const newBook = document.querySelector('#newBook');
  newBook.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = event.target.elements[0].value;
    const author = event.target.elements[1].value;
    const myNewBook = new MyBook(title, author);
    myNewBook.addBookToDom();
      event.target.elements[0].value = '';
    event.target.elements[1].value = '';
  });
};

const swapSection = (newActiveSection) => {
  const oldActiveSection = document.querySelector('section.active');
  oldActiveSection.classList.toggle('active');
  newActiveSection.classList.add('active');
};

document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('bookCollection')) {
    localStorage.setItem('bookCollection', JSON.stringify([]));
  } else {
    updateBookList();
  }
  nav = document.getElementById('navbar-container');
  ListOfBooks = document.getElementById('list-of-books');
  addBook = document.getElementById('new-book-section');
  contactInfo = document.getElementById('footer-container');
  const navLinks = nav.querySelectorAll('a');
  ListOfBooks.classList.add('active');
  addNewBookEvent();
  function swapSectionEvent(element) {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      const sectionName = element.getAttribute('href').replace('#', '');
      console.log(sectionName);
      swapSection(document.getElementById(sectionName));
    });
  }
  for (let i = 0; i < navLinks.length; i += 1) {
    const link = navLinks[i];
    swapSectionEvent(link);
  }
});
