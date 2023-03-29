require("dotenv").config();
require("./config/db")();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const verifyRefreshToken = require("./middleware/verifyRefreshToken");

const app = express();

app.use(credentials);

app.use(cors(require("./config/corsOptions")));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyRefreshToken);
app.use("/employees", require("./routes/api/employees"));
app.use("/users", require("./routes/api/users"));

app.all("*", (req, res) => {
  res.sendStatus(404);
});

const PORT = process.env.PORT || 3500;
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
