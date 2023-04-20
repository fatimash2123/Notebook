const express = require("express")
const router = express.Router()
const Note = require("../models/note")
const { body, validationResult } = require("express-validator")
const fetchuser = require("../middlewares/fetchuser")

//get all notes for a specific user
router.get("/", fetchuser, (req, res) => {
    Note.find({ "userid": req.user.id })
        .then(notes => { res.status(200).json({ notes }) })
        .catch(err => { res.status(500).json({ "error": "server error" }) })
})

//add a note for the user
router.post("/", fetchuser, (req, res) => {
    const { title, description, tag } = req.body
    const userid = req.user.id
    Note.create(({ title, description, tag, userid }))
        .then(note => { res.status(200).json({ note }) })
        .catch(err => { res.status(500).json({ "error": "server error" }) })
})

//update an existing note for the user
router.patch("/:id", fetchuser, (req, res) => {
    const noteid = req.params.id
    const { title, description, tag } = req.body
    const userid = req.user.id

    Note.find({ "userid": userid, "_id": noteid })
        .then(note => {
            //if note is empty
            if (!note) {
                res.status(404).json({ "status": "note doesn't exists" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ "error": "server error" })
        })
    Note.findByIdAndUpdate({ _id: noteid }, { title, description, tag },{new:true})

        .then(note => { res.status(200).json({ note }) })
        .catch(err => { console.log(err); res.status(500).json({ "error": "server error" }) })
})

//delete an existing note for the user
router.delete("/:id", fetchuser, (req, res) => {
    const noteid = req.params.id
    const userid = req.user.id

    Note.find({ "userid": userid, "_id": noteid })
        .then(note => {
            //if note is empty
            if (!note) {
                res.status(404).json({ "status": "note doesn't exists" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ "error": "server error" })
        })
    Note.findByIdAndDelete({ _id: noteid })
    
        .then(note => { res.status(200).json({ statue:"deleted",note }) })
        .catch(err => { console.log(err); res.status(500).json({ "error": "server error" }) })
})

module.exports = router