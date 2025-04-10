let lib = [];

function addLocalStorage() {
  // LocalStorage => save things key value pairs key = library : Lib 
  try {
    lib = JSON.parse(localStorage.getItem("library")) || [];
  } catch (e) {
    console.error("Failed to parse library data", e);
    lib = []; // Fallback to empty array
  }
}
addLocalStorage();
// Load and display books when page loads
window.addEventListener('DOMContentLoaded', () => {
  // 1. Load from localStorage
  const storedBooks = localStorage.getItem('library');
  if (storedBooks) {
    try {
      lib = JSON.parse(storedBooks);
    } catch (e) {
      console.error("Error parsing books:", e);
      lib = [];
    }
  }
  renderBook();
});

//Displays the books on the webpage
function renderBook() {
  lib.map((book, Index) =>{
    addBookElement(book, Index);
  });
}
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

function book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read || false;
}

form.addEventListener("submit", (e) => {
  console.log("form submitted");
  e.preventDefault(); // We don't want to submit this fake form
  console.log("FormData:", Array.from(new FormData(e.target)));
  const formData = new FormData (e.target);
  let Obj = {};

  for (let [name, value] of formData) {
    if (name === "book-read") {
      Obj["book-read"] = true;
    } else {
      Obj[name] = value.trim() || "";
      }
    }

      if (Obj["book-read"] === undefined) {
        Obj["book-read"] = false
       }

       addBook(Obj["book-title"],Obj["book-author"],Obj["book-pages"],Obj["book-read"]);
       saveLibrary();
       dialog.close();
});
// Save to localStorage
function saveLibrary() {
  localStorage.setItem('library', JSON.stringify(lib));
}

function addBook(title, author, pages, read) {
  lib.push(new book(title, author, pages, read));
  renderBook();
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

cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});
