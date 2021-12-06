import React from 'react'
import './App.css';
import Navbar from './Components/Navbar'
import Banner from './Components/Banner'
import Row from './Components/Row'
import Search from './Components/Search'
import Login from './Components/Login'
import MyList from './Components/MyList'
import requests from './requests'
import { UserContext } from './UserContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {

  const { loadedUser } = React.useContext(UserContext)

  return (
    loadedUser ?
      (<Router>
        <div className="App">
          {/* NAVBAR */}
          <Navbar />

          {/* SWITCH */}
          <Switch>

            {/* HOME___________________________________ */}
            <Route path="/" exact>
              {/* BANNER */}
              <Banner />

              {/* ROWS */}
              <Row title="Popular Movies" url={requests.fetchPopular} />
              <Row title="Top Rated" url={requests.fetchTopRated} />
              <Row title="Action Movies" url={requests.fetchActionMovies} />
              <Row title="Comedy Movies" url={requests.fetchComedyMovies} />
              <Row title="Horror Movies" url={requests.fetchHorrorMovies} />
              <Row title="Romance Movies" url={requests.fetchRomanceMovies} />
              <Row title="Documentaries" url={requests.fetchDocumentaries} />
            </Route>

            {/* SEARCH_________________________________ */}
            <Route path="/search">
              <Search />
            </Route>

            {/* MY LIST */}
            <Route path="/mylist">
              <MyList />
            </Route>

            {/* LOGIN__________________________________ */}
            <Route path="/login">
              <Login />
            </Route>

          </Switch>

        </div>
      </Router>)
      :
      <div className="appLoading">
        <img className="loadingLogo" src="/loading.gif" alt="Loading" />
      </div>
  )
}

export default App;