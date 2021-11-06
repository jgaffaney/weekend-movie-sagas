import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// import {useHistory} from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Input } from '@mui/material';



function AddMovie() {

    useEffect(() => {
        dispatch({type: 'FETCH_GENRES'})
    }, [])

    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [poster, setPoster] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const genres = useSelector(store=>store.genres)
    console.log('genres in add: ', genres);
    return(
        <>
        <h2>Add a New Movie</h2>
        <form>
            <label htmlFor='titleInput'>Movie Title</label>
            <input onChange={(e)=>{setTitle(e.target.value)}}id='titleInput'/>
            <label htmlFor='posterInput'>Poster URL</label>
            <input onChange={(e)=> {setPoster(e.target.value)}}id='posterInput' />
            <label htmlFor='descriptionInput'>Description/Synopsis</label>
            <textarea cols={40} rows={4} onChange={(e)=> {setDescription(e.target.value)}}id='descriptionInput'></textarea>
            <select onChange={(e) => {setGenre(e.target.value)}} name='Genre' id='genre'>
                <option value=''>Please select a Genre</option>
                {genres.map((genre, i) => (
                    <option  key={i} value={`${genre.name}`}>{genre.name}</option>
                ))}
            </select>

        </form>
        
     
        </>
    )

}

export default AddMovie;