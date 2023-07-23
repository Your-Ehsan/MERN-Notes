import { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";

const Home = () => {
  const { Notes, setNotes } = useContext(NotesContext);
  console.log(Notes, setNotes);
  return <div>Home</div>;
};

export default Home;
