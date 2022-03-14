let bookCollection = [];
let newBook = null;
let addNewBook = null;
const removeBook = (bookId, storeBooks) => {
  const book = document.getElementById(`${bookId}`)
  storeBooks.removeChild(book);
  bookCollection = bookCollection.filter(Object => Object.id != bookId);
}
const addBook = (title, author) => {
  const newBook = {
    id: String(bookCollection.length),
    title,
    author
  }
  bookCollection.push(newBook);
  const storeBooks = document.querySelector('#storeBooks');
  const bookForm = document.createElement('form');
  bookForm.setAttribute('id', newBook.id);
  const titleContainer = document.createElement('p');
  titleContainer.classList.add('title');
  titleContainer.textContent = newBook.title;
  const authorContainer = document.createElement('p');
  authorContainer.classList.add('author');
  authorContainer.textContent = newBook.author;
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
    removeBook(newBook.id, storeBooks);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  newBook = document.querySelector('#newBook');
  addNewBook = newBook.querySelector('#addBook');
  console.log(newBook, addNewBook);
  newBook.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = newBook.elements[0].value;
    const author = newBook.elements[1].value;
    addBook(title, author);
  })
});

