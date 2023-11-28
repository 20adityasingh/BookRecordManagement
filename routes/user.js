const express = require("express");

const router = express.Router();


const { users } = require("../DATA/user.json");



router.get("/", (req, res) => {
  res.status(200).send({
    data: users,
  });
});

router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;
  const user = users.find((each) => each.id === id);
  if (user) {
    return res.status(404).send({
      message: "User already exist!",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  res.status(201).send({
    message: "User Added Successfully :-)",
    data: users,
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).send({
      message: "User Doesn't exist!",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).send({
    message: "User Updated Successfully",
    data: updateUserData,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  }
  res.status(200).send({
    data: user,
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  return res.status(200).send({
    message: "User Deleted",
    data: users,
  });
});

module.exports=router;