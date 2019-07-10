const express = require("express");

const PostsRouter = require("./posts/post-router");

const server = express();

server.use(express.json());
server.use("/api/posts", PostsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Server Running</h2>`);
});

const port = 5000;
server.listen(port, () => {
  console.log(`\n***Server Running on Port ${port}`);
});
