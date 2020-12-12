import React from 'react'
import MovieList from './MovieList'
import SearchBar from './SearchBar'
import AddMovie from './AddMovie'
import EditMovie from './EditMovie'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends React.Component {
  state = {
    movies: [],
    searchQuery: '',
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies = () => {
    const baseURL = 'http://localhost:3010/movies'
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => this.setState({ movies: data }))
  }

  deleteMovie = (movie) => {
    const baseURL = 'http://localhost:3010/movies'
    fetch(`${baseURL}/${movie.id}`, {
      method: 'delete',
    }).then((response) => {
      if (response.ok) {
        this.setState((prevState) => ({
          movies: prevState.movies.filter((m) => m.id !== movie.id),
        }))
      }
    })
  }

  searchMovie = (event) => {
    this.setState({ searchQuery: event.target.value })
  }

  addMovie = (movie) => {
    const baseURL = 'http://localhost:3010/movies'
    fetch(`${baseURL}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('An error occured')
        }
      })
      .then(() => this.getMovies())
  }

  editMovie = (id, updatedMovie) => {
    const baseURL = 'http://localhost:3010'
    fetch(`${baseURL}/movies/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('An error occured')
        }
      })
      .then(() => this.getMovies())
  }

  render() {
    let filteredMovies = this.state.movies
      .filter((movie) =>
        movie.name.match(new RegExp(this.state.searchQuery, 'gi'))
      )
      .sort((a, b) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0))

    return (
      <Router>
        <div className="container">
          <Switch>
            <Route
              path="/edit/:id"
              render={(props) => (
                <EditMovie
                  {...props}
                  onEditMovie={(id, movie) => {
                    this.editMovie(id, movie)
                  }}
                />
              )}
            />

            <Route
              path="/add"
              render={({ history }) => (
                <AddMovie
                  onAddMovie={(movie) => {
                    this.addMovie(movie)
                    history.push('/')
                  }}
                />
              )}
            />

            <Route
              path="/"
              render={() => (
                <React.Fragment>
                  <div className="row">
                    <div className="col-lg-12">
                      <SearchBar searchMovie={this.searchMovie} />
                    </div>
                  </div>
                  <MovieList
                    movies={filteredMovies}
                    deleteMovieEvent={this.deleteMovie}
                  />
                </React.Fragment>
              )}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
