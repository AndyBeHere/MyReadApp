import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import BookShelf from './BookShelf'



const ListBook =(props) => {

  // render() {
    const {books,shelves,onChange} = props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
              {shelves.map(shelf => (<BookShelf books={books.filter((book,index) => (book.shelf === shelf.key))} key={shelf.key} title={shelf.name} onChangeShelf={onChange}/>))}

          </div>
        </div>
        <div className="open-search">
          <Link to='/search'><button>Add a book</button></Link>
        </div>
      </div>
    )
  // }
}

export default ListBook;
