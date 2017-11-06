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

  updateShelfs = (book, bookShelf) => {
    console.log(bookShelf)
    //let oldShelf = book.shelf
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
                  onUpdateBook={this.updateShelfs}
                />
                <ListShelves
                  shelfTitle="Want to Read"
                  shelfBooks={this.state.wantToRead}
                  onUpdateBook={this.updateShelfs}
                />
                <ListShelves
                  shelfTitle="Read"
                  shelfBooks={this.state.read}
                  onUpdateBook={this.updateShelfs}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" className="open-search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks/>
        )}/>
      </div>
    )
  }
}

export default BooksApp