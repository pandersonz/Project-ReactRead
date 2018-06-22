import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookInShelf from "./BooksInShelf";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";
class FinderBooks extends Component {
  state = {
    query: "",
    flag:false,
    booksInSearchResult: []
  };
  
  changePlaceSearchedBook = (bookOnChange, shelf) => sFinder=> {
    let newBooks = sFinder.booksInSearchResult.map(bookInSearchResult => {
      if (bookInSearchResult.id === bookOnChange.id) {
        bookInSearchResult.shelf = shelf;
      }
      
      return bookInSearchResult;
    });
    console.log("ver"+newBooks);
    return { booksInSearchResult: newBooks };
  }
  handleChange = ({ target }) => {
    const { query,booksInSearchResult,flag } = this.state;
    const { booksOnHomePage } = this.props;
    this.setState({ query: target.value });
    if(target.value==="")
    {
      this.setState({ booksInSearchResult: [], flag:false });
    }else{
      BooksAPI.search(query, 20).then((books) => {
        this.setState({booksInSearchResult: books, flag:true }) 
      });
      BooksAPI.search(query, 20).then((books) => {
      if (books) {
        books.map(bookInSearchResult => {
          bookInSearchResult.shelf = "none";
          booksOnHomePage.map(bookOnHomePage => {
            if (bookInSearchResult.id === bookOnHomePage.id) {
              bookInSearchResult.shelf = bookOnHomePage.shelf;
              
            }
          });
        });
        this.setState({ booksInSearchResult:books,flag:true });
        
      }
    });
  }
  };
  
  ShelfChange = (bookOnChange, shelf) => {
    const { booksInSearchResult } = this.state;
    const { shelfPlace } = this.props;
    shelfPlace(bookOnChange, shelf);
console.log("entra al shelfchange")
    let p=this.changePlaceSearchedBook(bookOnChange, shelf);
    this.setState(p);
  };
  
  render() {
    
    const { query, booksInSearchResult, flag } = this.state;
    const { returnMain } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" onClick={returnMain}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleChange}
            />
          </div>
        </div>
        {flag===true&&(
        <div className="search-books-results">
          <BookInShelf
            name="Results"
            books={booksInSearchResult}
            shelfPlace={this.ShelfChange}
          />
          
        </div>)}
      {flag===false&&(
        <div className="search-books-results">
        
        
        </div>
      )}
      </div>
    );
  }
}

FinderBooks.propTypes = {
  homePageBooks: PropTypes.object,
  onShelfChange: PropTypes.func
  
};

export default FinderBooks;
