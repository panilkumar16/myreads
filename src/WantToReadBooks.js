import React from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class WantToReadBooks extends React.Component {

  state = {
    wantToReadBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        wantToReadBooks: books.filter(book => book.shelf === "wantToRead")
      })
    })
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want to Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.state.wantToReadBooks.map (book => (
              <Book key={book.id} book={book}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default WantToReadBooks