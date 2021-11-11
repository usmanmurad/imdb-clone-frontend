import React, { useState} from "react";
import {Modal, Button} from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import {AiOutlineStar, AiFillStar } from "react-icons/ai"
import {useSelector} from "react-redux";
import axios from "../axios";
import requests from "../requests";

function MovieRater({id, name, movie, setMovie}) {
    const user = useSelector((state => state.user.user))
    const [rating, setRating] = useState(1);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        let data = {'user': user.id, 'movie': id}
        let token = JSON.parse(localStorage.getItem('token'))
        const config = {headers: { Authorization: `Bearer ${token}` }};

        axios.post(requests.movieRating, data, config)
            .then(response => {
                console.log(response)
                setRating(response.data.rating)
            })
            .catch(errors => {
                console.log(errors)
            })
    }


    function saveRating() {
        let data = {'user':user.id, 'movie': id, 'rating': rating}
        let token = JSON.parse(localStorage.getItem('token'))
        const config = {headers: { Authorization: `Bearer ${token}` }};

        axios.put(requests.movieRating, data, config)
            .then(response => {
                console.log(response.data)
                handleClose()
                let movieData = response.data
                movieData.poster = requests.baseUrl + movieData.poster
                movieData.thumbnail = requests.baseUrl + movieData.thumbnail
                setMovie(movieData);
            })
            .catch(error => {
                console.log(error)
                handleClose()
            })
    }

    return (
        <div className='movie_rater'>
            {user ? <button className='rate_button' onClick={handleShow}>
                <AiOutlineStar /> Rate
            </button> : null}


            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className='modal_title'><AiFillStar /></Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal_body'>
                    <h5>{name}</h5>
                    <StarRatingComponent
                          name="movie_rater"
                          starCount={10}
                          value={rating}
                          onStarClick={(nextValue, prevValue, name)=> {setRating(nextValue)}}
                    />
                </Modal.Body>
                <Modal.Footer className='modal_footer'>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={saveRating}>
                        Rate
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MovieRater