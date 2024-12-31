import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAuthToken } from "@/lib/utils";

const NotesContext = createContext(),
  NotesContextProvider = ({ children }) => {
    const [_Notes, setNotes] = useState([]),
      [ShowCreateNote, setShowCreateNote] = useState(false),
      [ShowEditNote, setShowEditNote] = useState(false),
      [EditNote, setEditNote] = useState({
        _id: "",
        title: "",
        description: "",
        tag: "General",
        updatedAt: Date.now,
      }),
      [CreateNote, setCreateNote] = useState({
        title: "",
        description: "",
        tag: "General",
      }),
      getAllnotes = async () => {
        try {
          const response = await fetch(
              `${import.meta.env.VITE_API_URL}/notes/allnotes`,
              {
                headers: {
                  "auth-token": getAuthToken(),
                },
                method: "GET",
                credentials: "include",
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
      },
      getNote = async (id) => {
        try {
          const response = await fetch(
              `${import.meta.env.VITE_API_URL}/notes/note/${id}`,
              {
                headers: {
                  "auth-token": getAuthToken(),
                },
                method: "GET",
                credentials: "include",
              }
            ),
            json = await response.json();

          if (!response.ok) {
            throw {
              message: "Failed to fetch note",
              statusText: response.statusText,
              status: response.status,
              response,
            };
          }
          return json
        } catch (error) {
          console.log(error);
        }
      },
      addNote = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/notes/createnote`,
          {
            headers: {
              "auth-token": getAuthToken(),
              "Content-Type": "application/json",
            },
            method: "POST",
            credentials: "include",
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

        setNotes((prevNotes) => prevNotes.concat(json));
      },
      // Delete a Note
      deleteNote = async (id) => {
        // API Call
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/notes/deletenote/${id}`,
            {
              method: "DELETE",
              credentials: "include",
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
          console.log(json);
        } catch (error) {
          console.log(error);
          alert(
            "Note is not deleted from the database. try to refresh or login again",
            error
          );
        }
      },
      _editNote = async () => {
        // API Call
        try {
          const response = await fetch(
              `${import.meta.env.VITE_API_URL}/notes/updatenote/${EditNote._id}`,
              {
                method: "PUT",
                headers: {
                  "auth-token": getAuthToken(),
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(EditNote),
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
                ? { ...prevNote, ...json._note }
                : prevNote
            )
          );
          console.log(json);
        } catch (error) {
          console.log(error);
          alert(
            "Note is not saved to database. try refresh or login again",
            error
          );
        }
      };

    useEffect(() => {
      const effect = getAllnotes();

      return () => effect;
    }, []);

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
          ShowEditNote,
          setShowEditNote,
          getNote
        }}
      >
        {children}
      </NotesContext.Provider>
    );
  };

NotesContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { NotesContextProvider, NotesContext };
