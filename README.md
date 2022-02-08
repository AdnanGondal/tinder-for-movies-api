# Tinder for movies API

This repository contains the backend code for [Tinder for movies](https://tinder-for-movies-rhv5.herokuapp.com/). 

This is part of a submission for [Royal Hackaway](https://royalhackaway.com/#/), and was build in under 24 hours. 

This is a simple REST API build using NodeJS and Express. CockroachDB has been used for persistence, and it is fully deployed. 


## Usage

| METHOD | URI                             | DESCRIPION                                                                           |
|--------|---------------------------------|--------------------------------------------------------------------------------------|
| POST   | /api/group                      | Add a new group of viewers.                                                          |
| GET    | /api/group/:code/movies         | Get all the movies for a group of viewers in an array; they are randomly allocated.  |
| POST   | /api/movie/:id                  | Add a vote to a given movie.                                                         |
| GET    | /api/group/:code/movies/ratings | This gets each movie, in order of number of votes.                                   |

## Contributing

Pull requests are welcome. 

## License
[MIT](https://choosealicense.com/licenses/mit/)
