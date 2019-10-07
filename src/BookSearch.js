import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import {debounce} from 'throttle-debounce';
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {
  state = {
    Books: [],
    query: ''
  }

  // const {myBooks} = this.props;

  handleChange = (event) => {
    var value = event.target.value
    this.setState(() => ({query: value}));
    this.search_books(value)
  }


  search_books = debounce(1000, false,  (val) => {
    if (val.length !== 0) {
      BooksAPI.search(val, 10).then((books) => {
        if (books.length > 0) {
          books = books.filter((book) => (book.imageLinks))
          books = books.map(book => {
            for (let b of this.props.myBooks){
              if (b.id === book.id) {
                book.shelf = b.shelf;
                return book;
              }
              else {
                book.shelf = 'none';
                return book;
              }
            }
          })

          this.setState(() => {
            return {Books: books}
          })
        }
      })
    } else {
      this.setState({Books: [], query: ''})
    }
  })

  add_book = (book, shelf) => {
    this.props.onChange(book, shelf)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.query.length > 0 && this.state.Books.map((book, index) => (<Book book={book} key={index} onUpdate={(shelf) => {
              this.add_book(book, shelf)
            }}/>))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch;
