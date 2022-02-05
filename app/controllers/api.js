const express = require("express");
const db = require("../models/repo")
const Movies = require("../services/github")


const router = express.Router();

router.get("/", function(req, res) {
  res.send({'name':"Hello World"});
});

router.get("/account", async function(req,res){


  const result = await db.query("SELECT * FROM accounts")

  console.log(result.rows)
  res.send(result.rows)
})

router.get("/movies", async function(req,res){
 const movies = new Movies()
 const data = await movies.get()

 res.send(data)

})

module.exports = router;






