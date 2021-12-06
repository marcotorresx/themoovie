import React from 'react'
import axios from 'axios'
import requests from '../requests'
import './Banner.css'

const Banner = () => {

    const [bannerLoaded, setBannerLoaded] = React.useState(false)
    const [movie, setMovie] = React.useState({})

    // GET MOVIE DATA
    async function getMovieData() {
        try {
            const data = await axios.get(requests.fetchTrending)
            const all_movies = data.data.results

            // CHECK NOT UNDEFINED
            let whileKey = true;
            while (whileKey) {
                const random_movie = Math.floor(Math.random() * all_movies.length - 1)
                if (random_movie >= 0 && all_movies[random_movie] !== undefined) {
                    // Set Movie Data
                    setMovie(all_movies[random_movie])
                    setBannerLoaded(true)
                    whileKey = false
                }
            }
        }
        catch (error) {
            console.log("BANNER ERROR:", error)
        }
    }

    React.useEffect(() => {
        getMovieData()
    }, [])

    return bannerLoaded ?

        // BANNER
        (<div
            className="banner"
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`
            }}
        >
            {/* TITLE */}
            <h1 className="banner-title">{movie?.title || movie?.name || movie?.original_title || "No Title"}</h1>

            {/* DESCRIPTION */}
            <p className="banner-decription">{movie.overview && movie.overview}</p>

            {/* SHADOW */}
            <div className="banner-shadow"></div>
        </div>)
        : // LOADING
        (
            <div className="bannerLoading">
                <img className="loadingLogo" src="/loading.gif" alt="Loading" />
            </div>
        )
}

export default Banner
