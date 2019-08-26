const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const todoRoutes = require("./routes/todo");
const auth = require("./routes/user");

const app = express();
const PORT = config.PORT;

//connect to database
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("DB connected ...."))
  .catch(err => console.log("Error connecting to database"));

//middleware
app.use(cors());
app.use(express.json());

//api
app.use("/api/", auth);
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => console.log(`App started on port ${PORT}`));
