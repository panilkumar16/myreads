import React from 'react'

// Using stateless function as we are only rendering in this component
function Book (props) {
  return (
    <li key={props.book.id}>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, 
            backgroundImage: `url(${props.book.imageLinks !== undefined ? props.book.imageLinks.thumbnail: ''})` }}></div>
          <div className="book-shelf-changer">
            <select value={props.book.shelf} 
              onChange={(event) => props.updateBook(props.book, event.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {props.book.title !== undefined ? props.book.title : ''}
        </div>
        <div className="book-authors">
          {props.book.authors !== undefined ?
            props.book.authors.map(author => author + ', ') :
            ''
          }
        </div>
      </div>
    </li>
  )
}

export default Book