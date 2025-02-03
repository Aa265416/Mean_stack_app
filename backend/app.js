const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const Post = require("./models/post");

const app = express();

mongoose.connect("mongodb+srv://User1000:Test1234@appposts.zfl2j.mongodb.net/node-angular?retryWrites=true&w=majority&appName=AppPosts")
.then(()=>{
  console.log("Connected to database");
}).catch((error)=>{
  console.error("Connection failed", error.message);
})

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  next();
});
app.post("/api/posts", (req, res, next)=> {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: "Post added successfully"
  });
})
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
