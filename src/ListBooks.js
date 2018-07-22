import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'

class ListBooks extends Component {

  state = {
    currentlyReading: [''],
    wantToRead: [''],
    read: ['']
  }

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({
        currentlyReading: data.filter((book) => book.shelf === 'currentlyReading'),
        wantToRead: data.filter((book) => book.shelf === 'wantToRead'),
        read: data.filter((book) => book.shelf === 'read')
      })
    })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <CurrentlyReading books={ this.state.currentlyReading }/>
          <WantToRead books={ this.state.wantToRead }/>
          <Read books={ this.state.read }/>
        </div>
        <Link className="open-search" to='/search'>Add a book</Link>
      </div>
    )
  }

}

export default ListBooks
