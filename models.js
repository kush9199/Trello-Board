const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://anushkachauhanannu_db_user:Anushka7182@practicecluster.pshvkwj.mongodb.net/Trello")
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
});
//schema and models 
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const organizationSchema = new mongoose.Schema({
    title: String,
    description: String,
    admin: mongoose.Schema.Types.ObjectId,
    members: [mongoose.Schema.Types.ObjectId]
});

const boardSchema = mongoose.Schema({
    title: String,
    organizationId: mongoose.Schema.Types.ObjectId
});
const issueSchema = mongoose.Schema({
    title: String,
    description: String,
    boardId: mongoose.Types.ObjectId,
    status: String
});
const organizationModel = mongoose.model("organization",organizationSchema);
const userModel = mongoose.model("users",userSchema);
const boardModel = mongoose.model("boards", boardSchema);
const issueModel = mongoose.model("issues", issueSchema);

module.exports={
    organizationModel,
    userModel,
    boardModel,
    issueModel
}


