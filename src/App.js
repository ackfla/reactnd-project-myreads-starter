import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path='/' component={ ListBooks }/>
        <Route exact path='/search' component={ SearchPage }/>
      </div>
    )
  }
}

export default BooksApp
