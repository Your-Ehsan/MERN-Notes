import { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";

const useNotesContext = () => {
  return useContext(NotesContext);
};

export { useNotesContext };
