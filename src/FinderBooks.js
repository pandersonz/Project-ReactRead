import React, { Component } from "react";
import { Link } from "react-router-dom";
import BooksInShelf from "./BooksInShelf";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";

class FinderBooks extends Component {
  state = {
    query: "",
    err:"",
    flag:false,
    booksSearched: []
  };
  
  //returns the new book aggregates to a shelf
  cShelfBookSearched = (objectBook, shelf) => state => {
    let newBooks = state.booksSearched.map(bookSearched => {
      bookSearched.id === objectBook.id && (bookSearched.shelf = shelf);
      return bookSearched;
    });
    return { booksSearched: newBooks };
  }
  //search and display the books that match the written content of the search bar
  change = ({ target }) => {
    const { query } = this.state;
    const { showUpdateBook } = this.props;
    this.setState({ query: target.value });
    BooksAPI.search(query, 20).then(booksSearched => {
      if(target.value===""){
        this.setState({flag:false, err:""});
      
    }else{
      if (booksSearched) {
        booksSearched.map(bookSearched => {
          bookSearched.shelf = "none";
          showUpdateBook.map(showUpdateBook => {
            if (bookSearched.id === showUpdateBook.id) {
              bookSearched.shelf = showUpdateBook.shelf;
            }
          });
        });
        this.setState({ booksSearched, flag:true, err:"" });
      }
      else{
        this.setState({flag:false, err: "search income not allowed"});

      }
      }
    });
  };
  //returns the information of the book and its shelf to which it belongs
  ShelfBookChange = (objectBook, shelf) => {
    const { booksSearched } = this.state;
    const { changeBookShelf } = this.props;
    changeBookShelf(objectBook, shelf);
    this.setState(this.cShelfBookSearched(objectBook, shelf));
  };
  render() {
    const { query, booksSearched ,flag } = this.state;
    const { onBack } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" onClick={onBack}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.change}
            />
          </div>
        </div>
        {flag===true&&(
        <div className="search-books-results">
          <BooksInShelf
            name="Results"
            books={booksSearched}
            changeBookShelf={this.ShelfBookChange}
            
          />
        </div>
        )}
        {flag===false&&(
          <div className="search-books-results">
          <h3>{this.state.err}</h3>
          
          </div>
        )}
      </div>
    );
  }
}

FinderBooks.propTypes = {
  hPBooks: PropTypes.object,
  changeBookShelf: PropTypes.func
};

export default FinderBooks;
