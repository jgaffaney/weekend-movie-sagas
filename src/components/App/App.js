import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';
import EditDetails from '../BackButton/EditDetails/EditDetails';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
       <Route path="/details/:id" >
       <MovieDetails />
       </Route> 
       <Route path='/addMovie'>
         <AddMovie />
       </Route>
      <Route path='/edit/:id'>
        <EditDetails />
      </Route>
      
      </Router>
    </div>
  );
}


export default App;
