const express = require("express")
const router = express.Router()
const User = require("../models/user")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { secretKey } = require("../../data")
const fetchuser = require("../middlewares/fetchuser")


//this route creates and saves a new user
router.post("/register",
    [
        body('name', "Enter valid name").isLength({ min: 3 }),
        body('email', "enter email correctly").isEmail(),
        body('password', "Password lngth not valid").isLength({ min: 5 })
    ],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }
        console.log(req.body)
        const { name, email, password } = req.body
        // const user=new User(req.body)
        // user.save()
        // res.send({status:"successfully stored",user})

        //generatina a salt and then hashing the password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        User.create({
            name: name,
            email: email,
            password: hash
        })
            .then(user => {
                const data = { "user": { id: user[0].id } }
                const token = jwt.sign(data, secretKey)
                res.status(200).json({ "token": token })
            })
            .catch(err => { res.status(500).json({ "error": "email should be unique", "message": err.message }) })
    })

router.post("/login", (req, res) => {
    const { email, password } = req.body
    User.find({ "email": email })
        .then(async (user) => {
            //if user is empty
            if (!user[0]) {
                return res.status(403).json({ "error": "wrong credentials" })
            }
            else {
                console.log(user[0].email)
                //now compare the password
                const isPasswordCorrect = await bcrypt.compare(password, user[0].password)
                console.log(isPasswordCorrect)
                //if password is not correct
                if (!isPasswordCorrect) {
                    return res.status(403).json("error", "wrong credentials")
                }
                else {
                    const data = {
                        user: { id: user[0].id }
                    }
                    const token = jwt.sign(data, secretKey)
                    res.status(200).json({ token })

                }
            }
        })
        .catch(err => {
            res.status(500).json({ "error": "Server error" })
        })


})

//route to get a user
router.get("/getUserDetails", fetchuser,async (req, res) => {
    try {
        const user = req.user
        const userFound = await User.find({ _id: user.id }, { password: 0 })
        res.status(200).json({"user":userFound[0]})
    }
    catch (err) { 
        console.log(err);
        res.status(500).json({"error":"server eeror"})
    }
})

router.get("/", (req, res) => {
    obj = {
        name: "fatima",
        age: 22
    }
    res.status(200).json(obj)
})

module.exports = router