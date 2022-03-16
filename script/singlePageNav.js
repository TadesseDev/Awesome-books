
let body = null;
let footer = null;
let nav = null;
let addBook = null;
let ListOfBooks = null;
const createHomePage = () => {
  addBook.remove();

}

const getNewBookSection = () => {
  const newBookSection = document.createElement('section');
  newBookSection.setAttribute('id', 'new-book-section');
  newBookSection.innerHTML = `
    <h2 class="new-book-text"> Add a New Book</h2>
    <form action="#" id="newBook">
      <input type="text" id="title" name="title" placeholder="Title" required minlength="2" maxlength="100">
        <input type="text" id="author" name="author" placeholder="Author" required minlength="2" maxlength="100">
          <button type="submit" id="addBook">Add</button>
        </form>`
  return newBookSection;
}

const getContactInfo = () => {

}

document.addEventListener('DOMContentLoaded', () => {
  body = document.querySelector('body');
  footer = document.getElementById('contact-info');
  nav = document.getElementById('navbar-container');
  ListOfBooks = document.getElementById('list-of-books');
  addBook = getNewBookSection();
  body.insertBefore(addBook, footer);
  // createHomePage();
});