import React from 'react'
import OpenMovie from './OpenMovie'
import axios from 'axios'
import './MyList.css'
import { UserContext } from '../UserContext'
import { withRouter } from 'react-router-dom'

const MyList = ({ history }) => {

    const { activeUser, userFavs } = React.useContext(UserContext)
    const [movies, setMovies] = React.useState([])
    const [openMovie, setOpenMovie] = React.useState({})
    const [showOpenMovie, setShowOpenMovie] = React.useState(false)

    // GET MOVIES DATA
    async function getMoviesData() {
        const moviesData = []
        try {
            for (let i = 0; i < userFavs?.length; i++) {
                const movieData = await axios.get(`https://api.themoviedb.org/3/movie/${userFavs[i]}?api_key=85ae9c1956419125729e27b85102545c&language=en-US&page=1`)
                moviesData.push(movieData.data)
            }
            setMovies(moviesData)
        }
        catch (error) {
            console.log("GET MOVIES DATA MY LIST ERROR:", error)
        }
    }

    // OPEN MOVIE
    function openMovieClick(movie) {
        setOpenMovie(movie)
        setShowOpenMovie(true)
    }

    // CLOSE OPEN MOVIE
    function closeOpenMovie() {
        setShowOpenMovie(false)
        setOpenMovie({})
    }

    // ADD CARD HANDLER
    function addCardHandler() {
        history.push("/search")
    }

    // CHECK USER OR REDIRECT
    function checkUser() {
        if (!activeUser) history.push("/")
    }

    // REACT USE EFFECT
    React.useEffect(() => {
        checkUser()
        getMoviesData()

    }, [activeUser, userFavs])

    return (
        activeUser &&
        <div className={`open-movie-handler ${showOpenMovie && "active"}`}>
            <div className="mylist">
                <div className="mylist-title">My List</div>
                <div className="my-list-movies-container">

                    {/* MOVIES */}
                    {
                        movies.map(movie => (
                            <div className="mylist-movie-div" key={movie.id} onClick={() => openMovieClick(movie)}>
                                {/* Poster */}
                                <img
                                    className="mylist-movie-img"
                                    src={(movie.poster_path && movie.poster_path !== undefined) ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : "/blackbg.jpeg"}
                                    alt={movie.title}
                                />
                                {/* Info */}
                                <div className="mylist-movie-info">
                                    <p className="mylist-movie-info-title">{
                                        movie?.title || movie?.name || movie?.original_title || "No Title"
                                    }</p>
                                    <p className="mylist-movie-info-year">{movie.release_date ? movie.release_date.substring(0, 4) : "No date"}</p>
                                </div>
                            </div>
                        ))
                    }

                    {/* ADD CARD */}
                    <div className="mylist-add-card" onClick={addCardHandler}>
                        {/* Icon */}
                        <i className="fas fa-plus-circle mylist-add-icon"></i>
                        {/* Hover Text */}
                        <p className="mylist-add-text">Add Movies</p>
                    </div>
                </div>

                {/* OPEN MOVIE CONTAINER */}
                {showOpenMovie && <div className="mylist-open-movie-container">
                    <div className="fix-button-container">
                        {/* OPEN MOVIE */}
                        <OpenMovie movie={openMovie} setShowOpenMovie={setShowOpenMovie} />

                        {/* CLOSE OPEN MOVIE BTN */}
                        <button className="fas fa-times om-close-btn" onClick={closeOpenMovie}></button>
                    </div>
                </div>}

            </div>
        </div>
    )
}

export default withRouter(MyList)
