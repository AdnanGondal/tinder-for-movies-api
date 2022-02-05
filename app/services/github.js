const axios = require("axios");

class MoviesDB {
  constructor() {
    
    this.url = `https://api.themoviedb.org/3/movie/popular?api_key=18e33d5d2ad9d4c5817f031d05a2700f&language=en-US&page=${(Math.floor(Math.random() * 100) + 1)}`;
  }

  async get() {
    const response = await axios.get(this.url);
    return response.data
  }
}

module.exports = MoviesDB;
