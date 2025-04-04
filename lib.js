const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#showButton");

showButton.addEventListener("click", () => {
  dialog.show();
});

const cancelButton = document.querySelector(".close");
const form = document.querySelector("form");
//Main div element that holds the books
const books = document.querySelector(".books");

function createBookElement(el, content, className) {
  const Element = document.createElement(el);
  Element.textContent = content;
  Element.setAttribute("class", className);
  return Element;
}

function createRead(booksItem, books) {
  const read = document.createElement("div");
  read.setAttribute("class", "book-read");
  read.appendChild(createBookElement("h1", "read?", "book-read-title"));
  const input = document.createElement('input');
  input.type = "checkbox";
  input.addEventListener("click", (e) =>{
    if (e.target.checked) {
      booksItem.setAttribute("class", "book-checked");
      books.read = true;
    } else {
      booksItem.setAttribute("class", "book-unread");
      books.read = false;
    }
  })
  if (books.read) {
    input.checked = true;
    booksItem.setAttribute("class", "book-checked");
  }
  read.appendChild(input);
  return read;
}
// helper function that create html elements and textcontent
function addBookElement(book, Index) {
  const booksItem = document.createElement("div");
  booksItem.setAttribute("id", Index);
  booksItem.setAttribute("key", Index);
  booksItem.setAttribute("class", "card-book")
  booksItem.appendChild(createBookElement("h1", `Title: ${book.title}`, "book-title"));
  booksItem.appendChild(createBookElement("h1", `Author: ${book.author}`, "book-author"));
  booksItem.appendChild(createBookElement("h1", `Pages: ${book.pages}`, "book-pages"));
  booksItem.appendChild(createRead(booksItem, books));
  books.insertAdjacentElement("afterbegin", booksItem);
}
//Displays the books on the webpage
function renderBook() {
  lib.map((book, Index) =>{
    addBookElement(book, Index);
  });
}

cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

function book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}
function addBook(title, author, pages, read) {
  lib.push(new book(title, author, pages, read));
  saveAndRender();
}
form.addEventListener("submit", (e) => {
  e.preventDefault(); // We don't want to submit this fake form
  const formData = new FormData (e.target);
  let Obj = {}
  for (let [name, value] of formData) {
    if (name === "book-read") {
      Obj["book-read"] = true;
    } else {
      Obj[name] = value || "";
      }
    }

      if (!Obj["book-read"]) {
        Obj["book-read"] = false
       }

       addBook(Obj["book-title"],Obj["book-author"],Obj["book-pages"]);
       dialog.close();
});

let lib = [];

function addLocalStorage() {
  // LocalStorage => save things key value pairs key = library : Lib 
  lib = JSON.parse(localStorage.getItem("library")) || []
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("library", JSON.stringify(lib)); //stringfy converts the whole array into a single string
  renderBook();
}