const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization"
    }

});

const boardModel = mongoose.model(
    "boards",
    boardSchema
);

module.exports = boardModel;