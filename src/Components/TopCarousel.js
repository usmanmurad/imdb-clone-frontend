import {Carousel} from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "../axios";
import requests from "../requests";
import AutoRotateSlider from "./AutoRotateSlider";
import {BiPlayCircle} from 'react-icons/bi';
import '../styles/TopCarousel.css'
import {useHistory} from "react-router-dom";

function TopCarousel() {

    const [index, setIndex] = useState(0)
    const [movies, setMovies] = useState([])
    const history = useHistory()

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.movies);
            setMovies(request.data)
            return request;
        }
        fetchData();
    }, []);

    const movieList = movies.map(movie => (
        <div className='side_scroll_item' key={movie.id}>
            <img
                className='side_scroll_image'
                src={movie.poster}
                alt={movie.name}
            />
            <div>
                <h5 className='side_scroll_movie_title'><BiPlayCircle />  {movie.name}</h5>
                <p className='side_scroll_movie_description'>{movie.description}</p>
            </div>
        </div>
        )
    )

    return (
        <div className='topCarousel'>
            <Carousel className='carouselItem' activeIndex={index} onSelect={handleSelect}>
                {movies.map(movie =>(
                    <Carousel.Item className='carousel_item' interval={3000} key={movie.id}
                                   onClick={()=> history.push('/movie', {id: movie.id})}>
                        <img
                          className="carousel_image"
                          src={movie['thumbnail']}
                          alt={movie.name}
                        />
                        <Carousel.Caption className='carousel_caption'>
                          <div><BiPlayCircle className='play_circle' /></div>
                          <div>
                              <h3>{movie.name}</h3>
                              <p>{movie.description}</p>
                          </div>
                        </Carousel.Caption>
                      </Carousel.Item>
                ))}
            </Carousel>
            <AutoRotateSlider movies={movieList} index={index} />

        </div>
    )
}

export default TopCarousel