import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBooks extends React.Component {
  static propTypes = {
    searchTerms: PropTypes.array.isRequired,
    searchedBooks: PropTypes.array,
    onUpdateSearchQuery: PropTypes.func.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    console.log("Search Query = " + query)
    if (this.props.searchTerms.findIndex(searchTerm => query.toLowerCase() === searchTerm.toLowerCase()) !== -1) {
      this.setState({ query: query })
      this.props.onUpdateSearchQuery(query)
    }
  }

  render() {
    const { searchedBooks, onUpdateBook } = this.props
    const { query } = this.state    

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          {/*<a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>*/}
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <div>
            <span className="bookshelf-title">
              <b> Below search words are supported currently, so please use below search words:</b>
              <br></br>
              {this.props.searchTerms.map(searchTerm => searchTerm + ",  ")}
              <br></br>
              <br></br>
            </span>
          </div>
          <ol className="books-grid">
            {searchedBooks.map((book) => (
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
      </div>
    )
  }
}

export default SearchBooks