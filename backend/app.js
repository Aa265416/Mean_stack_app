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
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });

})
app.get("/api/posts", (req, res, next) => {
 Post.find().then(documents => {
  res.status(200).json({
    message: "Posts fetched Successfully",
    posts: documents
  });
  
 })
});
app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  }).catch((error) => {
    console.log("error", error.message);
  })
  res.status(200).json({message: 'Post deleted'})
})

module.exports = app;
