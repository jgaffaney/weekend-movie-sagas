// a reusable form used to add a movie or edit the same details.  
// pass in a movie if you want to edit it
// pass in new = true if adding a new movie

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BackButton from '../BackButton/BackButton';

// MUI components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { FormControl, TextField } from '@mui/material';

function MovieForm(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' })
    }, [])

    const [movieData, setMovieData] = useState(props.movie)
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        
        setSelectedIndex(index);
        setMovieData({...movieData, genre_id: index + 1})
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    // grab genres for drop down list
    const genres = useSelector(store => store.genres)

    function optionMaker() {
        const results = []
        for (let genre of genres) {
            results.push(genre.name)
        }
        return results
    }

    const options = optionMaker();
    // console.log('options: ', options);
    // will dispatch a post is props.new = true, will dispatch and update if false
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('new movieData: ', movieData);
        if (props.new) {
            dispatch({ type: 'POST_MOVIE', payload: movieData })
            history.push('/')
        } else {
            dispatch({ type: 'UPDATE_MOVIE', payload: movieData })
            history.push('/')
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
                <List
                    component="nav"
                    aria-label="Genre"
                    sx={{ bgcolor: 'background.paper' }}
                >
                    <ListItem
                        button
                        id="lock-button"
                        aria-haspopup="listbox"
                        aria-controls="lock-menu"
                        aria-label="Genre"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClickListItem}
                    >
                        <ListItemText
                            primary="Select a Genre"
                            secondary={options[selectedIndex]}
                        />
                    </ListItem>
                </List>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'lock-button',
                        role: 'listbox',
                    }}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            // disabled={index === 0}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
                {/* <Button
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
                </Menu> */}
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