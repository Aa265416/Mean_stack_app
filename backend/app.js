const express = require("express");

const app = express();

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "jahsjashd",
      title: "First server side post",
      content: "This is coming from server",
    },
    {
      id: "asdasdas",
      title: "second server side post",
      content: "This is coming from server",
    },
  ];
  res.status(200).json({
    message: "Posts fetched Successfully",
    posts: posts
  });
});

module.exports = app;
