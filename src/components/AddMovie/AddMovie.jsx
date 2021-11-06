import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Input } from '@mui/material';



function AddMovie() {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({type: 'FETCH_GENRES'})
    }, [])

    // state variables to hold the values entered until submit
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [poster, setPoster] = useState('');
    const [description, setDescription] = useState('');


    const genres = useSelector(store=>store.genres)
    console.log('genres in add: ', genres);

    const movieData = {
        title: title,
        poster: poster,
        description: description,
        genre_id: genre
    }

    console.log('movieData: ', movieData);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('clicked');
        axios.post('/api/movie', movieData)
            .then(response => {
                console.log('post success: ', response);
                history.push('/');
            }).catch(err => {
                console.log('error on post: ', err);
            })
    }

    return(
        <>
        <h2>Add a New Movie</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor='titleInput'>Movie Title</label>
            <input onChange={(e)=>{setTitle(e.target.value)}}id='titleInput'/>
            <label htmlFor='posterInput'>Poster URL</label>
            <input onChange={(e)=> {setPoster(e.target.value)}}id='posterInput' />
            <label htmlFor='descriptionInput'>Description/Synopsis</label>
            <textarea cols={40} rows={4} onChange={(e)=> {setDescription(e.target.value)}}id='descriptionInput'></textarea>
            {/* dropdown menu for genres */}
            <select onChange={(e) => {setGenre(e.target.value)}} name='Genre' id='genre'>
                <option value=''>Please select a Genre</option>
                {genres.map((genre, i) => (
                    <option  key={i} value={`${genre.id}`}>{genre.name}</option>
                ))}
            </select>
            <button type="submit">Add Movie</button>

        </form>
        
     
        </>
    )

}

export default AddMovie;