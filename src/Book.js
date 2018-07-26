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

  // Gets book data from server
  componentDidMount() {
    BooksAPI.get(this.props.id).then(data => {
      this.setState({
        id: data.id,
        shelf: data.shelf,
        title: data.title,
        authors: data.author,
        thumbnail: data.imageLinks.thumbnail
      })
    })
  }

  // Updates state when shelf changed
  handleChange = (event) => {
    this.setState({
      shelf: event.target.value
    });
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
