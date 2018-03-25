import React from 'react'
import { Route, Link } from 'react-router-dom'
import ListShelves from './ListShelves'
import SearchBooks from './SearchBooks'
import './App.css'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReading: books.filter(book => book.shelf === "currentlyReading"),
        wantToRead: books.filter(book => book.shelf === "wantToRead"),
        read: books.filter(book => book.shelf === "read")
      })
    })
  }

  updateShelves = (book, bookShelf) => {
    BooksAPI.update(book, bookShelf)
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReading: books.filter(book => book.shelf === "currentlyReading"),
        wantToRead: books.filter(book => book.shelf === "wantToRead"),
        read: books.filter(book => book.shelf === "read")
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ListShelves
                  shelfTitle="Currently Reading"
                  shelfBooks={this.state.currentlyReading}
                  onUpdateBook={this.updateShelves}
                />
                <ListShelves
                  shelfTitle="Want to Read"
                  shelfBooks={this.state.wantToRead}
                  onUpdateBook={this.updateShelves}
                />
                <ListShelves
                  shelfTitle="Read"
                  shelfBooks={this.state.read}
                  onUpdateBook={this.updateShelves}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" className="open-search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks
            searchTerms={['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']}
            onUpdateBook={this.updateShelves}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp