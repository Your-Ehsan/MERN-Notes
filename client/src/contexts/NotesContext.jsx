import { createContext, useState } from "react";
import PropTypes from "prop-types";

const NotesContext = createContext(),
  NotesContextProvider = ({ children }) => {
    const _notes = [
        {
          _id: "64bd0807bede2713c1fa6b5e",
          user: "64bbdb103cbbefb63a91c0de",
          title: "this is title",
          description: "This is description",
          tag: "General",
          createdAt: "2023-07-23T10:59:19.454Z",
          updatedAt: "2023-07-23T10:59:19.454Z",
          __v: 0,
        },
        {
          _id: "64bd0901bede2713c1fa6b60",
          user: "64bbdb103cbbefb63a91c0de",
          title: "this is title",
          description: "This is description",
          tag: "General",
          createdAt: "2023-07-23T11:03:29.509Z",
          updatedAt: "2023-07-23T11:03:29.509Z",
          __v: 0,
        },
      ],
      [Notes, setNotes] = useState(_notes);

    return (
      <NotesContext.Provider value={{ Notes, setNotes }}>
        {children}
      </NotesContext.Provider>
    );
  };

NotesContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { NotesContextProvider, NotesContext };
