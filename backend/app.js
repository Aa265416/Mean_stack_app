const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose')

const postRoutes = require("./routes/posts"); 

const app = express();

mongoose.connect('mongodb+srv://ariesarpit123:M3V7Au1ZO2vcfBJx@postapp.uthvvst.mongodb.net/?retryWrites=true&w=majority&appName=PostApp')
.then(()=>{
    console.log("Connection to database");  
}).catch((error)=>{
    console.log("Connection failed", error);
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use("/api/posts", postRoutes);


module.exports = app;