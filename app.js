const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
require("dotenv").config();
const getAll = require("./db/queries");
const url = require("url");
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetsPath));
app.get("/", async (req, res) => {
  const messages = await getAll();
  res.render("index", { messages, title: "Mini message board" });
});
app.get("/new", (req, res) => {
  res.render("new");
});
app.post("/new", (req, res) => {
  const newMessage = {
    text: req.body.message,
    user: req.body.userName,
    added: new Date(),
  };
  messages.push(newMessage);
  res.redirect("/");
});
app.get("/:id", (req, res) => {
  const message = messages[req.params.id];

  if (message) {
    res.render("message", {
      number: req.params.id,
      message: message,
    });
  } else {
    res.status(404).send("Message not found");
  }
});
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
