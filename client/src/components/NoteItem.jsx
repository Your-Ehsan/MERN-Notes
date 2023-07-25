import PropTypes from "prop-types";
import { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";
const NoteItem = ({ _id, title, description, tag, createdAt, updatedAt }) => {
	const { setEditNote, setShowEditNote, _Notes, deleteNote } =
		useContext(NotesContext);
	return (
		<div id={_id} className="p-4 lg:w-1/3">
			<div className="relative h-full px-8 pt-16 pb-24 overflow-hidden text-center bg-gray-100 bg-opacity-75 rounded-lg">
				<h2 className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font">
					{tag}
				</h2>
				<h1 className="mb-3 text-xl font-medium text-gray-900 sm:text-2xl title-font">
					{title}
				</h1>
				<p className="mb-3 leading-relaxed">{description}</p>
				<span className="flex flex-col">
					<span className="inline-flex items-center text-blue-500">
						{new Date(updatedAt).toDateString()}
					</span>
					<span className="inline-flex items-center text-blue-500">
						{new Date(createdAt).toLocaleTimeString()}
					</span>
				</span>
				<div className="absolute bottom-0 left-0 flex justify-end w-full py-4 mt-2 leading-none text-center">
					<button
						className="inline-flex items-center py-1 pr-3 mr-3 text-sm leading-none text-gray-400 border-r-2 border-gray-200"
						onClick={() => {
							setEditNote(_Notes.find((_note) => _note._id === _id));
							setShowEditNote(true);
						}}
					>
						<svg
							className="w-4 h-4 mr-1"
							stroke="currentColor"
							strokeWidth="2"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							viewBox="0 0 24 24"
						>
							<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
							<circle cx="12" cy="12" r="3"></circle>
						</svg>
					</button>
					<button
						className="inline-flex items-center text-sm leading-none text-gray-400"
						onClick={() => deleteNote(_id)}
					>
						<svg
							className="w-4 h-4 mr-1"
							stroke="currentColor"
							strokeWidth="2"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							viewBox="0 0 24 24"
						>
							<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

NoteItem.propTypes = {
	_id: PropTypes.string.isRequired,
	title: PropTypes.string,
	description: PropTypes.string,
	tag: PropTypes.string,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
};

export default NoteItem;
