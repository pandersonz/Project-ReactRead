import React from "react";
import BookInShelf from './BooksInShelf';
import * as BooksAPI from "./BooksAPI";
import { Link } from 'react-router-dom';
import FinderBook from './FinderBook';


class Shelf extends React.Component {
    state = { 
      books: [],
      isSearching: false, 
      shelfs: [
        { id: 'currentlyReading', title: 'Currently Reading'},
        { id: 'wantToRead', title: 'Want To Read' },
        { id: 'read', title: 'Read'}]
    };
    
    componentDidMount() {
      BooksAPI.getAll().then(books =>
        this.setState({ books })
      );
    }
    addBook = nBook => sBook=>{
      var books = sBook.books.push(nBook); 
    }
    changePlaceShelf = (bookChange, place) => sBook=> {
      let changeBooks = sBook.books.map(book => {
        if (bookChange.id === book.id) {
          book.shelf = place;
        }
        return book;
      });
      return { changeBooks };
  }
    theBookAlreadyExist = objectBook => {
      let result = false;
      if (objectBook.shelf === "none") {
        this.setState(this.addBook(objectBook))
        result = true;
      }
      return result;
    };
    handleShelfChange = (objectBook, shelf) => {
      if(!this.theBookAlreadyExist(objectBook) ){
        this.setState(this.changePlaceShelf(objectBook, shelf));
      BooksAPI.update(objectBook, shelf);
      }
    };
    
    render(){
        const books =this.state.books;
        const isSearching = this.state.isSearching;
        return(
            <section>
                {this.state.isSearching===false && (
                
                  <div>
                    <div className="list-books-title">
                      <h1>MyReads</h1>
                    </div>
                    {this.state.shelfs.map(shelf => 
                      <BookInShelf 
                          key={shelf.id}
                          sTitle={shelf.title}
                          books={books.filter(book => book.shelf === shelf.id )}
                          shelfPlace={this.handleShelfChange}
                           />)}
                    <div className="open-search">
                      <Link to="/search" onClick={()=>this.setState({ isSearching: true })}>Add a book</Link>
                    </div>
                  </div>)}
                  {this.state.isSearching===true && ( 
                <FinderBook  
                    booksOnHomePage={books}
                    shelfPlace={this.handleShelfChange}
                    returnMain={()=>this.setState({isSearching: false })}
                    />)
                }
               

            </section>
        )
    }
}

export default Shelf