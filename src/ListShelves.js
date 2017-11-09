import React from 'react'
import Book from './Book'

// Using Stateless Function as this is only rendering without state
function ListShelves (props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.shelfBooks.map(book => (
            <Book
              key={book.id}
              book={book}
              updateBook={props.onUpdateBook}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

export default ListShelves