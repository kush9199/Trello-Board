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
const organizationModel = mongoose.model("organization",organizationSchema);
const userModel = mongoose.model("users",userSchema);

module.exports={
    organizationModel,
    userModel
}


