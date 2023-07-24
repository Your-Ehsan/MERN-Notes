import { useContext } from "react";
import Notes from "../components/Notes";
import { NotesContext } from "../contexts/NotesContext";
import { Outlet, useLoaderData } from "react-router-dom";

const Home = () => {
  const { setShowCreateNote } = useContext(NotesContext);
    // fetchedNotes = useLoaderData();

    //   useEffect(() => {
    // const notes = () => {
      // setNotes(fetchedNotes);
    // };

    // return () => notes;
//   }, [fetchedNotes]);

  // console.log(fetchedNotes);
  return (
    <section>
      {/* <Outlet context={fetchedNotes}/> */}
      <Notes />
      <button onClick={() => setShowCreateNote(true)} className="rounded-md bg-blue-600 px-5 py-2 text-white shadow-xl transition-all duration-300 hover:bg-blue-700">
        create
      </button>
    </section>
  );
};

export default Home;
