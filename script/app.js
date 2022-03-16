// every book isInstance of a book class;
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
  try {
    const newBook = document.querySelector('#newBook');
    newBook.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = event.target.elements[0].value;
      const author = event.target.elements[1].value;
      const myNewBook = new MyBook(title, author);
      MyBook.unRender.push(myNewBook);
      event.target.elements[0].value = '';
      event.target.elements[1].value = '';
    });
  } catch (e) {
    console.log(e);
  }
};
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

let body = null;
let footer = null;
let nav = null;
let addBook = null;
let ListOfBooks = null;
let contactInfo = null;
const swapSection = (section) => {
  contactInfo.remove();
  ListOfBooks.remove();
  addBook.remove();
  body.insertBefore(section, footer);
  if (section === addBook) {
    addNewBookEvent();
  } else if (section === ListOfBooks && MyBook.unRender.length > 0) {
    MyBook.unRender.forEach((book) => {
      book.addBookToDom();
    });
    MyBook.unRender = [];
  }
};

const getNewBookSection = () => {
  const newBookSection = document.createElement('section');
  newBookSection.setAttribute('id', 'new-book-section');
  newBookSection.innerHTML = `
    <h2 class="new-book-text"> Add a New Book</h2>
    <form action="#" id="newBook">
      <input type="text" id="title" name="title" placeholder="Title" required minlength="2" maxlength="100">
        <input type="text" id="author" name="author" placeholder="Author" required minlength="2" maxlength="100">
          <button type="submit" id="addBook">Add</button>
        </form>`;
  return newBookSection;
};

const getContactInfo = () => {
  const contactInfoSection = document.createElement('section');
  contactInfoSection.setAttribute('id', 'contact-info');
  contactInfoSection.innerHTML = `
<h2 id="contact-info-title">Contact Information</h2>
<p>Do you have any questions or you just want to say "Hello"? <br> You can reach out to us!</p>
<ul>
  <li>Our e-mail: email24t@gmail.com</li>
  <li>Our phone number: +251921577930</li>
  <li>Our address: Streetname 22, 84503 City, Country</li>
</ul>
`;
  return contactInfoSection;
};

document.addEventListener('DOMContentLoaded', () => {
  body = document.querySelector('body');
  footer = document.getElementById('footer-container');
  nav = document.getElementById('navbar-container');
  ListOfBooks = document.getElementById('list-of-books');
  addBook = getNewBookSection();
  contactInfo = getContactInfo();
  const navLinks = nav.querySelectorAll('a');
  function swapSectionEvent(element) {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      const sectionName = element.getAttribute('href').replace('#', '');
      if (sectionName === 'ListOfBooks') { swapSection(ListOfBooks); } else if (sectionName === 'addBook') { swapSection(addBook); } else { swapSection(contactInfo); }
    });
  }
  for (let i = 0; i < navLinks.length; i += 1) {
    const link = navLinks[i];
    swapSectionEvent(link);
  }
});
