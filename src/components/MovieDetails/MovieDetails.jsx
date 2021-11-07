import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import BackButton from '../BackButton/BackButton';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';

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
    
    return (
        <Container>
            <Card sx={{width: '50%', m: 'auto'}}>
            {(movie.title) &&
            (<div>
            <h2>{movie.title}</h2>
            <h3>Genres: </h3>
            <p>{movie.genres.join(", ")}</p>
            <img src={movie.poster} />
            <h3>{movie.description}</h3>
            </div>)
        }
        <button onClick={()=>{history.push(`/edit/${movie.id}`)}}>EDIT</button>
        <BackButton text='Back'/>
            </Card>
        </Container>
    )
}

export default MovieDetails;