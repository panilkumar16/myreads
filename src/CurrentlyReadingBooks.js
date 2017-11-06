import React from 'react'
//import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class CurrentlyReadingBooks extends React.Component {
  // static PropTypes = {
  //   currentlyReadingBooks: PropTypes.array.isRequired
  // }

  state = {
    currentlyReadingBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReadingBooks: books.filter(book => book.shelf === "currentlyReading")
      })
    })
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.state.currentlyReadingBooks.map(book => (
              <Book key={book.id} book={book}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default CurrentlyReadingBooks