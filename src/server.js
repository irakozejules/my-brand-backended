import express from "express" //ES6
// const express = require("express")
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
// import blogRouter from "./routes/blogRoute.js"
import allRoutes from "./routes/allRoutes.js"
import mongoose from "mongoose"
import fileupload from "express-fileupload"


mongoose.set('strictQuery', false);

//import allRoute from "./routes/allRoutes.js"
// configuring dotenv
dotenv.config();

// configuring dotenv
dotenv.config();

//create server instance 
const app= express();

//USE OF CORS AND BODYPARSER
app.use(cors())
app.use(bodyParser.json())
app.use(fileupload({useTempFiles:true}))
//
app.use("/api/v1", allRoutes)

//define some variables
const port=process.env.PORT
const hostName= process.env.HOST


// DATABASE CONNECTION INSTANCE
const con = () => mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })



//route- home routes
app.get("/", (req,res)=>{
    res.status(200).send(`
    <h1 style=" text-align: center; color:blue; margin-top:40px ">Welcome to Home Page</h1>
    `)
})



// INSTANCE to listen to SERVER
const startServer= () => app.listen(port);

Promise.all([ con(), startServer() ])

.then(()=>{
    console.log(`MongoDB connected and server start listening at http://${hostName}:${port}`)
  
})
.catch((err) => console.log(err))


// app.listen(port, ()=>{
//     console.log(`server listen at http://${hostName}:${port}`)
// })