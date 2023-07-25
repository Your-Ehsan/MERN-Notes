const { mongoose } = require("../Database"),
	{ Schema } = mongoose,
	NotesSchema = new Schema({
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		tag: {
			type: String,
			default: "General",
		},
	});

module.exports = mongoose.model("notes", NotesSchema);
