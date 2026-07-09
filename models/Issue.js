const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: String,

    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "boards"
    },

    status: {
        type: String,
        default: "TODO"
    }

});

const issueModel = mongoose.model(
    "issues",
    issueSchema
);

module.exports = issueModel;