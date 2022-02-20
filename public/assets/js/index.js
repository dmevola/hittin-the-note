let $noteTitle = $(".note-title");
let $noteText = $(".note-textarea");
let $saveNoteBtn = $(".save-note");
let $newNoteBtn = $(".new-note");
let $noteList = $(".list-container .list-group");

// variable to keep track of the note in "textarea"
var activeNote = {};

// gets all notes from the database
var getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

//saves note to the db
var saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

//delete note from db

var deleteNote = function(id) {
  return $.ajax({
    url: "/api/notes" + id,
    method: "DELETE"
  })
};

//display activeNote if true otherwise empty input fields

var renderActiveNote = function() {
  $saveNoteBtn.hide();

  if (typeof activeNote.id === "number") {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

//get the note from the input fields, save it to db and update the view

var handleNoteSave = function() {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  saveNote(newNote);
  getAndRenderNotes();
  renderActiveNote();
};

// delete active note
var handleNoteDelete = function(event) {
  //prevents click listener from being called when  the button in it is clicked
  event.stopPropagation();
  var note = $(this).data('id');

  if (activeNote.id === note) {
    activeNote = {};
  }

  deleteNote(note);
  getAndRenderNotes();
  renderActiveNote();
};

// sets the activeNote and renders it in display

var handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};

//sets the activeNote to an empty object and allows the user to enter a new note
var handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

// check to see if title or text are empty 
var handleRenderSaveBtn = function() {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

//render list of note titles
var renderNoteList = function(notes) {
  $noteList.empty();

  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var $li = $("<li class='list-group-item'>").data(note);
    $li.data('id', i);

    var $span = $("<span>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note' data-id="+i+">"
    );

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }
  $noteList.append(noteListItems);
};

//get notes from db and display title in sidebar

var getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();


