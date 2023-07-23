import Notes from "../components/Notes";

const Home = () => {
  return (
    <section>
     <Notes/>
     <button className="rounded-md bg-blue-600 px-5 py-2 text-white shadow-xl transition-all duration-300 hover:bg-blue-700">
          create 
        </button>
    </section>
  );
};

export default Home;
