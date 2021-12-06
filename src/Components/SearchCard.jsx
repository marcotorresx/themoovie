import React from 'react'
import './SearchCard.css'
import { UserContext } from '../UserContext'

const SearchCard = ({ movie, type }) => {

    const { activeUser, userFavs, addMovieToFavs, removeMovieFromFavs } = React.useContext(UserContext)
    const [listBtn, setListBtn] = React.useState(false)

    React.useEffect(() => {
        // CHECK THE LIST
        if (activeUser || type !== "tvs") setListBtn(userFavs.includes(movie?.id.toString()))
    }, [movie, activeUser, listBtn, type, userFavs])

    // ADD MOVIE TO LIST
    async function addMovieList() {
        addMovieToFavs(movie.id.toString())
        setListBtn(true)
    }

    // REMOVE MOVIE FROM LIST
    async function removeMovieList() {
        removeMovieFromFavs(movie.id.toString())
        setListBtn(false)
    }

    return (
        <div className="search-card">
            {/* POSTER */}
            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "/blackbg.jpeg"} alt="Movie" className="search-card-poster" />

            {/* INFO */}
            <div className="search-card-info">
                {/* TITLE */}
                <p className="search-card-title">{movie?.title || movie?.name || movie?.original_title || "No Title"}</p>

                {/* DESCRIPTION */}
                <p className="search-card-description">{movie.overview ? (movie.overview.length > 366 ? (movie.overview.substring(0, 250) + "...") : movie.overview) : "No Description"}</p>

                {/* MY LIST BTN */}
                <button
                    className={`search-list-btn ${listBtn && "remove-btn"}`}
                    disabled={!activeUser || type === "tvs" ? true : false}
                    onClick={listBtn ? removeMovieList : addMovieList}
                >{listBtn ? "-MyList" : "+MyList"}</button>
            </div>
        </div>
    )
}

export default SearchCard
