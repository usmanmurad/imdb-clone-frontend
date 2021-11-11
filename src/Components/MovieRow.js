import {useState, useEffect} from "react";
import axios from "../axios";
import requests from "../requests";
import '../styles/MovieRow.css'
import {useHistory} from "react-router-dom";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";


function MovieRow({title}) {
    const [movies, setMovies] = useState([])
    const history = useHistory()
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.movies);
            console.log(request.data)
            setMovies(request.data)
            return request;
        }
        fetchData();
    }, []);

    return (
        <div className='row'>
            <h2 className='row_title'>{title}</h2>
            <div className='row_posters'>
                {movies.map(movie =>(
                    <div className='movie_container' onClick={()=> history.push('/movie', {id: movie.id})}>
                        <img
                            key={movie.id}
                            className='row_posterLarge movie_image'
                            src={movie.poster}
                            alt={movie.name}
                        />
                        <div className='row_details'>
                            <div>
                                <span className='movie_rating'><AiFillStar className='yellow_star' />
                                    {movie.average_rating}
                                </span>
                                <button className='rating_star'><AiOutlineStar /></button>
                            </div>
                            <p className='movie_title'>{movie.name}</p>
                            <button className='watchlist_button'><span>+</span> Watchlist</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default MovieRow