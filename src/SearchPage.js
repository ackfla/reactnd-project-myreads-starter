import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SearchPage extends Component {

  state = {
    query: ''
  }

  updateQuery = (event) => {
    this.setState({
        query: event.target.value
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
