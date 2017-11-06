import React from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class ReadBooks extends React.Component {
  state = {
    readBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        readBooks: books.filter(book => book.shelf === "read")
      })
    })
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.state.readBooks.map(book => (
              <Book key={book.id} book={book}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default ReadBooks