import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

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
							`http://localhost:3000/api/notes/allnotes`,
							{
								method: "GET",
								headers: {
									Accept: "*/*",
									"Content-Type": "application/json",
									"auth-token": localStorage.getItem("token"),
									"Access-Control-Allow-Origin": "http://localhost:5173",
								},
							},
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
			addNote = async () => {
				const response = await fetch(
					`http://localhost:3000/api/notes/createnote`,
					{
						method: "POST",
						headers: {
							Accept: "*/*",
							"Content-Type": "application/json",
							"auth-token": localStorage.getItem("token"),
							"Access-Control-Allow-Origin": "http://localhost:5173",
						},
						body: JSON.stringify({
							...CreateNote,
						}),
					},
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

				console.log(json);
				setNotes((prevNotes) => prevNotes.concat(json));
			},
			// Delete a Note
			deleteNote = async (id) => {
				// API Call
				try {
					const response = await fetch(
						`http://localhost:3000/api/notes/deletenote/${id}`,
						{
							method: "DELETE",
							headers: {
								Accept: "*/*",
								"Content-Type": "application/json",
								"auth-token": localStorage.getItem("token"),
								"Access-Control-Allow-Origin": "http://localhost:5173",
							},
						},
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
						error,
					);
				}
			},
			_editNote = async () => {
				// API Call
				try {
					const response = await fetch(
							`http://localhost:3000/api/notes/updatenote/${EditNote._id}`,
							{
								method: "PUT",
								headers: {
									Accept: "*/*",
									"Content-Type": "application/json",
									"auth-token": localStorage.getItem("token"),
									"Access-Control-Allow-Origin": "http://localhost:5173",
								},
								body: JSON.stringify({
									...EditNote,
								}),
							},
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
								: prevNote,
						),
					);
					console.log(json);
				} catch (error) {
					console.log(error);
					alert(
						"Note is not saved to database. try refresh or login again",
						error,
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
