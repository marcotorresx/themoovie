import React, { createContext } from 'react'
import { auth, db } from './firebase'

export const UserContext = createContext()

export const UserProvider = (props) => {

    const [loadedUser, setLoadedUser] = React.useState(false)
    const [activeUser, setActiveUser] = React.useState(null)
    const [userFavs, setUserFavs] = React.useState([])

    React.useEffect(() => {
        // CHECK THE USER
        try {
            auth.onAuthStateChanged(async user => {
                if (user) {
                    // Get user from Auth
                    setActiveUser(user)

                    // Get user from DB
                    const res = await db.collection("users").doc(user.email).get()
                    setUserFavs(res.data().favs)
                    setLoadedUser(true)
                }
                else {
                    setActiveUser(null)
                    setUserFavs([])
                    setLoadedUser(true)
                }
            })
        }
        catch (error) {
            console.log("CHECK USER ERROR:", error)
        }
    }, [])

    // REGISTER
    async function register(name, email, pass) {
        try {
            // CREATE ACCOUNT ON AUTH
            const response = await auth.createUserWithEmailAndPassword(email, pass)
            const newUser = response.user

            // CREATE ACCOUNT ON FIRESTORE
            await db.collection("users").doc(email).set({
                name,
                email,
                uid: newUser.uid,
                favs: []
            })

            // SET VALUES
            setActiveUser(newUser)
            setUserFavs([])
        }
        catch (error) {
            console.log("REGISTER ERROR:", error)
            return error
        }
    }

    // LOGIN
    async function login(email, pass) {
        try {
            // GET USER FROM AUTH
            const user = await auth.signInWithEmailAndPassword(email, pass)
            setActiveUser(user.user)

            // GET USER FROM DB
            const res = await db.collection("users").doc(user.user.email).get()
            if (res.exists) setUserFavs(res.data().favs)
            else {
                await db.collection("users").doc(user.user.email).set({
                    name: "No Data",
                    email: user.user.email,
                    uid: user.user.uid,
                    favs: []
                })
                setUserFavs([])
            }
        }
        catch (error) {
            console.log("LOGIN ERROR:", error)
            return error
        }
    }

    // ADD MOVIE FROM FAVS
    async function addMovieToFavs(movieID) {
        await db.collection("users").doc(activeUser.email).set({
            favs: [...userFavs, movieID]
        })
        setUserFavs([...userFavs, movieID])
    }

    // REMOVE MOVIE FROM FAVS
    async function removeMovieFromFavs(movieID) {
        const filterMovies = userFavs.filter(id => id !== movieID)
        await db.collection("users").doc(activeUser.email).set({
            favs: filterMovies
        })
        setUserFavs(filterMovies)
    }

    // SIGN OUT
    function signOut() {
        auth.signOut()
    }

    return (
        <UserContext.Provider value={{ activeUser, userFavs, loadedUser, addMovieToFavs, removeMovieFromFavs, signOut, register, login }}>
            {props.children}
        </UserContext.Provider>
    )
}