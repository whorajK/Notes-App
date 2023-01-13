// VARIABLES
const noteList = document.querySelector("#notes");
const preview = document.querySelector("#preview");
const previewTitle = document.querySelector(".preview--title");
const previewBody = document.querySelector(".preview--body");
const addBtn = document.querySelector("#add-btn");
const saveBtn = document.querySelector("#save-btn");
const cancelBtn = document.querySelector("#cancel-btn");

const notes = JSON.parse(localStorage.getItem("notes")) || [];
let isUpdated = false,
  updateID;

// FUNCTIONS
const displayNotes = () => {
  const el = document.querySelector(".notes-list");

  // Removes duplicates
  document
    .querySelectorAll(".notes-list--note")
    .forEach((note) => note.remove());

  notes.forEach((note, index) => {
    // Trim note body
    let x = note.body.substring(0, 80);

    return (el.innerHTML += `
    <div class="notes-list--note radius" ondblclick="editNote(${index}, '${note.title}', '${note.body}')">
                <h2 class="note--title">${note.title}</h2>
                <small class="note--time">${note.time}</small>
                <p class="note--body">${x}..</p>
                <div class="note--options">
                  <button onclick="deleteNote(${index})">
                    <i class="bi bi-trash3-fill"></i>
                  </button>
                </div>
              </div>`);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
};

displayNotes();

// EVENT LISTENERS
addBtn.addEventListener("click", () => {
  preview.classList.remove("hide");
  previewTitle.focus();
});

cancelBtn.addEventListener("click", () => {
  preview.classList.add("hide");
  isUpdated = false;
});

saveBtn.addEventListener("click", () => {
  let Months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let today = new Date();
  let hour = today.getHours(),
    minutes = today.getMinutes(),
    time = `${hour}:${minutes}`,
    date = today.getDate(),
    month = Months[today.getMonth()],
    year = today.getFullYear();

  // Convert first letter to uppercase
  previewBody.value =
    previewBody.value.charAt(0).toUpperCase() + previewBody.value.slice(1);

  previewTitle.value =
    previewTitle.value.charAt(0).toUpperCase() + previewTitle.value.slice(1);

  let noteTitle = previewTitle.value,
    noteBody = previewBody.value;

  // Checks if there is a text available
  if (noteTitle || noteBody) {
    let noteData = {
      title: noteTitle,
      time: `${time}, ${date} ${month} ${year}`,
      body: noteBody,
    };
    // Updates the note by its index
    if (!isUpdated) {
      notes.push(noteData);
    } else {
      isUpdated = false;
      notes[updateID] = noteData;
    }
  }
  localStorage.setItem("notes", JSON.stringify(notes));

  previewTitle.value = "";
  previewBody.value = "";
  preview.classList.add("hide");

  displayNotes();
});

// NOTE EVENT LISTNERS
let editNote = (noteID, title, body) => {
  updateID = noteID;
  isUpdated = true;
  addBtn.click();
  previewTitle.value = title;
  previewBody.value = body;
};

const deleteNote = (noteID) => {
  const confirmDeletion = confirm("Are you sure? You want to delete this note");
  if (!confirmDeletion) {
    return;
  }
  notes.splice(noteID, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
};

window.addEventListener("load", () => alert("Welcome to Notes App"));
