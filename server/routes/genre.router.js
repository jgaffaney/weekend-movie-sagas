const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const queryText = `
  SELECT * FROM genres;
  `
  pool.query(queryText)
    .then(response => {
      res.send(response.rows)
    }).catch(err => {
      console.log('Error on GET for genres: ', err);
    })
  res.sendStatus(500)
});

module.exports = router;