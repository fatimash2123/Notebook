const mongoose=require("mongoose")
const express=require("express")
const app=express()
const {mongoURL}=require("./data")
const { fetchUser } = require("./app_server/middlewares/fetchuser")

app.use(express.json())

//connection to db
mongoose.connect(mongoURL)
.then(res=>{console.log("Connection to db successful")})
.catch((err)=>{console.log(err);console.log("Connection to db succesful")})

//middlewares connecting to routes
app.use("/authentication",require("./app_server/routes/authentication"))
app.use("/notes",require("./app_server/routes/notes"))

app.get("/",(req,res)=>{
    res.send("welcome to notebook")
})

app.listen(3001,()=>{
    console.log("server running at 3000 port")
})