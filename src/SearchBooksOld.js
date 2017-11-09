import React from 'react'
//import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {
  static propTypes = {
    showBooks: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {
    const { showBooks, onUpdateBook } = this.props

    let searchedBooks
    BooksAPI.search(query, 20).then((books) => {
      this.setState({
        searchedBooks: books
      })
    })

    if (searchedBooks) {
      searchedBooks.sort(sortBy('title'))
      return (
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBooks.map(book => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={(event) => onUpdateBook(book, event.target.value)}>
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
      )
    } else {
      return (
        <div className="search-books-results">
          <ol className="books-grid">
          </ol>
        </div>
      )
    }
  }
}

export default SearchBooks