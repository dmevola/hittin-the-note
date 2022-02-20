// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

//initialize express
const app = express();
const PORT = process.env.PORT || 3000;

//setup data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(__dirname));

//require route file
// require('./routes/routes')(app);

//listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
}); 