import React, { Component } from "react";
import { Book } from "./Book";
import PropTypes from "prop-types";

class BooksInShelf extends React.Component {
  sChange = (event, book) => {
    const { shelfPlace, onShelfChangeInSearch } = this.props;
    const shelf = event.target.value;
    shelfPlace(book, shelf);
  };
  render() {
    const { sTitle, books } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{sTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book
              key={book.index}
                book={book}
                sBookChange={this.sChange}
                
              />
            ))}
            
          </ol>
        </div>
      </div>
    );
  }
}

BooksInShelf.propTypes = {
  book: PropTypes.array,
  selectChange: PropTypes.func
};

export default BooksInShelf;
