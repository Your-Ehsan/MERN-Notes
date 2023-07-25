import { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const {
    _Notes,
    ShowCreateNote,
    EditNote,
    setEditNote,
    _editNote,
    CreateNote,
    setCreateNote,
    setShowCreateNote,
    addNote,
    ShowEditNote,
    setShowEditNote,
  } = useContext(NotesContext);

  return (
    <section>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {_Notes.map((_note) => (
            <NoteItem key={_note._id} {..._note} />
          ))}
        </div>
      </div>

      {ShowEditNote && (
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap mb-6 -mx-3"></div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-password"
              >
                Title
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
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
              <p className="text-xs italic text-gray-600">
                Some tips - as long as needed
              </p>
            </div>
            <div className="w-full px-3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-password"
              >
                tag
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
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
              <p className="text-xs italic text-gray-600">
                Some tips - as long as needed
              </p>
            </div>
          </div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-password"
              >
                Message
              </label>
              <textarea
                className="block w-full h-48 px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none resize-none no-resize focus:outline-none focus:bg-white focus:border-gray-500"
                id="description"
                value={EditNote.description}
                onChange={(e) =>
                  setEditNote({
                    ...EditNote,
                    description: e.target.value,
                  })
                }
              />
              <p className="text-xs italic text-gray-600">
                Re-size can be disabled by set by resize-none / resize-y /
                resize-x / resize
              </p>
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button
                className="px-4 py-2 font-bold text-white bg-teal-400 rounded shadow hover:bg-teal-400 focus:shadow-outline focus:outline-none"
                type="button"
                onClick={() => {
                  _editNote();
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
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap mb-6 -mx-3"></div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-password"
              >
                Title
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
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
              <p className="text-xs italic text-gray-600">
                Some tips - as long as needed
              </p>
            </div>
            <div className="w-full px-3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-password"
              >
                tag
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
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
              <p className="text-xs italic text-gray-600">
                Some tips - as long as needed
              </p>
            </div>
          </div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-password"
              >
                Message
              </label>
              <textarea
                className="block w-full h-48 px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none resize-none no-resize focus:outline-none focus:bg-white focus:border-gray-500"
                id="description"
                value={CreateNote.description}
                onChange={(e) =>
                  setCreateNote({
                    ...CreateNote,
                    description: e.target.value,
                  })
                }
              />
              <p className="text-xs italic text-gray-600">
                Re-size can be disabled by set by resize-none / resize-y /
                resize-x / resize
              </p>
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button
                className="px-4 py-2 font-bold text-white bg-teal-400 rounded shadow hover:bg-teal-400 focus:shadow-outline focus:outline-none"
                type="button"
                onClick={() => {
                  addNote();
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
