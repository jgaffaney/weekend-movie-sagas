import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MovieForm from "../../MovieForm/MovieForm";
import { useEffect } from 'react';

function EditDetails() {

    const { id } = useParams();
    console.log('id in editDetails: ', id);
        // // declare hook functions
    const dispatch = useDispatch();
    // const history = useHistory();


    useEffect(() => {
        dispatch({type: 'FETCH_SELECTED_GENRES', payload: id})
    },[])


    // const [newMovieDetails, setNewMovieDetails] = useState({
    //     title: '',
    //     poster: '',
    //     description: '',
    //     genre_id: 0
    // })

    const movie = useSelector(store => store.selectedGenres)

    return ( 
        <>
        <div>Edit Details</div>
       <MovieForm movie={movie} />
        </>
    )
}

export default EditDetails;