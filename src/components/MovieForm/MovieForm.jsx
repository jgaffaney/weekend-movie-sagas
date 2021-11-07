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
import { FormControl, TextField, Button } from '@mui/material';
import axios from 'axios';

function MovieForm(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' })
    }, [])

    const [movieData, setMovieData] = useState(props.movie)
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        
        setSelectedIndex(index);
        setMovieData({...movieData, genre_id: index})
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        axios.delete(`/api/movie/${props.movie.id}`)
            .then(res => {
                console.log('Successful Delete: ', res);
                alert('Your movie was removed from the database')
                history.push('/')
            }).catch(err => {
                console.log('Error on Delete');
            })
    }

    // grab genres for drop down list
    const genres = useSelector(store => store.genres)

    function optionMaker() {
        const results = ['']
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
            axios.post('/api/movie', movieData)
                .then(response => {
                    dispatch({type: 'FETCH_MOVIES'})
                    history.push('/')
                }).catch(err => {
                    log('Error on new movie POST: ', err)
                })
        } else {
            axios.put('/api/movie', movieData )
                .then(response => {
                    dispatch({type: 'FETCH_MOVIES'})
                    history.push('/')
                }).catch(err => {
                    console.log('Error on movie update: ', err);
                })
        }
    }

    return (
        <FormControl onSubmit={handleSubmit} sx={{width: '50%'}}>
            <TextField
                value={movieData.title}
                onChange={(e) => { setMovieData({ ...movieData, title: e.target.value }) }}
                id='titleInput'
                label='Movie Title' />
                <br />
            <TextField
                value={movieData.poster}
                onChange={(e) => { setMovieData({ ...movieData, poster: e.target.value }) }}
                id='posterInput'
                label='Poster URL' />
                <br />
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
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
            <div display='inline'>
            {props.new ?
                (<Button onClick={handleSubmit}>Add Movie</Button>
                ) : (
                    <>
                    <Button onClick={handleSubmit}>Edit Movie</Button>
                    <Button onClick={handleDelete}>Remove Movie</Button>
                    </>)
                }
            <BackButton text={`Cancel`} />
            </div>
        </FormControl>
    )
}

export default MovieForm;