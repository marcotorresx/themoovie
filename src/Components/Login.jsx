import React from 'react'
import axios from 'axios'
import './Login.css'
import requests from '../requests'
import { withRouter } from 'react-router-dom'
import { UserContext } from '../UserContext'

const Login = ({ history }) => {

    // STYLE VARIABLES
    const [movie, setMovie] = React.useState({})
    const [registerType, setRegisterType] = React.useState(false)
    const html_login = document.querySelector(".type-login")
    const html_register = document.querySelector(".type-register")

    // DATA VARIABLES
    const { register, login } = React.useContext(UserContext)
    const [email, setEmail] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [name, setName] = React.useState("")
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        // GET MOVIE FOR BACKGROUND
        async function getMovieData() {
            const data = await axios.get(requests.fetchTrending)
            const all_movies = data.data.results

            // CHECK NOT UNDEFINED
            let whileKey = true;
            while (whileKey) {
                const random_movie = Math.floor(Math.random() * all_movies.length - 1)
                if (random_movie >= 0 && all_movies[random_movie] !== undefined) {
                    setMovie(all_movies[random_movie])
                    whileKey = false
                }
            }
        }
        getMovieData()
    }, [])

    // CHANGE MODE
    function changeType(type) {
        if (type === "login") {
            html_register.classList.remove("type-active")
            html_login.classList.add("type-active")
            setRegisterType(false)
        }
        if (type === "register") {
            html_login.classList.remove("type-active")
            html_register.classList.add("type-active")
            setRegisterType(true)
        }
    }

    // REGISTER USER
    async function registerUser(e) {
        e.preventDefault()

        // VALIDATE DATA
        if (!name.trim()) {
            setError("Name can´t be empty.")
            return
        }
        if (!email.trim()) {
            setError("Email can´t be empty.")
            return
        }
        if (!pass.trim()) {
            setError("Password can´t be empty.")
            return
        }
        if (pass.length < 6) {
            setError("Password minimum length is 6 characters.")
            return
        }
        setError(null)

        // REGISTER
        const error_response = await register(name, email, pass)
        if (error_response) {
            setError(error_response.message)
            return
        }

        // END FUNCTION
        setName("")
        setEmail("")
        setPass("")

        // SEND TO MY LIST
        history.push("/mylist")
    }

    // LOGIN USER
    async function loginUser(e) {
        e.preventDefault()

        // VALIDATE DATA
        if (!email.trim()) {
            setError("Email can´t be empty.")
            return
        }
        if (!pass.trim()) {
            setError("Password can´t be empty.")
            return
        }

        // CLEAN ERROR
        setError(null)

        // LOGIN
        const error_response = await login(email, pass)
        if (error_response) {
            setError(error_response.message)
            return
        }

        // END FUNCTION
        setName("")
        setEmail("")
        setPass("")

        // SEND TO MY LIST
        history.push("/mylist")
    }

    return (
        <div className="login"
            style={movie.backdrop_path ?
                { backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")` } :
                { backgroundImage: "https://coolbackgrounds.io/images/backgrounds/black/pure-black-background-f82588d3.jpg" }
            }
        >
            <div className="login-container">
                {/* SELECT TYPE */}
                <div className="login-types">
                    <div className="login-type type-login type-active" onClick={() => changeType("login")}>Log In</div>
                    <div className="login-type type-register" onClick={() => changeType("register")}>Register</div>
                </div>

                {/* FORM */}
                <form className="login-form" onSubmit={registerType ? registerUser : loginUser}>
                    {error && <span className="login-error">{error}</span>}
                    {registerType &&
                        <input
                            type="text" className="login-email login-input"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />}
                    <input
                        type="text" className="login-email login-input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password" className="login-password login-input"
                        placeholder="Password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <button type="submit" className="login-sumbit">{registerType ? "Register" : "Log In"}</button>
                </form>
            </div>
        </div>
    )
}

export default withRouter(Login)
