import React from "react";
import BooksInShelf from './BooksInShelf';
import * as BooksAPI from "./BooksAPI";
import { Link } from 'react-router-dom';
import FinderBook from './FinderBooks';
class Shelf extends React.Component {
    state = { 
      books: [],
      isSearching: false,
      shelfs: [
        { id: 'currentlyReading', title: 'Currently Reading'},
        { id: 'wantToRead', title: 'Want To Read' },
        { id: 'read', title: 'Read'}]
     
    };
    //add a new book to our list of books
    addBook = newBook => state => { books: state.books.push(newBook) }
    //change change the value of the shelf to which the book belongs
    changeShelfOfBook = (ChangeBook, shelf) => stateOfbook => {
      let newBooks = stateOfbook.books.map(book => {
        if (ChangeBook.id === book.id) {
          book.shelf = shelf;
        }
        return book;
      });
      return { books: newBooks };
  }
  //get the array of books from the BackEnd
    componentDidMount() {
      BooksAPI.getAll().then(books =>
        this.setState({ books })
      );
    }
     //check if the book exists in our list on the shelf
    isTheBookNew = objectBook => {
      let result = false;
      if (objectBook.shelf === "none") {
        this.setState(this.addBook(objectBook))
        result = true;
      }
      return result;
    };
    //updates in the BackEnd the shelf to which a book belongs
    sChange = (objectBook, shelf) => {
      !this.isTheBookNew(objectBook) &&
        this.setState(this.changeShelfOfBook(objectBook, shelf));
      BooksAPI.update(objectBook, shelf);
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
                      <BooksInShelf 
                          key={shelf.id}
                          books={books.filter(book => book.shelf === shelf.id )}
                          changeBookShelf={this.sChange}
                          shelfName={shelf.title} />)}
                    <div className="open-search">
                      <Link to="/mybooks" onClick={()=>this.setState({ isSearching: true })}>Add a book</Link>
                    </div>
                  </div>)}
                 {this.state.isSearching===true && ( 
                <FinderBook  
                    showUpdateBook={books}
                    changeBookShelf={this.sChange}
                    onBack={()=>this.setState({ isSearching: false })}
                    />)}
                
               

            </section>
        )
    }
}

export default Shelf