import React, { Component } from 'react'
import Book from './Book'

class WantToRead extends Component {

  bookMove = (id, shelf) => {
    const book = this.props.books.filter(book => book.id === id)[0];
    this.props.onMove(book, shelf)
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want To Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key={book.id}>
                <Book onMove={this.bookMove} id={book.id} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default WantToRead
