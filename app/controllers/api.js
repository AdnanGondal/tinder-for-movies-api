const express = require("express");
const db = require("../models/repo")
const Movies = require("../services/movies")
const format = require('pg-format');


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

  const code = (Math.random() + 1)
  .toString(36)
  .substring(4)
  .toUpperCase();


  const data = await db.query("INSERT INTO groups(name,code) VALUES ($1,$2) RETURNING id",[name,code])
  const group_id = data.rows[0].id

  // add num number of movies to the movies database....

  console.log(num)
  const moviesData = await movies.getNo(num)
  
  const values = moviesData.map(x => [x.id,group_id])

  await db.query(format('INSERT INTO movies(id,group_id) VALUES %L',values),[],(err,result)=>{
    console.log(error)
    console.log(result)
  })

  res.send({"message":"success","groupID":group_id,"code":code})

})





module.exports = router;






