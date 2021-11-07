// import {useState, useEffect} from 'react';
// import {useSelector, useDispatch} from 'react-redux';
// import {useHistory} from 'react-router-dom';
// import axios from 'axios';
// import FormControl from '@mui/material/FormControl';
// import { InputLabel, Input } from '@mui/material';
import MovieForm from "../MovieForm/MovieForm";


function AddMovie() {

    // const dispatch = useDispatch();
    // const history = useHistory();

    // useEffect(() => {
    //     dispatch({type: 'FETCH_GENRES'})
    // }, [])

    const defaultMovie = {
        title: '',
        poster: '',
        description: '',
        genre_id: 0
    }


    // const genres = useSelector(store=>store.genres)
    // console.log('genres in add: ', genres);

    // console.log('movieData: ', movieData);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('clicked');
    //     axios.post('/api/movie', movieData)
    //         .then(response => {
    //             console.log('post success: ', response);
    //             history.push('/');
    //         }).catch(err => {
    //             console.log('error on post: ', err);
    //         })
    // }

    return(
        <>
        <h2>Add a New Movie</h2>
        <MovieForm movie={defaultMovie} new={true} />
        </>
    )
}

export default AddMovie;