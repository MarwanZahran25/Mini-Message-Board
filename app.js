const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const port = process.env.PORT || 3000;
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetsPath));
app.get("/", (req, res) => {
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
  res.render("message", {
    number: req.params.id,
    message: messages[req.params.id],
  });
});
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
