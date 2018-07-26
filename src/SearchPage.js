import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchPage extends Component {

  state = {
    query: '',
    books: []
  }

  updateQuery = (event) => {
    this.setState({
        query: event.target.value
    })
    this.searchQuery(event.target.value);
  }

  componentWillMount() {
    // Initiate timeout
    this.timeout = null;
  }

  searchQuery = (q) => {
      const t = this;
      // Timeouts used to prevent multiple search requests in quick succession
      // Clear any existing timeout
      clearTimeout(this.timeout);
      // Make a new timeout set to go off in 800ms
      this.timeout = setTimeout(function () {
        // remove whitespaces from string
        q = q.replace(/\s+/g, '');
        // Check if query has content
        if(q.length > 0) {
          // Pass query into API search function
          BooksAPI.search(q).then((r) => {
            // Check response is an array + has content & update state accordingly
            Array.isArray(r) && r.length > 0 ? t.setState({books: r}) : t.setState({books: []})
          })
        } else {
          t.setState( {books: []} );
        }
      }, 500);
  }

  handleMove = (book, shelf) => {
    // Get book from id
    BooksAPI.get(book).then(r => {
      // update book var to store book object
      book = r;
      // Update book on server
      BooksAPI.update(book, shelf);
    })
  }

  render() {

    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
            <div className="search-books-input-wrapper">

              <input
                  type='text'
                  placeholder='Search by title or author'
                  value={this.state.query}
                  onChange={this.updateQuery}
              />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
            {this.state.books.length > 0 &&
              this.state.books.map((book) => (
                <li key={book.id}>
                  <Book onMove={this.handleMove} id={book.id} />
                </li>
              ))
            }

            </ol>
          </div>
        </div>
    )
  }
}

export default SearchPage
