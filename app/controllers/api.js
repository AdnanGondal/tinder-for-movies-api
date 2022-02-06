const express = require("express");
const db = require("../models/repo")
const Movies = require("../services/movies")


const movies = new Movies()


const router = express.Router();

router.get("/", function(req, res) {
  res.send({'message':"Hello World"});
});

router.get("/account", async function(req,res){
  const result = await db.query("SELECT * FROM accounts")

  console.log(result.rows)
  res.send(result.rows)
})

router.get("/movies", async function(req,res){

 const data = await movies.getNo(5)
 res.send(data)
})


router.post("/group", async function(req,res){
  const {name , num} = req.body;

  console.log(req.params)

  const code = (Math.random() + 1)
  .toString(36)
  .substring(4)
  .toUpperCase();

  try {
    db.query("INSERT INTO groups(name,code) VALUES ($1,$2)",[name,code])
  } catch(e) {
     console.log("ERROR adding to groups database")
     console.log(e)
  }


  // add num number of movies to the movies database....

  console.log(num)
  const data = await movies.getNo(num)
  
  const ids = data.map(x => x.id)
  console.log(ids)
  res.send({"message":"success","ids":ids})

})





module.exports = router;






