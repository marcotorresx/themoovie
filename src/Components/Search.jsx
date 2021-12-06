import React from 'react'
import axios from 'axios'
import SearchCard from './SearchCard'
import shortid from 'shortid'
import './Search.css'
import { UserContext } from '../UserContext'

const Search = () => {

    const { activeUser } = React.useContext(UserContext)
    const [query, setQuery] = React.useState("")
    const [movies, setMovies] = React.useState([])
    const [type, setType] = React.useState("movies")


    // GET DATA
    async function getData(e) {

        const moviesData = []
        if (query !== "") {
            if (type === "movies") {
                try {
                    const moviesAll = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=85ae9c1956419125729e27b85102545c&language=en-US&page=1&include_adult=false&query=${query}`)
                    for (let i = 0; i < 10; i++) {
                        moviesData.push(moviesAll.data.results[i])
                    }
                }
                catch (error) {
                    console.log("SEARCH MOVIES ERROR:", error)
                }
            }
            if (type === "tvs") {
                try {
                    const moviesAll = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=85ae9c1956419125729e27b85102545c&language=en-US&page=1&include_adult=false&query=${query}`)
                    for (let i = 0; i < 10; i++) {
                        moviesData.push(moviesAll.data.results[i])
                    }
                }
                catch (error) {
                    console.log("SEARCH SERIES ERROR:", error)
                }
            }

            // CLEAN DATA
            const moviesDataFiltered = moviesData.filter(movie => movie !== undefined)
            setMovies(moviesDataFiltered)
        }
        else {
            setMovies([])
        }
    }

    // REACT USE EFFECT
    React.useEffect(() => {
        // ACTIVE TYPE
        const html_movies_type = document.querySelector(".type-movies")
        const html_tvs_type = document.querySelector(".type-tvs")

        if (type === "movies") {
            html_tvs_type.classList.remove("active")
            html_movies_type.classList.add("active")
        }
        if (type === "tvs") {
            html_movies_type.classList.remove("active")
            html_tvs_type.classList.add("active")
        }

        // GET DATA
        getData()

    }, [type, activeUser])

    return (
        <div className="search">
            {/* SEARCH */}
            <div className="search-container">
                <input
                    className="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <i className="fas fa-search" onClick={getData}></i>
                <div className="search-types">
                    <div className="search-type type-movies" onClick={() => setType("movies")}>Movies</div>
                    <div className="search-type type-tvs" onClick={() => setType("tvs")}>Tv Shows</div>
                </div>
            </div>

            {/* RESULTS */}
            {
                movies.length > 0 &&
                movies.map(movie => (
                    <div key={movie !== undefined ? movie?.id : shortid.generate()}>
                        <SearchCard movie={movie} type={type} />
                    </div>
                ))
            }
        </div>
    )
}

export default Search
