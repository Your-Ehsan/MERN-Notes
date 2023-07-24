import { useContext, useState } from "react";
import { NotesContext } from "../contexts/NotesContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const {
      _Notes,
      ShowCreateNote,
      setNotes,
      deleteNote,
      EditNote,
      setEditNote,
      _editNote,
      CreateNote,
      setCreateNote,
      setShowCreateNote,
      addNote,
    } = useContext(NotesContext),
    [ShowEditNote, setShowEditNote] = useState(false);

  // const no =
  // const  = useOutletContext()
  // console.log(useOutletContext());
  // const [notes, setNotes] = useState(initialNotes);
  const [editingNote, setEditingNote] = useState(null);

  // Function to delete a note
  const handleDeleteNote = (noteId) => {
    // const notetodel = _Notes.filter(note => {return note._id !== noteId});
    setNotes((prevnotes) => prevnotes.filter((note) => note._id !== noteId));
  };

  // Function to start editing a note
  const handleStartEdit = (noteId) => {
    const noteToEdit = _Notes.find((note) => note._id === noteId);
    setEditNote(noteToEdit);
    setShowEditNote(true);
  };

  // Function to save the edited note
  const handleSaveEdit = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === editingNote._id ? editingNote : note
      )
    );
    setEditingNote(null); // Clear the editing state after saving
  };

  // Function to cancel editing
  const handleCancelEdit = () => {
    setEditingNote(null);
  };
  return (
    <section>
      {/* {Notes.map((_note) => (
        <NoteItem key={_note._id} {..._note} />
      ))} */}

      <div>
        {_Notes.map((note) => (
          <div key={note._id}>
            <div>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <button onClick={() => handleStartEdit(note._id)}>Edit</button>
              <button onClick={() => deleteNote(note._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {ShowEditNote && (
        // <!-- component -->
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6"></div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="title"
                type="text"
                value={EditNote.title}
                onChange={(e) =>
                  setEditNote({
                    ...EditNote,
                    title: e.target.value,
                  })
                }
              />
              <p className="text-gray-600 text-xs italic">
                Some tips - as long as needed
              </p>
            </div>
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                tag
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="title"
                type="text"
                value={EditNote.tag}
                onChange={(e) =>
                  setEditNote({
                    ...EditNote,
                    tag: e.target.value,
                  })
                }
              />
              <p className="text-gray-600 text-xs italic">
                Some tips - as long as needed
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Message
              </label>
              <textarea
                className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                id="description"
                value={EditNote.description}
                onChange={(e) =>
                  setEditNote({
                    ...EditNote,
                    description: e.target.value,
                  })
                }
              />
              <p className="text-gray-600 text-xs italic">
                Re-size can be disabled by set by resize-none / resize-y /
                resize-x / resize
              </p>
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button
                className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => {
                  _editNote();
                  setNotes((prevNotes) =>
                    prevNotes.map((prevNote) =>
                      prevNote._id === EditNote._id
                        ? { ...prevNote, ...EditNote }
                        : prevNote
                    )
                  );
                  // setNotes(
                  //   _Notes.map((prevNote) =>
                  //     prevNote._id === EditNote._id
                  //       ? { ...prevNote, ...EditNote }
                  //       : prevNote
                  //   )
                  // );
                  // setNotes((prevNotes) =>
                  //   prevNotes._id === EditNote._id
                  //     ? {
                  //         ...prevNotes,
                  //         ...EditNote,
                  //       }
                  //     : prevNotes
                  // );
                  setShowEditNote(false);
                }}
              >
                Save changes
              </button>
            </div>
            <div className="md:w-2/3"></div>
          </div>
        </form>
      )}
      {ShowCreateNote && (
        // <!-- component -->
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6"></div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="title"
                type="text"
                value={CreateNote.title}
                onChange={(e) =>
                  setCreateNote({
                    ...CreateNote,
                    title: e.target.value,
                  })
                }
              />
              <p className="text-gray-600 text-xs italic">
                Some tips - as long as needed
              </p>
            </div>
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                tag
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="title"
                type="text"
                value={CreateNote.tag}
                onChange={(e) =>
                  setCreateNote({
                    ...CreateNote,
                    tag: e.target.value,
                  })
                }
              />
              <p className="text-gray-600 text-xs italic">
                Some tips - as long as needed
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Message
              </label>
              <textarea
                className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                id="description"
                value={CreateNote.description}
                onChange={(e) =>
                  setCreateNote({
                    ...CreateNote,
                    description: e.target.value,
                  })
                }
              />
              <p className="text-gray-600 text-xs italic">
                Re-size can be disabled by set by resize-none / resize-y /
                resize-x / resize
              </p>
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button
                className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => {
                  addNote();
                  // setNotes((prevNotes) =>
                  //   prevNotes.map((prevNote) =>
                  //     prevNote._id === EditNote._id
                  //       ? { ...prevNote, ...EditNote }
                  //       : prevNote
                  //   )
                  // );
                  // setNotes(
                  //   _Notes.map((prevNote) =>
                  //     prevNote._id === EditNote._id
                  //       ? { ...prevNote, ...EditNote }
                  //       : prevNote
                  //   )
                  // );
                  // setNotes((prevNotes) =>
                  //   prevNotes._id === EditNote._id
                  //     ? {
                  //         ...prevNotes,
                  //         ...EditNote,
                  //       }
                  //     : prevNotes
                  // );
                  setShowCreateNote(false);
                }}
              >
                Save changes
              </button>
            </div>
            <div className="md:w-2/3"></div>
          </div>
        </form>
      )}
    </section>
  );
};

export default Notes;
