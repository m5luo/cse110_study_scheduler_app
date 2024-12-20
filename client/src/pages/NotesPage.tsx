import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import profileIcon from "../images/profile-icon.jpg";
import "../style/NotesPage.css";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { createNote, deleteNote, fetchNoteByID, fetchNotes, updateNote } from "../utils/note-utils";
import { Note } from "../types/types";

// interface Note {
//   id: number;
//   title: string;
//   content: string;
// }

const NotesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Access the passed label name of notes
  const labelName = location.state?.labelName || "Default Label";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  /* Variables for managing notes and sidebar. */
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");

  /* Variables for popups and their positioning. */
  const [showOptionsPopup, setShowOptionsPopup] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [showRenamePopup, setShowRenamePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  /* Ref for handling clicking outside popups to close them. */
  const popupRef = useRef<HTMLDivElement | null>(null);

  // fetch user notes   
  useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem('token') || '""';
        const usersNotes = await fetchNotes(token);
        setNotes(usersNotes);
    };
  
    fetchData();
  }, []);
  /* Variables to handle if there are unsaved changes in the note editor */
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [pendingNote, setPendingNote] = useState<Note | null>(null);

  /* Close the options popup when clicking outside it. */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowOptionsPopup(null);
      }
    };

    if (showOptionsPopup !== null) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showOptionsPopup]);

  /* Toggle the sidebar's open/close state. */
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  /* Create a new note with a default title and content. */
  const createNewNote = () => {
    if (hasUnsavedChanges) { //handle unsaved changes
      setShowSavePrompt(true);
      setPendingNote(null);
    } else {
      proceedToCreateNewNote();
    }
  };

  //create a new note after handling any unsaved changes
  const proceedToCreateNewNote = () => {
    const newNote: Note = {
      note_id: Date.now(),
      title: "Untitled Note",
      content: "",
    };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
    setCurrentTitle("Untitled Note");
    setCurrentContent("");
    setHasUnsavedChanges(false);
  };

  /* Select a specific note and load its title and content into the editor. */
  const selectNote = (note: Note) => {
    // const token = localStorage.getItem('token');
    // const selected_note = fetchNoteByID(token, note.title)
    // setSelectedNote(note);
    // setCurrentTitle(note.title);
    // setCurrentContent(note.content);
    if (hasUnsavedChanges) {
      setShowSavePrompt(true);
      setPendingNote(note);
    } else {
      setSelectedNote(note);
      setCurrentTitle(note.title);
      setCurrentContent(note.content);
      setHasUnsavedChanges(false);
    }
  };

  /* Save the changes made to the selected note. */
  const handleSave = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem('token') || '""';
    if (selectedNote) {
      const updatedNotes = notes.map((note) =>
        note.note_id === selectedNote.note_id
          ? { ...note, title: currentTitle, content: currentContent }
          : note
      );
      setNotes(updatedNotes);
      setSelectedNote({ ...selectedNote, title: currentTitle, content: currentContent });
      
      const currNote = await fetchNoteByID(token, selectedNote);
      console.log(currNote);

      if (currNote.count === 0) {
        const newNote = await createNote(token, {note_id: Date.now(), title: currentTitle, content: currentContent});
        console.log(newNote.note_id)
      }
      else {
        console.log(selectedNote)
        const modifiedNote = await updateNote(token, {note_id: selectedNote.note_id, title: currentTitle, content: currentContent});
        console.log(modifiedNote.note_id)
      }
      setHasUnsavedChanges(false);
      alert("Note saved successfully!");
    }
  };

  /* Open the rename/delete popup for a specific note and position it next to the button. */
  const handleOptionsClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    noteId: number
  ) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPopupPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX + 30,
    });
    setShowOptionsPopup(noteId);
  };

  /* Rename the selected note with the title entered in the Rename popup. */
  const handleRename = () => {
    if (selectedNote && newTitle.trim()) {
      const updatedNotes = notes.map((note) =>
        note.note_id === selectedNote.note_id ? { ...note, title: newTitle } : note
      );
      setNotes(updatedNotes);
      setSelectedNote({ ...selectedNote, title: newTitle });
      setCurrentTitle(newTitle);
      setShowRenamePopup(false);
      setNewTitle("");
    }
  };

  /* Delete the selected note and reset the editor state. */
  const handleDelete = async () => {
    const token = localStorage.getItem('token') || '""';
    if (selectedNote) {
      const updatedNotes = notes.filter((note) => note.note_id !== selectedNote.note_id);
      setNotes(updatedNotes);
    //   setSelectedNote(null);
    //   setCurrentTitle("");
    //   setCurrentContent("");
    //   setShowDeletePopup(false);
    //   await deleteNote(token, selectedNote)
  
      // Check if there are no notes left
      if (updatedNotes.length === 0) {
        setSelectedNote(null);
        setCurrentTitle("");
        setCurrentContent("");
      } else {
        setSelectedNote(updatedNotes[0]); // Select the first available note
        setCurrentTitle(updatedNotes[0].title);
        setCurrentContent(updatedNotes[0].content);
      }
      setShowDeletePopup(false); // Close delete popup
      await deleteNote(token, selectedNote)
    }
  };
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
    setHasUnsavedChanges(true);
  };
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentContent(e.target.value);
    setHasUnsavedChanges(true);
  };

  /* Handle switching without saving, save option */
  const handleSaveAndSwitch = (e: any) => {
    handleSave(e); // Save the current note
    if (pendingNote) {
      setSelectedNote(pendingNote);
      setCurrentTitle(pendingNote.title);
      setCurrentContent(pendingNote.content);
    } else {
      proceedToCreateNewNote();
    }
    setHasUnsavedChanges(false);
    setShowSavePrompt(false);
    setPendingNote(null);
    };
  
  /* Handle switching without saving, discard option */
  const handleDiscardAndSwitch = () => {
    if (pendingNote) {
      setSelectedNote(pendingNote);
      setCurrentTitle(pendingNote.title);
      setCurrentContent(pendingNote.content);
    } else {
      proceedToCreateNewNote();
    }
    setHasUnsavedChanges(false);
    setShowSavePrompt(false);
    setPendingNote(null);
    }
  
  return (
    <div className="notesPageContainer">
      <div className="mainContent">
      <Navbar />
        {/* Top Navigation Bar with calendar and notes tab */}
        <div className="topNav">
          {isSidebarOpen ? (
            <button onClick={toggleSidebar} className="sidebarToggle">
              &larr;
            </button>
          ) : (
            <button onClick={toggleSidebar} className="sidebarToggle">
              &rarr;
            </button>
          )}
          <div className="rightControls">
          {/* <img src={profileIcon} alt="Profile" className="profileIcon" /> */}
            <button
              className="saveButton"
              onClick={handleSave}
              disabled={!selectedNote}
            >
              SAVE
            </button>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="editorContainer">
          {/* Sidebar */}
          {isSidebarOpen && (
            <div className="sidebar">
              <div className="sidebarHeader">
                <span className="labelTitle">{labelName}</span>
              </div>
              <div className="noteList">
                {notes.map((note) => (
                  <div
                    key={note.note_id}
                    className={`noteItem ${
                      selectedNote?.note_id === note.note_id ? "selected" : ""
                    }`}
                    onClick={() => selectNote(note)}
                  >
                    <span className="noteTitle">{note.title}</span>
                    <button
                      className="optionsButton"
                      onClick={(e) => handleOptionsClick(e, note.note_id)}
                    ></button>
                    {showOptionsPopup === note.note_id && (
                      <div
                        className="optionsPopup"
                        ref={popupRef}
                        style={{
                          top: popupPosition.top,
                          left: popupPosition.left,
                        }}
                      >
                        <button
                          onClick={() => {
                            setShowRenamePopup(true);
                            setShowOptionsPopup(null);
                          }}
                          className="renameButton"
                        >
                          Rename
                        </button>
                        <button
                          onClick={() => {
                            setShowDeletePopup(true);
                            setShowOptionsPopup(null);
                          }}
                          className="deleteButton"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="newNoteButton" onClick={createNewNote}>
                New note <span className="plusIcon">+</span>
              </button>
            </div>
          )}

          {/* Editor */}
          <div className="editor">
            {notes.length === 0 ? (
              <div className="defaultPage">
                <p className="defaultMessage">Select an existing note or get started by creating a new note!</p>
                <button className="largeNewNoteButton" onClick={createNewNote}>
                  New Note <span className="plusIcon">+</span>
                </button>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  className="titleInput"
                  placeholder="Title"
                  value={currentTitle}
                  onChange={handleTitleChange}
                  disabled={!selectedNote}
                />
                <textarea
                  className="noteContent"
                  placeholder="(Start typing here!)"
                  value={currentContent}
                  onChange={handleContentChange}
                  disabled={!selectedNote}
                ></textarea>
              </>
            )}
          </div>
        </div>

        {showSavePrompt && (
          <div className="popupOverlay" onClick={(e) => e.stopPropagation()}>
            <div className="popupContent" onClick={(e) => e.stopPropagation()}>
              <h3>You have unsaved changes. Would you like to save your work?</h3>
              <div className="popupButtons">
                <button onClick={handleDiscardAndSwitch} className="discardButton">
                  Discard
                </button>
                <button onClick={handleSaveAndSwitch} className="confirmButton">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rename Popup */}
        {showRenamePopup && (
          <div className="popupOverlay" onClick={() => setShowRenamePopup(false)}>
            <div className="popupContent" onClick={(e) => e.stopPropagation()}>
              <h3>Enter new name:</h3>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="popupInput"
              />
              <div className="popupButtons">
                <button
                  onClick={() => setShowRenamePopup(false)}
                  className="cancelButton"
                >
                  Cancel
                </button>
                <button onClick={handleRename} className="confirmButton">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Popup */}
        {showDeletePopup && (
          <div className="popupOverlay" onClick={() => setShowDeletePopup(false)}>
            <div className="popupContent" onClick={(e) => e.stopPropagation()}>
              <h3>Are you sure you want to delete this note?</h3>
              <div className="popupButtons">
                <button
                  onClick={() => setShowDeletePopup(false)}
                  className="cancelButton"
                >
                  Cancel
                </button>
                <button onClick={handleDelete} className="deleteConfirmButton">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
