const lib = [];
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const cancelButton = document.querySelector("dialog button");
const confirmBtn = document.querySelector("#confirmBtn");
const form = document.querySelector("form");
const formData = new FormData (form);
function book(title, author, pages, status) {
    if (!new.target) {
        throw new Error("Must include new keyword");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBook() {
    
}
showButton.addEventListener("click", () => {
    dialog.showModal();
  });

cancelButton.addEventListener("click", () => {
  dialog.close();
});

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault(); // We don't want to submit this fake form
  dialog.close(formData.values); // Have to send the select box value here.
})