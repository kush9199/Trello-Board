const express = require("express");
const cors = require("cors");
require("./config/db");
const authRoutes = require("./routes/authRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const boardRoutes = require("./routes/boardRoutes");
const issueRoutes = require("./routes/issueRoutes");
const app = express();
app.use(express.json());
app.use(cors());

//Whenever a request comes whose path starts with /, ask authRoutes whether it knows how to handle it."
app.use("/", authRoutes);
app.use("/", organizationRoutes);
app.use("/", boardRoutes);
app.use("/", issueRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});