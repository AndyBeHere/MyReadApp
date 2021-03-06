import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBook from './ListBook'
import BookSearch from './BookSearch'
import './App.css'

const shelves = [
  {key:'currentlyReading', name:'Currently Reading'},
  {key: 'wantToRead', name:'Want to Read'},
  {key:'read', name:'Read'}
];
class BooksApp extends Component {
  state = {
    books: [],
    error: false
  }

  componentDidMount() {
    this.fetch_books()
  }

  fetch_books = () => {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({books: books})
    })
        .catch(err => {
          console.log(err);
          this.setState({
            error: true
          })
        })
  }

  update_books = (book, shelf) => {
    BooksAPI.update(book, shelf).catch(err=>{
      console.log(err);
      this.setState({
        error:true
      })
    })

        .then(() => {
      this.fetch_books()
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (<ListBook books={this.state.books} shelves={shelves} key='homePage' onChange={this.update_books}/>)}/>
        <Route exact path="/search" render={({history}) => (<BookSearch onChange={this.update_books} key='searchPage' myBooks={this.state.books}/>)}/>
      </div>
    )
  }
}

export default BooksApp
