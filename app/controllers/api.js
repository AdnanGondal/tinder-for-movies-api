const express = require("express");
const db = require("../models/repo")
const Movies = require("../services/movies")
const format = require('pg-format');


const movies = new Movies()


const router = express.Router();


router.post("/group", async function(req,res){
  const {name , num} = req.body;

  const code = (Math.random() + 1)
  .toString(36)
  .substring(4)
  .toUpperCase();

  try {
  const data = await db.query("INSERT INTO groups(name,code) VALUES ($1,$2) RETURNING id",[name,code])
  const group_id = data.rows[0].id

  // add num number of movies to the movies database....

  
  const moviesData = await movies.getNo(num)
  
  const values = moviesData.map(x => [group_id,x.title,x.overview,x.poster_path,x.release_date,x.popularity,x.vote_average])

  console.log(values)
  await db.query(format('INSERT INTO movies(group_id,title,overview,poster_path,release_date,popularity,vote_average) VALUES %L',values),[],(err,result)=>{
    console.log(error)
    console.log(result)
  })

  res.send({"message":"success","groupID":group_id,"code":code})
} catch(e) {
  console.log(e)
  res.status(500).send({"message":"failure"})
}

})

router.get("/group/:code/movies", async function(req,res){

  const {code} = req.params;

  const group = await db.query("SELECT * FROM groups WHERE code = $1",[code])

  console.log("HERE")
  console.log(group)
  if (!group.rows[0]){
    res.status(400).send({"message":"Group not found."})
    return
  }

  const groupId = group.rows[0].id;

  const movies = await db.query("SELECT * FROM movies WHERE group_id = $1",[groupId])

  res.send({"movies":movies.rows,"group_id":groupId})
})


router.post("/movie/:id",async function(req,res){

  const {id} = req.params
  const {score} = req.body

  try{
    if (score){
      await db.query("UPDATE movies SET votes = votes+1 WHERE movie_id = $1",[id])
    }
    res.send("successfully voted")
  } catch(e){
    console.log(e)
    res.status(400).send("unsuccessfully voted")
  }


});





module.exports = router;






