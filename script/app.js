//This class stores a list of bo0ks, and works in related with a local storage.

class ManageBooks {
  static listOfBook = [];
  constructor() { }
  static {
    this.addBookToList = (book) => {
      this.listOfBook.push(book);
      updateLocalStorage();
    }
    this.removeBookFomList = (bookToRemove) => {
      this.listOfBook = this.listOfBook.filter(book => book.id !== bookToRemove.id);
      updateLocalStorage();
    }
  }
}

// every book isInstance of a book class;
class book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = String(Date.now());
    this.addBook(); // add book to Book list
    this.addBookToDom(); //append book to the DOM
  }
  addBook() {
    ManageBooks.addBookToList(this);
  }
  removeBook() {
    ManageBooks.removeBookFomList(this);
  }
  addBookToDom = () => {
    const storeBooks = document.querySelector('#storeBooks');
    const bookForm = document.createElement('form');
    bookForm.setAttribute('id', this.id);
    const titleContainer = document.createElement('p');
    titleContainer.classList.add('title');
    titleContainer.textContent = this.title;
    const authorContainer = document.createElement('p');
    authorContainer.classList.add('author');
    authorContainer.textContent = this.author;
    const removeButton = document.createElement('button');
    const separator = document.createElement('hr');
    removeButton.setAttribute('class', 'remove');
    removeButton.textContent = 'Remove';
    bookForm.appendChild(titleContainer);
    bookForm.appendChild(authorContainer);
    bookForm.appendChild(removeButton);
    bookForm.appendChild(separator);
    storeBooks.appendChild(bookForm);
    bookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.removeBook();
      this.removeBookFromDom(storeBooks);
    });
    updateLocalStorage();
  };
  removeBookFromDom = (storeBooks) => {
    const book = document.getElementById(`${this.id}`);
    storeBooks.removeChild(book);
  };
}

const updateLocalStorage = () => {
  localStorage.setItem('bookCollection', JSON.stringify(ManageBooks.listOfBook));
};

document.addEventListener('DOMContentLoaded', () => {
  newBook = document.querySelector('#newBook');
  newBook.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = event.target.elements[0].value;
    const author = event.target.elements[1].value;
    const newBook = new book(title, author);
    event.target.elements[0].value = '';
    event.target.elements[1].value = '';
  });
  if (!localStorage.getItem('bookCollection')) {
    try {
      localStorage.setItem('bookCollection', JSON.stringify([]));
    } catch (exc) {
      console.log('can create local storage');
    }
  } else {
    const bookData = JSON.parse(localStorage.getItem('bookCollection'));
    bookData.forEach((bookData) => {
      const newBook = new book(bookData.title, bookData.author);
      console.log(ManageBooks.listOfBook);
    });
  }
});
