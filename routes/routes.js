const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs.readFile("db/db.json","utf-8", (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);

        //routes

        // get route
        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });

        //post route
        app.post("/api/notes", function (req, res) {
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log ("New note added: " + newNote.title);
        });

        //get note by id
        app.get("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note id " +req.params.id);
        });

        // deletes a note by id
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id "+req.params.id);
        });

        //display notes at /notes
        app.get('/notes', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // display index when other routes accessed
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //updates the json file when note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                if(err) throw errl
                return true;
            });
        }

    });
}