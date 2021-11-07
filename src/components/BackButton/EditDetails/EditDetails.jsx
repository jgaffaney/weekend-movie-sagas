import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from 'react';

function EditDetails({movie}) {

    const { id } = useParams();

    // declare hook functions
    const dispatch = useDispatch();
    const history = useHistory();

    const [newMovieDetails, setNewMovieDetails] = useState({
        title: '',
        poster: '',
        description: '',
        genre_id: 0
    })

    const movie = useSelector(store => store.selectedGenres)

    return ( 
        <>
        <div>Edit Details</div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='titleInput'>Movie Title</label>
            <input onChange={(e)=>{setNewMovieData({...movieData, title: e.target.value})}}id='titleInput'/>
            <label htmlFor='posterInput'>Poster URL</label>
            <input onChange={(e)=> {setNewMovieData({...movieData, poster: e.target.value})}}id='posterInput' />
            <label htmlFor='descriptionInput'>Description/Synopsis</label>
            <textarea cols={40} rows={4} onChange={(e)=>{setNewMovieData({...movieData, description: e.target.value})}} id='descriptionInput'></textarea>
            {/* dropdown menu for genres */}
            <select onChange={(e) => {setNewMovieData({...movieData, genre_id: e.target.value})}} name='Genre' id='genre'>
                <option value=''>Please select a Genre</option>
                {genres.map((genre, i) => (
                    <option  key={i} value={`${genre.id}`}>{genre.name}</option>
                ))}
            </select>
            <button type="submit">Add Movie</button>
            <BackButton text={`Cancel`} />
        </form>
        </>
    )
}

export default EditDetails;