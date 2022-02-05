const db = require("../app/models/repo")
const readline = require("readline");

const initialiseDatabase = async function(){
    const viewingsTable = `
    DROP TABLE IF EXISTS viewings CASCADE;
    
    CREATE TABLE viewings (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

    try {
        console.log("Creating viewings table");
        await db.query(viewingsTable);
      } catch (e) {
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
