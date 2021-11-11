import React from "react";
import {useDispatch ,  useSelector} from "react-redux";

import TopCarousel from "./TopCarousel";
import MovieRow from "./MovieRow";
import TopNavbar from "./TopNavbar";
import {login} from "../features/userSlice";
import BornToday from "./BornToday";
import Footer from "./Footer";


function Home() {

    const dispatch = useDispatch()
    let loggedUser = JSON.parse(localStorage.getItem('user'))
    if(loggedUser !== null){
        dispatch(login(loggedUser))

    }


    return (
        <div className='home'>
            <TopNavbar />
            <TopCarousel />
            <MovieRow title='Featured Today' />
            <MovieRow title='Top Picks' />
            <MovieRow title='Favorites' />
            <BornToday />
            <Footer />
        </div>
    )
}

export default Home
