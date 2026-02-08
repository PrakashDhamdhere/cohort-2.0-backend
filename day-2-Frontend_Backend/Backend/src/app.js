const express = require('express');
const app = express();
const noteModel = require('./models/note.model');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')))

app.post('/api/notes', async (req, res)=>{
    const {title, description} = req.body;
    const note = await noteModel.create({
        title,
        description
    })
    res.status(201).json({
        message: "Note created successfully",
        note
    })
})

app.get('/api/notes', async (req, res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    });
})

app.get('/api/notes/:id', async (req, res)=>{
    const note = await noteModel.findById(req.params.id);
    res.status(200).json({
        message: "Note fetched successfully",
        note
    });
})

app.delete('/api/notes/:id', async (req, res)=>{
    const deletedNote = await noteModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message: "Note deleted successfully"
    })
})

app.patch('/api/notes/:id', async (req, res)=>{
    const { description } = req.body;
    const deletedNote = await noteModel.findByIdAndUpdate(req.params.id, {description});
    res.status(200).json({
        message: "Note updated successfully"
    })
})

app.use('*name', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'));
})


module.exports = app;