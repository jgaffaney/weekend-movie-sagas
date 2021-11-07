import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import './MovieList.css'
import { Container } from '@mui/material';

function MovieList() {

    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <button onClick={() => {history.push('/addMovie')}}>Add Movie</button>
            <h1>MovieList</h1>
            <Container sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} className="movies">
                {movies.map(movie => {
                    return (
                        <Card sx={{mx: '1%', backgroundColor: '##363333' }}key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img onClick={() => history.push(`/details/${movie.id}`)} src={movie.poster} alt={movie.title}/>
                        </Card>
                    );
                })}
            </Container>
        </main>

    );
}

export default MovieList;