import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

function MovieDetails() {

    // const dispatch = useDispatch();
    const movies = useSelector(store => store.movies)

    const { id } = useParams();
    console.log('id in MovieDetails is: ', id);
    function selectedMovie() {

        for (let movie of movies) {
            console.log('movie in movies: ', movie);
            console.log('movie.id is: ', movie.id);
            console.log('id is: ', id);
            if (movie.id == id) {
                return movie;
            }
        }
    }

    const movieToDisplay = selectedMovie();
    // useEffect(() => {
    //     selectedMovie();
    // }, [])

    return (
        <div>
            {/* <div>Details: {JSON.stringify(movieToDisplay)}</div> */}
            <h2>{movieToDisplay.title}</h2>
            <img src={movieToDisplay.poster} />
            <h3>{movieToDisplay.description}</h3>
        </div>
    )

}

export default MovieDetails;