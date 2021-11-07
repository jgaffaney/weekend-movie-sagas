import MovieForm from "../MovieForm/MovieForm";


function AddMovie() {

    // a default movie for the MovieForm since we are adding one
    const defaultMovie = {
        title: '',
        poster: '',
        description: '',
        genre_id: 0
    }

    return(
        <>
        <h2>Add a New Movie</h2>
        <MovieForm movie={defaultMovie} new={true} />
        </>
    )
}

export default AddMovie;