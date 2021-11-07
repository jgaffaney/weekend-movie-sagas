// a reusable form used to add a movie or edit the same details.  
// pass in a movie if you want to edit it
// pass in new = true if adding a new movie

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import BackButton from '../BackButton/BackButton';

// MUI components
import {
    Button, FormControl, Menu, TextField,
    MenuItem
} from '@mui/material';

function MovieForm(props) {

    const dispatch = useDispatch();
    // const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' })
    }, [])

    const [movieData, setMovieData] = useState(props.movie)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        
    };
    const handleClose = (e) => {
        setMovieData({...movieData, genre_id: e.currentTarget.value});
        setAnchorEl(null)
    };


    // grab genres for drop down list
    const genres = useSelector(store => store.genres)

    // will dispatch a post is props.new = true, will dispatch and update if false
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('new movieData: ', movieData);
        if (props.new) {
            dispatch({ type: 'POST_MOVIE', payload: movieData })
        } else {
            dispatch({ type: 'UPDATE_MOVIE', payload: movieData })
        }
    }

    return (
        <FormControl onSubmit={handleSubmit}>
            {/* <label htmlFor='titleInput'>Movie Title</label> */}
            <TextField
                value={movieData.title}
                onChange={(e) => { setMovieData({ ...movieData, title: e.target.value }) }}
                id='titleInput'
                label='Movie Title' />
            {/* <label htmlFor='posterInput'>Poster URL</label> */}
            <TextField
                value={movieData.poster}
                onChange={(e) => { setMovieData({ ...movieData, poster: e.target.value }) }}
                id='posterInput'
                label='Poster URL' />
            {/* <label htmlFor='descriptionInput'>Description/Synopsis</label> */}
            <TextField
                value={movieData.description}
                cols={40} minRows={3} maxRows={5}
                onChange={(e) => { setMovieData({ ...movieData, description: e.target.value }) }}
                id='descriptionInput'
                multiline
                label='Movie Description' />
            {/* dropdown menu for genres */}
            <div>
                <Button
                    id='dropdownBTN'
                    aria-controls='basic-menu'
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >Select a Genre
                </Button>
                <Menu
                    id="genreMenu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {genres.map((genre, i) => (
                        <MenuItem key={i} value={`${genre.id}`} 
                        // onClose={handleClose}
                        onClick={(e) => {handleClose(e)}}
                        >{genre.name}</MenuItem>
                    ))}
                </Menu>
            </div>
            {/* <select onChange={(e) => {setMovieData({...movieData, genre_id: e.target.value})}} name='Genre' id='genre'>
                <option value=''>Please select a Genre</option>
                
            </select> */}
            {props.new ?
                (<button onClick={handleSubmit}>Add Movie</button>
                ) : (
                <button onClick={handleSubmit}>Edit Movie</button>)}
            <BackButton text={`Cancel`} />
        </FormControl>
    )
}

export default MovieForm;