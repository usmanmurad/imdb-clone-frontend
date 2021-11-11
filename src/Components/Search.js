import React from 'react';
import { useState } from 'react';
import {NavDropdown, Spinner} from 'react-bootstrap';
import { DebounceInput } from 'react-debounce-input';
import '../styles/search.css';
import axios from "../axios";
import requests from "../requests";
import {GrSearch} from "react-icons/all";
import {AiFillStar} from "react-icons/ai";
import {useHistory} from "react-router-dom";

export default function Search() {
    const history = useHistory()

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isNothingFound, setIsNothingFound] = useState(false);
    const [isSearching, setIsSearching] = useState(false);


    const handleSearch = async (e, genre, rating) => {

        e && setQuery(e.target.value);


        if ((e && e.target.value) || (!e && query)) {

            setIsSearching(true);
            let response = await axios.get(requests.search + query)
            setIsSearching(false);

            if (response && response.invalid_query) {
                setIsNothingFound(true);
                setSuggestions([]);
            }
            else if(response){
                console.log(response)
                setIsNothingFound(false);
                setSuggestions(response.data);
            }

        }
        else {
            setSuggestions([]);
            setIsNothingFound(false);
        }
    }


    return (
            <div className='search'>
                <div className='search_div'>
                    <NavDropdown variant='light' title='All ' className='all_dropdown'>
                        <NavDropdown.Item>Action</NavDropdown.Item>
                        <NavDropdown.Item>Comedy</NavDropdown.Item>
                    </NavDropdown>
                    <DebounceInput
                        className='search_input'
                        onChange={handleSearch}
                        placeholder='Search IMDb'
                        debounceTimeout={300}
                    />
                    <button className='search_icon'>
                     <GrSearch  />
                    </button>
                </div>

                <div className='suggestions'>
                    {query && suggestions.length ?
                        <div>
                            {isSearching && <div className='text-center py-3'><Spinner animation="grow" /></div>}
                            {
                                suggestions.map((movie) => (
                                    <div className='suggestions_movie'
                                         onClick={()=> {
                                             history.push('/movie', {id: movie.id})
                                             setQuery('')
                                         }}>
                                        <img
                                            className='search_movie_image'
                                            src={requests.baseUrl + movie.poster}
                                        />
                                        <div>
                                            <p className='search_movie_name'>{movie.name}</p>
                                            <span><AiFillStar className='yellow_star' />   {movie.average_rating}</span>
                                            <br />
                                            <span>{movie.cast.join(' , ')}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        :
                        query && isNothingFound ?
                            <div>
                                <div>No movie found!</div>
                            </div>
                            :
                            query &&
                                <div >
                                    <div><Spinner animation="grow" /></div>
                                </div>
                    }
                </div>
            </div>
    )
}
