const express = require("express");
const router = express.Router();
const { books } = require("../DATA/books.json");
const {users} = require("../DATA/user.json")
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

router.put("/:id",(req,res)=>{
    const { id } = req.params;
    const book = books.find((each) => each.id === id);
    const {data} = req.body;
    if (!book) {
      return res.status(404).send({
        message: "Book doesn't exist",
      });
    }
    const updatedBook = books.map((each) => {
        if(each.id === id){
            return{
                ...each,
                ...data
            };  
        }
        return each;
    });
    res.status(201).send({
        message:"Book Updated",
        data:updatedBook
    })
})

router.get("/issued/by-user", (req, res) => {
  const issuedBooks = [];

  users.forEach((user) => {
    if (user.issuedBook) {
      const Book = books.find((book) => book.id === user.issuedBook);

      if (Book) {
        const issuedBook = { ...Book }; // Create a new object to avoid referencing the original book

        // Assign user-specific details to the book
        issuedBook.issuedBy = user.name;
        issuedBook.issuedDate = user.issuedDate;
        issuedBook.returnDate = user.returnDate;

        issuedBooks.push(issuedBook);
      }
    }
  });

  if (issuedBooks.length === 0) {
    return res.status(404).send({ message: "No books issued yet." });
  }

  return res.status(200).send({ success: true, data: issuedBooks });
});




module.exports = router;