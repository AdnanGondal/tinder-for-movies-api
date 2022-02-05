const express = require("express");
const db = require("../models/repo")


const router = express.Router();

router.get("/", function(req, res) {
  res.send("Hello World");
});

router.get("/account", async function(req,res){


  const result = await db.query("SELECT * FROM accounts")
  console.log(result.rows)
  res.send(result.rows)
})

module.exports = router;




