import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

function MovieDetails() {

    const { id } = useParams();

    const dispatch = useDispatch();

    const movies = useSelector(store => store.movies)
    const selectedGenres = useSelector(store=>store.selectedGenres)
    const details = selectedGenres.genres

    useEffect(() => {
        dispatch({type: 'FETCH_SELECTED_GENRES', payload: id})
    },[])

    console.log('details is: ', details);
    // loop through all movies to find the selected movie
    function selectedMovie() {
        for (let movie of movies) {
            if (movie.id == id) {
                return movie;
            }
        }
    }
    const movie = selectedMovie();

    return (
        <div>
            <h2>{movie.title}</h2>
            <h3>Genres: </h3>
            <p>{details.join(", ")}</p>
            <img src={movie.poster} />
            <h3>{movie.description}</h3>
        </div>
    )
}

export default MovieDetails;