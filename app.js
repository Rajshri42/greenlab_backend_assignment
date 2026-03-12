const express = require("express");
require("./config/db");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});