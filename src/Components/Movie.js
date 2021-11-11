import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import TopNavbar from "./TopNavbar";
import {useDispatch} from "react-redux";
import {login} from "../features/userSlice";
import {Badge, Toast} from "react-bootstrap";
import '../styles/Movie.css';
import axios from "../axios";
import requests from "../requests";
import MovieRater from "./MovieRater";
import {AiFillStar} from "react-icons/ai";
import Footer from "./Footer";

function Movie() {
    const [movie, setMovie] = useState(null);
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const location = useLocation()
    const id = location.state.id
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.movies + id + '/');
            console.log(request.data)
            setMovie(request.data)
            return request;
        }
        fetchData();
    }, [id]);

    const dispatch = useDispatch()
    let loggedUser = JSON.parse(localStorage.getItem('user'))
    if(loggedUser !== null){
        dispatch(login(loggedUser))
    }

    function addToWatchlist(event) {
        axios.post(requests.watchlist, {'movie_id': movie.id, 'user_id': loggedUser.id})
            .then(response => {
                console.log(response.data)
                setMessage(response.data.message)
                setShow(true)
            })
            .catch(error => console.log(error))

        //console.log(request.data)
        // if(loggedUser.watchlist.includes(movie.id)){
        //     const index = loggedUser.watchlist.indexOf(movie.id);
        //     if (index > -1) {
        //       loggedUser.watchlist.splice(index, 1);
        //     }
        // }
        // else {
        //     loggedUser.watchlist.push(movie.id)
        // }
        // localStorage.setItem('user', JSON.stringify(loggedUser))
        //return request;
    }


    return (
        <>
        <TopNavbar />
            <div className='movie'>
                <div className='movie_content'>
                    <div className='title_div'>
                        <h1 className='movie_title_main'>
                            {movie && movie.name}
                        </h1>
                        <div className='imdb_rating'>
                            <span className='rating_label'>IMDb rating</span>
                            <div className='movie_rating_main'>
                                <AiFillStar className='yellow_rating_star' />
                                <span className='rating_main'>    {movie && movie.average_rating}</span>
                                <span>/10</span>
                                <br/>
                                <span className='rating_label'>     {movie && movie.number_of_reviews}</span>
                            </div>

                        </div>
                        <div className='imdb_rating'>
                            <span className='rating_label'>Your rating</span>
                            <MovieRater id={movie && movie.id}
                                        name={movie && movie.name}
                                        setMovie={setMovie}
                            />
                        </div>
                    </div>
                    <div className='topic_div'>

                    </div>
                    <div className='img_div'>
                        <img
                            className='movie_image_main'
                            src={movie && movie.poster}
                            alt={movie && movie.name}
                        />
                        <iframe
                            className='trailer_iframe' src={movie && movie.trailer_id}>{movie && movie.name}</iframe>
                    </div>
                    <div className='genre_div'>
                        <div className='genre_container'>
                            {movie && movie.genre.map(gen => <Badge className='genre'>{gen}</Badge>)}
                        </div>
                        {show ?
                            <Toast className='toast_message'
                                   onClose={() => setShow(false)} show={show} delay={3000} autohide>
                              <Toast.Body>{message}</Toast.Body>
                            </Toast>:
                        <button className='add_watchlist' onClick={addToWatchlist}>
                            Watchlist
                        </button>}
                    </div>
                    <p className='movie_desc'>{movie && movie.description}</p>
                    <div className='name_div'>
                        <hr className="solid" />
                        <label className='name_label'>Director</label>
                        <span className='name'>{movie && movie.director}</span>
                    </div>
                    <div className='name_div'>
                        <hr className="solid" />
                        <label className='name_label'>Stars</label>
                        {movie && movie.cast.map(star => <span className='name'>{star}</span>)}
                    </div>
                </div>
                <Footer />
            </div>

        </>
    )
}

export default Movie