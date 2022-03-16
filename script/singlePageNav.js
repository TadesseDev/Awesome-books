let body = null;
let footer = null;
let nav = null;
let addBook = null;
let ListOfBooks = null;
let contactInfo = null;
const swapSection = (section) => {
  console.log(section);
  contactInfo.remove();
  ListOfBooks.remove();
  addBook.remove();
  body.insertBefore(section, footer);
  if (section === addBook) {
    addNewBookEvent();
  } else if (section === ListOfBooks && MyBook.unRender.length > 0) {
    MyBook.unRender.forEach(book => {
      book.addBookToDom();
    });
    MyBook.unRender = [];
  }
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
  const contactInfoSection = document.createElement('section');
  contactInfoSection.setAttribute('id', 'contact-info');
  contactInfoSection.innerHTML = `
<h2 id="contact-info-title">Contact Information</h2>
<p>Do you have any questions or you just want to say "Hello"? <br> You can reach out to us!</p>
<ul>
  <li>Our e-mail: mail@mail.com</li>
  <li>Our phone number: 0043586534422</li>
  <li>Our address: Streetname 22, 84503 City, Country</li>
</ul>
`;
  return contactInfoSection;
}

document.addEventListener('DOMContentLoaded', () => {
  body = document.querySelector('body');
  footer = document.getElementById('footer-container');
  nav = document.getElementById('navbar-container');
  ListOfBooks = document.getElementById('list-of-books');
  addBook = getNewBookSection();
  contactInfo = getContactInfo();
  const navLinks = nav.querySelectorAll('a');
  for (let link of navLinks)
    link.addEventListener('click', (event) => {
      let sectionName = link.getAttribute('href').replace('#', '');
      if (sectionName === 'ListOfBooks')
        swapSection(ListOfBooks);
      else if (sectionName === 'addBook')
        swapSection(addBook);
      else
        swapSection(contactInfo);
    });
    // console.log(link.getAttribute('href').replace('#', ''));
});