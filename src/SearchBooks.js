import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {
  static propTypes = {
    shelfBooks: PropTypes.array.isRequired,
    searchTerms: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    query: '',
    searchedBooks: []
  }

  componentDidMount() {
    BooksAPI.search('A', 20).then((books) => {
      books.map(book => book.shelf = "none")
      books.map(book => (this.props.shelfBooks.filter((shelfBook) => shelfBook.id === book.id).map(shelfBook => book.shelf = shelfBook.shelf)))
      this.setState({
        searchedBooks: books,
      })
    })
  }

  updateSearch = (query) => {
    BooksAPI.search(query, 20).then((books) => {
      if (books.error) {
        books = []
      }
      books.map(book => book.shelf = "none")
      books.map(book => (this.props.shelfBooks.filter((shelfBook) => shelfBook.id === book.id).map(shelfBook => book.shelf = shelfBook.shelf)))
      this.setState ({
        searchedBooks: books
      })
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    if (query === '') {
      query = 'A'
    }
    this.updateSearch(query)
  }

  render() {
    const { onUpdateBook } = this.props
    const { query, searchedBooks } = this.state    

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
              <b> Below search terms are supported currently:</b>
              <br></br>
              {this.props.searchTerms.map(searchTerm => searchTerm + ",  ")}
              <br></br>
              <br></br>
            </span>
          </div>
          <ol className="books-grid">
            {(searchedBooks.length === 0) ?
              <b> No books found! </b> : 
              searchedBooks.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  updateBook={onUpdateBook}
                />
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks