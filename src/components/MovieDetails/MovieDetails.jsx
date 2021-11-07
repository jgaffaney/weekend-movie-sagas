import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import BackButton from '../BackButton/BackButton';

function MovieDetails() {

    const { id } = useParams();

    // declare hook functions
    const dispatch = useDispatch();
    const history = useHistory();

    // grab the movie with all it's details and an array of genres for the selected movie
    const movie = useSelector(store => store.selectedGenres)

    useEffect(() => {
        dispatch({type: 'FETCH_SELECTED_GENRES', payload: id})
    },[])

    console.log('movie is: ', movie);
    return (
        <div>
            {(movie.title) &&
            (<div>
            <h2>{movie.title}</h2>
            <h3>Genres: </h3>
            <p>{movie.genres.join(", ")}</p>

            <img src={movie.poster} />
            <h3>{movie.description}</h3>
            </div>)
        }
        <BackButton text='Back'/>
        </div>
    )
}

export default MovieDetails;