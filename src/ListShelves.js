import React from 'react'
//import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
//import * as BooksAPI from './BooksAPI'
// import CurrentlyReadingBooks from './CurrentlyReadingBooks'
// import WantToReadBooks from './WantToReadBooks'
// import ReadBooks from './ReadBooks'

// Using Stateless Function as this is only rendering without state
class ListShelves extends React.Component {

  static propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    shelfBooks: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.shelfBooks.map(book => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={(event) => this.props.onUpdateBook(book, event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default ListShelves