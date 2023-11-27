const express = require("express");

const app=express();

const {users} = require("./DATA/user.json");

const {books} = require("./DATA/books.json")

const port = 8081;

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).send({
        message:"Server has started",
        data:"hey",
    });
});

app.get("/users", (req, res) => {
    res.status(200).send({
        data:users
    });
});

app.get("/books",(req,res)=>{
    res.status(200).send({
        data:books
    })
})

app.get("*",(req,res)=>{
    res.status(404).send({
        message:"Server Not Found"
    })
})

app.listen(port,()=>{
    console.log("Server has been started at PORT:",port)
})

