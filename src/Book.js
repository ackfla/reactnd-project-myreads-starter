import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {

  state = {
    id: '',
    shelf: '',
    title: '',
    authors: '',
    thumbnail: ''
  }

  componentWillMount() {
    // Get book data from server
    BooksAPI.get(this.props.id).then(data => {
      // Check if have thumbnail & store in variable
      let thumbnail;
      if (data.imageLinks) {
        thumbnail = data.imageLinks.thumbnail;
      }
      // Set state
      this.setState({
        id: data.id,
        shelf: data.shelf,
        title: data.title,
        authors: data.author,
        thumbnail: [thumbnail]
      })
    })
  }

  // Book passes it's data to shelf when moved
  handleChange = (event) => {
    this.props.onMove(this.state.id, event.target.value)
    // Update book state to correct shelf
    this.setState({shelf: event.target.value})
  }

  // Render book
  render() {
    return (
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{backgroundImage: 'url('+this.state.thumbnail+')'}}>
            </div>
            <div className="book-shelf-changer">
              <select value={this.state.shelf} onChange={this.handleChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.state.title}</div>
          <div className="book-authors">{this.state.author}</div>
        </div>
    )
  }
}

export default Book
