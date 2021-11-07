import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MovieForm from "../../MovieForm/MovieForm";
import { useEffect } from 'react';

function EditDetails() {

    const { id } = useParams();
    console.log('id in editDetails: ', id);
        
    // // declare hook functions
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({type: 'FETCH_SELECTED_GENRES', payload: id})
    },[])

    // grab DB result for one movie from store
    const movie = useSelector(store => store.selectedGenres)

    return ( 
        <>
        <div>Edit Details</div>
       <MovieForm movie={movie} />
        </>
    )
}

export default EditDetails;