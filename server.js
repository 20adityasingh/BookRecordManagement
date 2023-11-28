const express = require("express");

const app=express();

const userRouter = require("./routes/user"); 

const bookRouter = require("./routes/book");

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send({
    message: "Server has started",
    data: "Hey! Continue your work :-)",
  });
});

app.use("/user",userRouter);

app.use("/book",bookRouter);

app.get("*",(req,res)=>{
    res.status(404).send({
        message:"Server Not Found"
    });
});

app.listen(port,()=>{
    console.log("Server has been started at PORT:",port)
})

