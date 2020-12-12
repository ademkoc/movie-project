import React from 'react'

class EditMovie extends React.Component {
  state = {
    name: '',
    rating: '',
    overview: '',
    imageURL: '',
  }

  componentDidMount() {
    const baseURL = 'http://localhost:3010'
    fetch(`${baseURL}/movies/${this.props.match.params.id}`, {
      method: 'get',
    })
      .then((response) => {
        if (!response.ok) {
          throw Error('An error occurred')
        }
        return response.json()
      })
      .then((movie) =>
        this.setState({
          name: movie.name,
          rating: movie.rating,
          overview: movie.overview,
          imageURL: movie.imageURL,
        })
      )
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const id = this.props.match.params.id
    const { name, rating, overview, imageURL } = this.state
    const updatedMovie = { name, rating, overview, imageURL }
    this.props.onEditMovie(id, updatedMovie)
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="container">
        <form className="mt-5" onSubmit={this.handleSubmit}>
          <input
            className="form-control"
            id="disabledInput"
            type="text"
            placeholder="Edit The Form To Update A Movie.."
            disabled
          />
          <div className="form-row">
            <div className="form-group col-md-10">
              <label htmlFor="inputName">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.onInputChange}
                value={this.state.name}
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputRating">Rating</label>
              <input
                type="text"
                className="form-control"
                name="rating"
                onChange={this.onInputChange}
                value={this.state.rating}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="inputImage">Image URL</label>
              <input
                type="text"
                className="form-control"
                name="imageURL"
                onChange={this.onInputChange}
                value={this.state.imageURL}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="overviewTextarea">Overview</label>
              <textarea
                className="form-control"
                name="overview"
                rows="5"
                onChange={this.onInputChange}
                value={this.state.overview}
              ></textarea>
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-danger btn-block"
            value="Edit Movie"
          />
        </form>
      </div>
    )
  }
}

export default EditMovie
