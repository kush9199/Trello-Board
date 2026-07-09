const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({

    title: String,

    description: String,

    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ]

});

const organizationModel = mongoose.model(
    "organization",
    organizationSchema
);

module.exports = organizationModel;