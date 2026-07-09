const mongoose = require("mongoose");

mongoose
    .connect(
        "mongodb+srv://anushkachauhanannu_db_user:Anushka7182@practicecluster.pshvkwj.mongodb.net/Trello"
    )
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = mongoose;