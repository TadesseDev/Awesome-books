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
      this.listOfBook = this.listOfBook.filter((book) => {
        console.log(book.title);
        return book.id !== bookToRemove.id
      });
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
}

const addNewBookEvent = () => {
  try {
    let newBook = document.querySelector('#newBook');
    console.log(newBook);
    newBook.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = event.target.elements[0].value;
      const author = event.target.elements[1].value;
      const myNewBook = new MyBook(title, author);
      event.target.elements[0].value = '';
      event.target.elements[1].value = '';
    });
  } catch (e) {
    console.log(e)
  }
}
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('bookCollection')) {
    try {
      localStorage.setItem('bookCollection', JSON.stringify([]));
    } catch (exc) {
      console.log('failed to create local storage');
    }
  } else {
    updateBookList();
  }
});
