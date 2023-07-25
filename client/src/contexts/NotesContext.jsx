import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { redirect, useLoaderData } from "react-router-dom";

const NotesContext = createContext(),
  NotesContextProvider = ({ children }) => {
    const // _notes = [
      //     {
      //       _id: "64bd0807bede2713c1fa6b5e",
      //       user: "64bbdb103cbbefb63a91c0de",
      //       title: "this is title",
      //       description: "This is description",
      //       tag: "General",
      //       createdAt: "2023-07-23T10:59:19.454Z",
      //       updatedAt: "2023-07-23T10:59:19.454Z",
      //       __v: 0,
      //     },
      //     {
      //       _id: "64bd0901bede2713c1fa6b60",
      //       user: "64bbdb103cbbefb63a91c0de",
      //       title: "this is title",
      //       description: "This is description",
      //       tag: "General",
      //       createdAt: "2023-07-23T11:03:29.509Z",
      //       updatedAt: "2023-07-23T11:03:29.509Z",
      //       __v: 0,
      //     },
      //   ],
      [_Notes, setNotes] = useState([]),
      [ShowCreateNote, setShowCreateNote] = useState(false),
      [EditNote, setEditNote] = useState({
        _id: "",
        title: "",
        description: "",
        tag: "",
        updatedAt: Date.now(),
      }),
      [CreateNote, setCreateNote] = useState({
        title: "",
        description: "",
        tag: "",
      });

    const getAllnotes = async () => {
      try {
        const response = await fetch(
            `http://localhost:3000/api/notes/allnotes`,
            {
              method: "GET",
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
                "Access-Control-Allow-Origin": "http://localhost:5173",
              },
            }
          ),
          json = await response.json();

        if (!response.ok) {
          throw {
            message: "Failed to fetch notes",
            statusText: response.statusText,
            status: response.status,
            response,
          };
        }
        setNotes(json);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      const effect = () => getAllnotes();

      return () => {
        effect();
      };
    }, []);

    // loaderData = ;
    // console.log(loaderData);
    const addNote = async () => {
      // TODO: API Call
      // API Call
      // const response = await fetch(`${host}/api/notes/addnote`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
      //   },
      //   body: JSON.stringify({title, description, tag})
      // });
      const response = await fetch(
        `http://localhost:3000/api/notes/createnote`,
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),

            // FIXME: fix this to user's auth-token from localstorage.
            "Access-Control-Allow-Origin": "http://localhost:5173",
          },
          body: JSON.stringify({
            ...CreateNote,
          }),
        }
      );

      let json = await response.json();

      if (!response.ok) {
        throw {
          message:
            "Failed to create note ☹ or you are not connected to internet",
          statusText: response.statusText,
          status: response.status,
          response,
        };
      }

      // alert(json);
      console.log(json);
      // const note = await response.json();
      // setNotes(notes.concat(note))
      setNotes((prevNotes) => prevNotes.concat(json));
    };

    // Delete a Note
    const deleteNote = async (id) => {
      // API Call
      try {
        const response = await fetch(
          `http://localhost:3000/api/notes/deletenote/${id}`,
          {
            method: "DELETE",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"), // FIXME: fix this to user's auth-token from localstorage.
              "Access-Control-Allow-Origin": "http://localhost:5173",
            },
          }
        );

        let json = await response.json();

        if (!response.ok) {
          throw {
            message:
              "Failed to delete note ☹ or you are not connected to internet",
            statusText: response.statusText,
            status: response.status,
            response,
          };
        }
        setNotes((preNotes) => preNotes.filter((note) => note._id !== id));
        // alert(json);
        console.log(json);
      } catch (error) {
        console.log(error);
        alert(
          "Note is not deleted from the database. try to refresh or login again",
          error
        );
        //  json = error.message
      }

      // const newNotes = notes.filter((note) => {
      //   return note._id !== id;
      // });
    };
    // setEditNote(()

    // Edit a Note
    const _editNote = async () => {
      // API Call
      try {
        const response = await fetch(
            `http://localhost:3000/api/notes/updatenote/${EditNote._id}`,
            {
              method: "PUT",
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"), // FIXME: fix this to user's auth-token.
                "Access-Control-Allow-Origin": "http://localhost:5173",
              },
              body: JSON.stringify({
                ...EditNote,
                // title: EditNote.title,
                // description: EditNote.description,
                // tag: EditNote.tag,
                // updatedAt: Date.now(),
              }),
            }
          ),
          json = await response.json();

        if (!response.ok) {
          throw {
            message: `Failed to update note [${EditNote.title}]`,
            statusText: response.statusText,
            status: response.status,
            response,
          };
        }

        setNotes((prevNotes) =>
          prevNotes.map((prevNote) =>
            prevNote._id === EditNote._id
              ? { ...prevNote, ...EditNote }
              : prevNote
          )
        );
        // EditNote._id === null;
        // setNotes((prevNotes) =>
        //   prevNotes._id === EditNote._id
        //     ? { ...prevNotes, ...json._note }
        //     : prevNotes
        // );
        // return json;
        console.log(json);
      } catch (error) {
        console.log(error);
        alert(
          "Note is not saved to database. try refresh or login again",
          error
        );
        // return error;
      }

      // const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "auth-token":
      //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q",
      //   },
      //   body: JSON.stringify({
      //     title,
      //     description,
      //     tag,
      //     updatedAt: Date.now(),
      //   }),
      // });
      // const json = await response.json();

      // let newNotes = JSON.parse(JSON.stringify(notes));
      // // Logic to edit in client
      // for (let index = 0; index < newNotes.length; index++) {
      //   const element = newNotes[index];
      //   if (element._id === id) {
      //     newNotes[index].title = title;
      //     newNotes[index].description = description;
      //     newNotes[index].tag = tag;
      //     break;
      //   }
      // }
      // setNotes(newNotes);
    };

    return (
      <NotesContext.Provider
        value={{
          _Notes,
          _editNote,
          EditNote,
          deleteNote,
          CreateNote,
          ShowCreateNote,
          setCreateNote,
          setNotes,
          setEditNote,
          setShowCreateNote,
          addNote,
        }}
      >
        {/* <Outlet /> */}
        {children}
      </NotesContext.Provider>
    );
  };

NotesContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { NotesContextProvider, NotesContext };
