import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import BackButton from '../BackButton/BackButton';

function MovieForm(props) {

    const dispatch = useDispatch();
    // const history = useHistory();

    useEffect(() => {
        dispatch({type: 'FETCH_GENRES'})
    }, [])

    const [movieData, setMovieData] = useState(props.movie)


    const genres = useSelector(store=>store.genres)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('new movieData: ', movieData);
        dispatch({type: 'POST_MOVIE', payload: movieData})
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch({type: 'UPDATE_MOVIE', payload: movieData})
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor='titleInput'>Movie Title</label>
            <input value={movieData.title}onChange={(e)=>{setMovieData({...movieData, title: e.target.value})}}id='titleInput'/>
            <label htmlFor='posterInput'>Poster URL</label>
            <input value={movieData.poster}onChange={(e)=> {setMovieData({...movieData, poster: e.target.value})}}id='posterInput' />
            <label htmlFor='descriptionInput'>Description/Synopsis</label>
            <textarea value={movieData.description}cols={40} rows={4} onChange={(e)=>{setMovieData({...movieData, description: e.target.value})}} id='descriptionInput'></textarea>
            {/* dropdown menu for genres */}
            <select onChange={(e) => {setMovieData({...movieData, genre_id: e.target.value})}} name='Genre' id='genre'>
                <option value=''>Please select a Genre</option>
                {genres.map((genre, i) => (
                    <option  key={i} value={`${genre.id}`}>{genre.name}</option>
                ))}
            </select>
            {props.new ? 
            (<button type="submit">Add Movie</button>
            ) : (
            <button onClick={handleClick}>Edit Movie</button>)}
            <BackButton text={`Cancel`} />
        </form>
    )
}

export default MovieForm;