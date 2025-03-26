const lib = [];
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const confirmBtn = document.querySelector("#confirmBtn");
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

  // "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
dialog.addEventListener("close", (e) => {
    dialog.returnValue === "default"
      ? "No return value."
      : `ReturnValue: ${dialog.returnValue}.`; // Have to check for "default" rather than empty string
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form
    dialog.close(); // Have to send the value here.
  });