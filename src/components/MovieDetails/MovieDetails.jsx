import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

function MovieDetails() {

    const { id } = useParams();

    const dispatch = useDispatch();

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
        </div>
    )
}

export default MovieDetails;