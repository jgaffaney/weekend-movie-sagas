const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.get('/:id', (req, res) => {
  const values = req.params.id;  
  
  const queryText = `
  SELECT "movies"."id", "title",  "poster", "description", ARRAY_AGG("genres"."name") AS "genres" from "movies"
  JOIN "movies_genres" AS "MG" ON "MG"."movie_id" = "movies"."id"
  JOIN "genres" ON "genres"."id" = "MG"."genre_id"
  WHERE "movies"."id" = $1
  GROUP BY "movies"."id", "movies"."title", "movies"."poster", "movies"."description";
  `
  pool.query(queryText, [values])
    .then(response => {
      res.send(response.rows)
    }).catch(err => {
      console.log('Error on GET with id: ', err);
      res.sendStatus(500)
    })
})

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
    .then(result => {
      console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id

      // Now handle the genre reference
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

      // Catch for first query
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})

router.put('/', (req, res) => {
  const movie = req.body
  const updateMovieQuery = `
  UPDATE "movies"
  SET "title" = $1,
      "poster" = $2,
      "description" = $3
  WHERE "id" = $4;
  
  `
  const values = [movie.title, movie.poster, movie.description, movie.id]
  pool.query(updateMovieQuery, values)
    .then(response => {
      console.log('Successful update: ', response);
      const deleteMovieGenrePairs = `
      DELETE FROM "movies_genres"
      WHERE "movie_id" = $1;
      `
      const values2 = [movie.id]
      pool.query(deleteMovieGenrePairs, values2)
        .then(resp => {
          console.log('successful genrepair delete: ', resp);
          const genrePairQuery = `
          INSERT INTO "movies_genres" ("movie_id", "genre_id")
          VALUES ($1, $2);
          `
          const values3 = [movie.id, movie.genre_id]
          pool.query(genrePairQuery, values3)
            .then(respo => {
              console.log('successful genrePair update: ', respo);
              res.sendStatus(200)
            }).catch(err => {
              console.log('Error adding genre to movie: ', err);
              res.sendStatus(500)              
            })
        }).catch(err => {
          console.log('Error on deleting movie genres: ', err)
          res.sendStatus(500)
        })
    }).catch(err => {
      console.log('Error on update: ', err);
      res.sendStatus(500)
    })
})

router.delete('/:id', (req, res) => {
  const queryText = `
  DELETE FROM "movies_genres"
  WHERE "movie_id" = $1;
  `
  const values = req.params.id;
  pool.query(queryText, [values])
    .then(response => {
      console.log('movies_genres delete successful: ', res);
      const newQuery = `
      DELETE FROM "movies"
      WHERE "id" = $1;
      `
      pool.query(newQuery, [values])
        .then(resp=> {
          console.log('Successful Delete from movies: ', resp);
          res.sendStatus(204)
        }).catch(err => {
          console.log('Error on delete from movies: ', err);
          res.sendStatus(500)
        })
    }).catch(err => {
      console.log('Error on delete from movies_genres: ', err);
      res.sendStatus(500)
    })
})

module.exports = router;