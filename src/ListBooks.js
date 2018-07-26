import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'

class ListBooks extends Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  // Gets books from server after component loaded
  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({
        // filter returned array by shelf
        currentlyReading: data.filter(item => item.shelf === 'currentlyReading'),
        wantToRead: data.filter(item => item.shelf === 'wantToRead'),
        read: data.filter(item => item.shelf === 'read')
      })
    })
  }

  updateBooks = (book, shelf) => {

    let update = () => {
      // Update book on server
      BooksAPI.update(book, shelf).then(() => {
        // If moved to new shelf...
        if (shelf !== 'none') {
          // ...update book's current shelf
          book.shelf = shelf;
          // Add book to target shelf
          this.setState(prevState => ({
            [shelf]: prevState[shelf].concat(book)
          }))
        }
      })
    };

    // Remove book from current shelf
    this.setState(prevState => ({
      [book.shelf]: prevState[book.shelf].filter(item => item.title !== book.title)
    }), update() );

  }


  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <CurrentlyReading onMove={this.updateBooks} books={ this.state.currentlyReading }/>
          <WantToRead onMove={this.updateBooks} books={ this.state.wantToRead }/>
          <Read onMove={this.updateBooks} books={ this.state.read }/>
        </div>
        <Link className="open-search" to='/search'>Add a book</Link>
      </div>
    )
  }

}

export default ListBooks
