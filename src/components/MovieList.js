import React from 'react'
import { Link } from 'react-router-dom'

function MovieList(props) {
  const { movies, deleteMovieEvent } = props

  const truncateOverview = (string, maxLength) => {
    if (!string) return null
    if (string.length <= maxLength) return string
    return `${string.substring(0, maxLength)}...`
  }

  return (
    <div className="row">
      {movies.map((movie, i) => (
        <div key={i} className="col-lg-4">
          <div className="card mb-4 shadow-sm">
            <img className="card-img-top" src={movie.imageURL} alt="" />
            <div className="card-body">
              <h5 className="card-title">{movie.name}</h5>
              <p className="card-text">
                {truncateOverview(movie.overview, 100)}
              </p>
              <div className="d-flex justify-content-between align-item-center">
                <Link
                  to={`/edit/${movie.id}`}
                  type="button"
                  className="btn btn-md btn-outline-primary"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn btn-md btn-outline-danger"
                  onClick={() => deleteMovieEvent(movie)}
                >
                  Delete
                </button>
                <h2>
                  <span className="badge badge-info">{movie.rating}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieList
