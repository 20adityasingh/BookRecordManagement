const express = require("express");
const router = express.Router();
const { books } = require("../DATA/books.json");
router.get("/", (req, res) => {
  res.status(200).send({
    data: books,
  });
});

router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const book = books.find((each)=>each.id===id);
    if(!book){
        return res.status(404).send({
            message:"Book doesn't exist"
        });
    }
    res.status(200).send({
        data:book
    });
})
module.exports = router;