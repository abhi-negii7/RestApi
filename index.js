const { urlencoded } = require("body-parser");
const express = require("express");
const { url } = require("inspector");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  { id: uuidv4(), username: "john_doe", content: "Hello World!" },
  { id: uuidv4(), username: "jane_smith", content: "Express is great!" },
  { id: uuidv4(), username: "alice_jones", content: "I love coding!" },
  { id: uuidv4(), username: "bob_brown", content: "JavaScript is awesome!" },
];

// Routes
// Home Route
app.get("/post", (req, res) => {
  res.render("index.ejs", { posts });
});

// New Post Route
app.get("/post/new", (req, res) => {
  res.render("new.ejs");
});

// Create Post Route
app.post("/post", (req, res) => {
  const { username, content } = req.body;
  posts.push({ id: uuidv4(), username: username, content: content });
  res.redirect("/post");
});

// Show Post Route
app.get("/post/:id", (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const post = posts.find((p) => id == p.id);
  res.render("show.ejs", { post });
});

// Edit Post Route
app.patch("/post/:id", (req, res) => {
  const { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => p.id === id);
  post.content = newContent;
  // console.log(post);
  res.redirect("/post");
});

// Edit Form Route
app.get("/post/:id/edit", (req, res) => {
  const { id } = req.params;
  // console.log(id);
  let post = posts.find((p) => p.id === id);
  // console.log(post);
  res.render("edit.ejs", { post });
});

// Delete Post Route
app.delete("/post/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/post");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/post`);
});
