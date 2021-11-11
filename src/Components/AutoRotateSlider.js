import React from "react";

function AutoRotateSlider({movies, index}) {

    return (
        <div className='side_scroll_list'>
            <h3 className='next_label'>Up Next</h3>
            {movies[(index+1) % movies.length]}
            {movies[(index+2) % movies.length]}
            {movies[(index+3) % movies.length]}
            <h3 className='trailers_label'>Browse Trailers ></h3>
        </div>
    )
}

export default AutoRotateSlider