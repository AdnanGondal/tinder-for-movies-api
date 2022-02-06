const db = require("./app/models/repo")
const readline = require("readline");


const initialiseDatabase = async function(){

    const groupsTable = `
    DROP TABLE IF EXISTS groups CASCADE;
    
    CREATE TABLE groups (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        code VARCHAR(10) NOT NULL
    );
    `;

    try {
        console.log("Creating groups table");
        await db.query(groupsTable);
        console.log("Created groups table")
      } catch (e) {
        console.log("error creating viewings table")
        console.log(e);
      }

    const moviesTable = `
    DROP TABLE IF EXISTS movies CASCADE;

    CREATE TABLE movies (
        id INT NOT NULL PRIMARY KEY,
        group_id INTEGER NOT NULL,
        votes INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        title TEXT,
        overview TEXT,
        poster_path TEXT,
        release_date TEXT,
        popularity NUMERIC,
        vote_average NUMERIC,
        FOREIGN KEY(group_id) REFERENCES groups(id)
    );
    `

    try {
        console.log("Creating movies table");
        await db.query(moviesTable);
        console.log("Created movies table")
      } catch (e) {
        console.log("error creating movies table")
        console.log(e);
      }

      const usersTable = `
      DROP TABLE IF EXISTS users CASCADE;
  
      CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          group_id INTEGER NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(group_id) REFERENCES groups(id)
      );
      `
  
      try {
          console.log("Creating users table");
          await db.query(usersTable);
          console.log("Created users table")
        } catch (e) {
          console.log("error creating user table")
          console.log(e);
        }

}


const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });


input.question(
    "Running schema.ts will wipe all database data, are you sure you want to run? [y/n]\n> ",
    async (answer) => {
      if (answer.toLowerCase() === "n") {
        process.exit(0);
      }
  
      await initialiseDatabase();
   
      input.close();
    }
  );
