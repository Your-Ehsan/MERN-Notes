import { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const { Notes } = useContext(NotesContext);
  return (
    <section>
      {Notes.map((_note) => (
        <NoteItem key={_note._id} {..._note} />
      ))}
    </section>
  );
};

export default Notes;
