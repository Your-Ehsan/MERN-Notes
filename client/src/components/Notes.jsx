import { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const {
    _Notes,
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
    </section>
  );
};

export default Notes;
