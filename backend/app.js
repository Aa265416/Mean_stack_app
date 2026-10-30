const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const Post = require("./models/post");

const app = express();

mongoose.connect('mongodb+srv://ariesarpit123:M3V7Au1ZO2vcfBJx@postapp.uthvvst.mongodb.net/?retryWrites=true&w=majority&appName=PostApp')
.then(()=>{
    console.log("Connection to database");  
}).catch((error)=>{
    console.log("Connection failed", error);
})

app.use(cors());
app.use(bodyParser.json());

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost => {
        console.log(createdPost);
        res.status(201).json({
            message: 'Post added Successfully',
            postId: createdPost._id
        })
    });

})

app.get('/api/posts',(req, res, next) => {
    Post.find()
    .then(documents =>{
        res.status(200).json({
            message: 'Post fetched successfully',
            posts: documents
        });
    })

})

app.put("/api/posts/:id", (req, res, next)=>{
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({_id: req.params.id}, post).then(result=>{
        console.log(result);
        res.status(200).json({message: "Update successful!"});
    })
})

app.delete('/api/posts/:id', (req, res, next)=>{
    //console.log(req.params.id);
    Post.deleteOne({_id: req.params.id}).then((result)=>{
        console.log(result);
        
    })
    res.status(200).json({
        message:"Post deleted"
    })
})

module.exports = app;