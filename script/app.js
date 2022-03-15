// every book isInstance of a book class;
class MyBook {
  static listOfBook = [];

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

  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = String(Date.now());
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

document.addEventListener('DOMContentLoaded', () => {
  const newBook = document.querySelector('#newBook');
  newBook.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = event.target.elements[0].value;
    const author = event.target.elements[1].value;
    const myNewBook = new MyBook(title, author);
    myNewBook.addBookToDom(); // append book to the DOM
    event.target.elements[0].value = '';
    event.target.elements[1].value = '';
  });
  if (!localStorage.getItem('bookCollection')) {
    try {
      localStorage.setItem('bookCollection', JSON.stringify([]));
    } catch (exc) {
      console.log('failed to create local storage');
    }
  } else {
    const bookData = JSON.parse(localStorage.getItem('bookCollection'));
    bookData.forEach((bookData) => {
      const newBook = new MyBook(bookData.title, bookData.author);
      newBook.addBookToDom(); // append book to the DOM
    });
  }
});
