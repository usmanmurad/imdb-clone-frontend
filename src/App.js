import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from './Components/Login'
import Register from "./Components/Register";
import Home from "./Components/Home";
import Movie from "./Components/Movie";
import MovieList from "./Components/MovieList";


function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path='/movie'>
            <Movie />
          </Route>
          <Route path='/watchlist'>
            <MovieList />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/'>
            <Home />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
