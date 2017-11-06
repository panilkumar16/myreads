import React from 'react'
import { Link } from 'react-router-dom'
import CurrentlyReadingBooks from './CurrentlyReadingBooks'
import WantToReadBooks from './WantToReadBooks'
import ReadBooks from './ReadBooks'

// Using Stateless Function as this is only rendering without state
function ListBooks () {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <CurrentlyReadingBooks/>
          <WantToReadBooks/>
          <ReadBooks/>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" className="open-search">Add a book</Link>
      </div>
    </div>
  )
}

export default ListBooks