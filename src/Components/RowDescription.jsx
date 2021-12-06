import React from 'react'
import './RowDescription.css'
import YouTube from 'react-youtube'
import { UserContext } from '../UserContext'
import movieTrailer from 'movie-trailer'

// YOUTUBE OPTION
const opts = { height: "390", width: "100%", playerVars: { autoplay: 1 } }

const RowDescription = ({ movie, setShowDescription, setMovieData }) => {

    const { activeUser, userFavs, addMovieToFavs, removeMovieFromFavs } = React.useContext(UserContext)
    const [listBtn, setListBtn] = React.useState(false)
    const [showYoutube, setShowYoutube] = React.useState(false)
    const [videoId, setVideoId] = React.useState("")
    const [videoUrl, setVideoUrl] = React.useState(null)
    const movieID = movie.id.toString()

    // GET VIDEO URL
    async function getVideoUrl() {
        const videoUrl = await movieTrailer(movie?.title || movie?.name || movie?.original_title || "")
        setVideoUrl(videoUrl)
    }

    // SHOW YOUTUBE VIDEO
    async function showYoutubeVideo() {
        try {
            // Get the Video ID
            const completeUrl = new URL(videoUrl) // An object with all the parts of the URL
            const searchUrl = completeUrl.search // Only the part of the URL that is for search, the ? &
            const searchParams = new URLSearchParams(searchUrl) // This makes like an object with the search part separating the & key=
            const videoIdResult = searchParams.get("v") // We are saying to get the parameter that is "v=" because that is the video id
            setVideoId(videoIdResult)

            // Show Video
            setShowYoutube(true)
        }
        catch (error) {
            console.log("GET VIEO ERROR:", error)
        }
    }

    // ADD MOVIE TO LIST
    async function addMovieList() {
        await addMovieToFavs(movieID)
        setListBtn(true)
    }

    // REMOVE MOVIE FROM LIST
    async function removeMovieList() {
        await removeMovieFromFavs(movieID)
        setListBtn(false)
    }

    // CLOSE DESCRIPTION
    function closeDescription() {
        setShowDescription(false)
        setMovieData({})
    }


    // CHECK LIST BTN
    React.useEffect(() => {
        setListBtn(userFavs.includes(movieID))
        getVideoUrl()
    }, [movie, activeUser, listBtn, userFavs])

    return (
        <div className={`row-des-container  ${showYoutube && "youtube-container"}`}>
            <div className="row-des">
                {/* CLOSE BTN */}
                <button className="fas fa-times row-des-close-btn" onClick={closeDescription}></button>
                {/* POSTER */}
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : "/blackbg.jpeg"} alt="" className="row-des-poster" />

                {/* INFO */}
                <div className="row-des-info">
                    {/* TITLE */}
                    <p className="row-des-title">{movie?.title || movie?.name || movie?.original_title || "No Title"}</p>

                    {/* DESCRIPTION */}
                    <p className="row-des-description">{movie.overview ? (movie.overview.length > 366 ? (movie.overview.substring(0, 366) + "...") : movie.overview) : "No Description"}</p>

                    {/* YEAR */}
                    <p className="row-des-year">{movie.release_date ? movie.release_date.substring(0, 4) : "No Date"}</p>

                    {/* YOUTUBE TRAILER BTN */}
                    <button
                        className="row-des-traler-btn"
                        disabled={(videoUrl !== null && videoUrl !== undefined) ? false : true}
                        onClick={showYoutubeVideo}
                    >Watch Trailer</button>

                    {/* BTN */}
                    <button
                        disabled={activeUser ? false : true}
                        className={`row-des-list-btn ${listBtn && "remove-btn"}`}
                        onClick={listBtn ? removeMovieList : addMovieList}
                    >{listBtn ? "-MyList" : "+MyList"}</button>

                </div>

            </div>
            {/* YOUTUBE COMPONENT */}
            {showYoutube && <div className="youtube">
                <YouTube videoId={videoId} opts={opts} />
            </div>}
        </div>
    )
}

export default RowDescription
