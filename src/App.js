import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

// Using Stateless Function as this is only rendering without state
function BooksApp () {
  return (
    <div className="app">
      <Route exact path="/" render={() => (
        <ListBooks/>
      )}/>
      <Route path="/search" render={() => (
        <SearchBooks/>
      )}/>
    </div>
  )
}

export default BooksApp