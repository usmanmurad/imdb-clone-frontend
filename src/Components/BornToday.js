import {useState, useEffect} from "react";
import axios from "../axios";
import requests from "../requests";

import '../styles/BornToday.css';


function BornToday() {

    const [celebrities, setCelebrities] = useState([])
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.celebrities);
            console.log(request.data)
            setCelebrities(request.data)
            return request;
        }
        fetchData();
    }, []);


    return (
        <div className='celebrity_row'>
            <h2 className='celebrity_row_title'>| Born Today ></h2>
            <div className='celebrity_row_item'>
                {celebrities.map(celebrity =>(
                    <div className='celebrity_container'>
                        <img
                            key={celebrity.id}
                            className='celebrity_image'
                            src={celebrity.image}
                            alt={celebrity.name}
                        />
                        <div className='row_details'>
                            <p className='celebrity_name'>{celebrity.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default BornToday