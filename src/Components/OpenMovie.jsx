import React from 'react'
import { UserContext } from '../UserContext'
import './OpenMovie.css'

const OpenMovie = ({ movie, setShowOpenMovie }) => {

    const { removeMovieFromFavs } = React.useContext(UserContext)

    // CLICK HANDLER
    async function clickHandler() {
        await removeMovieFromFavs(movie?.id.toString())
        setShowOpenMovie(false)
    }

    return (
        <div className="om-movie-container">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" className="om-poster" />
            <div className="om-info">
                <p className="om-title">{movie?.title || movie?.name || movie?.original_title || "No Title"}</p>
                <p className="om-des">{movie.overview ? (movie.overview.length > 366 ? (movie.overview.substring(0, 366) + "...") : movie.overview) : "No Description"}</p>
                <p className="om-year">{movie.release_date ? movie.release_date.substring(0, 4) : "No Date"}</p>
                <button className={`om-list-btn remove-btn`} onClick={clickHandler}>-MyList</button>
            </div>
        </div>
    )
}

export default OpenMovie
