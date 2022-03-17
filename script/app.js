let nav = null;
let listOfBooks = null;
let storeBooks = null;
const emptyBookListPlaceHolder = '<p id=\'book-list-empty\'> Your Books list is empty, you can <a href=\'#new-book-section\' onclick=\'AddSwapEvenForLinks(this)\'>click here</a> to add new</p>';

// update any section with a given HTML
const updateSectionWithInnerHtml = (section, innerHTML) => {
  section.innerHTML = innerHTML;
};

// every book is Instance of a book class;
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
    storeBooks = storeBooks || document.querySelector('#storeBooks');
    const placeHolder = document.getElementById('book-list-empty');
    if (placeHolder) {
      placeHolder.remove();
    }
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
    if (storeBooks.childElementCount === 0) {
      updateSectionWithInnerHtml(storeBooks, emptyBookListPlaceHolder);
    }
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

// associate event for the nav links and other elements if needed
function AddSwapEvenForLinks(NavLink) {
  NavLink.addEventListener('click', (event) => {
    event.preventDefault();
    const sectionName = NavLink.getAttribute('href').replace('#', '');
    swapSection(document.getElementById(sectionName));
  });
}

// as as document becomes ready the following activity get executed
document.addEventListener('DOMContentLoaded', () => {
  // find and update local storage elements
  if (!localStorage.getItem('bookCollection')) {
    localStorage.setItem('bookCollection', JSON.stringify([]));
  } else {
    updateBookList();
  }

  // Initialize document objects
  nav = document.getElementById('navbar-container');
  listOfBooks = document.getElementById('list-of-books');
  storeBooks = document.querySelector('#storeBooks');
  const navLinks = nav.querySelectorAll('a');
  listOfBooks.classList.add('active');
  if (storeBooks.childElementCount === 0) {
    updateSectionWithInnerHtml(storeBooks, emptyBookListPlaceHolder);
  }
  // associate event for the add new book form
  addNewBookEvent();

  for (let i = 0; i < navLinks.length; i += 1) {
    const link = navLinks[i];
    AddSwapEvenForLinks(link);
  }
});
