import { useContext } from "react";
import Notes from "../components/Notes";
import { NotesContext } from "../contexts/NotesContext";

const Home = () => {
  const { setShowCreateNote } = useContext(NotesContext);

  return (
    <section>
      <Notes />
       <button
        onClick={() => setShowCreateNote(true)}
        className="rounded-md bg-blue-600 px-5 py-2 text-white shadow-xl transition-all duration-300 hover:bg-blue-700"
      >
        create
      </button>
    </section>
  );
};

export default Home;
