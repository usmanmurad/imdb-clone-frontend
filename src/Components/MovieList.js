import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "../axios";
import {login} from "../features/userSlice";
import requests from "../requests";
import '../styles/Watchlist.css';
import TopNavbar from "./TopNavbar";
import {useHistory} from "react-router-dom";


function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [movies, setMovies] = useState(null)

    let loggedUser = JSON.parse(localStorage.getItem('user'))
    if(loggedUser !== null){
        dispatch(login(loggedUser))
    }

    async function getMovies(){
        await axios.get(requests.watchlist + loggedUser.id + '/')
        .then((response) => {
            console.log(response.data)
            setMovies(response.data)
        })
        .catch((error) => {
            console.log(error)
        });
    }
    var movieList;
    if(movies == null){
        getMovies();
    }
    else {
        movieList = movies.map((movie) =>
            <li onClick={()=> history.push('/movie', {id: movie.id})}>
                <div className='watchlist_movie'>
                    <div>
                        <img src={requests.baseUrl + movie['poster']} alt="" width="96" height="142" />
                    </div>
                    <div className='desc_container'>
                        <h4 className='watchlist_movie_name'>{movie.name}</h4>
                        <p>{movie.description}</p>
                    </div>
                </div>
                <hr className="solid" />
            </li>
        )
    }


    return(
        <div>
            <TopNavbar />
            <div className='watchlist_container'>
                <h1 className='watchlist_heading'>Your Watchlist</h1>
                <hr className="solid" />
                <ul className='watchlist_list'>{movieList}</ul>
            </div>
        </div>
    )
}

export default MovieList
