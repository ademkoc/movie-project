import React from 'react'
import { Link } from 'react-router-dom'

class SearchBar extends React.Component {
  handleFromSubmit = (event) => {
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleFromSubmit}>
        <div className="form-row mt-5 mb-5">
          <div className="col-10">
            <input
              type="text"
              className="form-control"
              placeholder="Search a movie"
              onChange={this.props.searchMovie}
            />
          </div>
          <div className="col-2">
            <Link
              to="/add"
              type="button"
              className="btn btn-md btn-danger"
              style={{ float: 'right' }}
            >
              Add Movie
            </Link>
          </div>
        </div>
      </form>
    )
  }
}

export default SearchBar
