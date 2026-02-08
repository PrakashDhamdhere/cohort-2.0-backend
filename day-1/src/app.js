const express = require('express');
const app = express();

app.use(express.json());

// Rest API

let notes = [];

app.post('/api/notes', (req, res)=>{
    notes.push(req.body);
    res.send("note created successfully");
})
app.get('/api/notes', (req, res)=>{
    res.json(notes);
})
app.get('/api/notes/:index', (req, res)=>{
    res.json(notes[req.params.index]);
})
app.delete('/api/notes/:index', (req, res)=>{
    notes.splice(req.params.index, 1);
    res.send("note deleted successfully");
})
app.patch('/api/notes/:index', (req, res)=>{
    notes[req.params.index].description = req.body.description;
    res.send("note updated successfully");
})




module.exports = app;