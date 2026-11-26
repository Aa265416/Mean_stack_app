const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const postRoutes = require("./routes/posts"); 

const app = express();



app.use(cors());
app.use(bodyParser.json());

app.use("/api/posts", postRoutes);


module.exports = app;