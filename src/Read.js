import React, { Component } from 'react'
import Book from './Book'

class Read extends Component {

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
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

export default Read
