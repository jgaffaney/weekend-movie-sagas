import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import './MovieList.css'
import { Container, Button, Typography } from '@mui/material';

function MovieList() {

    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <Button color='info' variant='contained' onClick={() => {history.push('/addMovie')}}>Add Movie</Button>
            <h1>MovieList</h1>
            <Container sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} className="movies">
                {movies.map(movie => {
                    return (
                        <Card style={{backgroundColor: '#cccccc'}} sx={{mx: '1%', width: '200px', padding: '5px', marginTop: '1%'}}key={movie.id} >
                            <Typography variant='h6'>{movie.title}</Typography>
                            <img onClick={() => history.push(`/details/${movie.id}`)} src={movie.poster} alt={movie.title}/>
                        </Card>
                    );
                })}
            </Container>
        </main>

    );
}

export default MovieList;