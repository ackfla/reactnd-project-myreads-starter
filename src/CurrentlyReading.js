import React, { Component } from 'react'

class CurrentlyReading extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {this.props.books.map((book, i) => (
              <li key={book.title+i}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{backgroundImage: 'url('+book.url+')'}}>
                    </div>
                    <div className="book-shelf-changer">
                      <select>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.author}</div>
                </div>
              </li>
            ))}

          </ol>
        </div>
      </div>
    )
  }
}

export default CurrentlyReading
