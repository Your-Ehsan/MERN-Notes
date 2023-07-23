import PropTypes from "prop-types";
const NoteItem = ({ _id, title, description, tag, createdAt, updatedAt }) => {
  return (
    <div id={_id}>
      <div className="relative flex w-auto max-w-md flex-col items-start gap-2 overflow-hidden rounded-lg p-4 shadow-lg">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-base">{description}</p>
        <button className="rounded-md bg-red-600 px-5 py-2 text-white shadow-xl transition-all duration-300 hover:bg-red-700">
          delete
        </button>
        <button className="rounded-md bg-blue-600 px-5 py-2 text-white shadow-xl transition-all duration-300 hover:bg-blue-700">
          edit
        </button>
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
