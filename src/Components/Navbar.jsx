import React, { useContext } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../UserContext'

const Navbar = () => {

    const { activeUser, signOut } = useContext(UserContext)

    const [balckNavbar, setBlackNavbar] = React.useState(false)

    React.useEffect(() => {
        // NAVBAR BACKGROUND
        window.addEventListener("scroll", navbarBackground)

        return () => {
            window.removeEventListener("scroll", navbarBackground)
        }
    }, [])

    // NAVBAR BACKGROUND
    function navbarBackground() {
        if (window.scrollY > 50) {
            setBlackNavbar(true)
        }
        else {
            setBlackNavbar(false)
        }
    }

    return (
        <div className={`navbar ${balckNavbar && "navbar-black"}`}>
            {/* LOGO */}
            <NavLink className="navbar-logo" to="/">The Moovie</NavLink>

            {/* BUTTONS */}
            <div className="navbar-btns">
                <NavLink className="navbar-btn" to="/">Home</NavLink>
                <NavLink className="navbar-btn" to="/search">Search</NavLink>
                {activeUser ?
                    <>
                        <NavLink className="navbar-btn" to="/mylist">My List</NavLink>
                        <button className="navbar-btn close-btn" onClick={signOut}>Close Sesion</button>
                    </> :
                    <NavLink className="navbar-btn" to="/login">Login</NavLink>
                }
            </div>
        </div>
    )
}

export default Navbar
