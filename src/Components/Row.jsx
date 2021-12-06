import React from 'react'
import axios from 'axios'
import RowDescription from './RowDescription'
import './Row.css'

const Row = (props) => {

    const [movies, setMovies] = React.useState([])
    const [showDescription, setShowDescription] = React.useState(false)
    const [movieData, setMovieData] = React.useState({})
    const [rowLoaded, setRowLoaded] = React.useState(false)

    // GET MOVIES DATA
    async function getMovies() {
        try {
            const request = await axios.get(props.url)
            setMovies(request.data.results)
            setRowLoaded(true)
        }
        catch (error) {
            console.log("ROW ERROR:", error)
        }
    }

    // SHOW DESCRIPTION
    async function showMovieDes(movie) {
        setMovieData(movie)
        setShowDescription(true)
    }

    // USE EFFECT
    React.useEffect(() => {
        getMovies()
    }, [props.url])

    return rowLoaded ? (
        <div className="row">
            {/* TITLE */}
            <h1 className="row-title">{props.title}</h1>

            {/* MOVIES */}
            <div className="row-movies-container">
                {
                    movies.map(movie => (
                        <div className="row-movie-div" key={movie.id} onClick={() => showMovieDes(movie)}>
                            {/* Poster */}
                            <img
                                className="row-movie-img"
                                src={(movie.poster_path && movie.poster_path !== undefined) ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : "/blackbg.jpeg"}
                                alt={props.title}
                            />
                            {/* Info */}
                            <div className="row-movie-info">
                                <p className="row-movie-info-title">{
                                    movie?.title || movie?.name || movie?.original_title || "No Title"
                                }</p>
                                <p className="row-movie-info-year">{movie.release_date ? movie.release_date.substring(0, 4) : "No date"}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* CLOSE BTN */}
            {showDescription &&
                <RowDescription movie={movieData} setShowDescription={setShowDescription} setMovieData={setMovieData}/>
            }

        </div>
    )
        : (
            <div className="rowLoading">
                <img className="loadingLogo" src="/loading.gif" alt="Loading" />
            </div>
        )
}

export default Row
