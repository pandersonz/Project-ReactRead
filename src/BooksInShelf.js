import React, { Component } from "react";
import { Book } from "./Book";
import PropTypes from "prop-types";

class BookInShelf extends React.Component {
  //returns the information of the book and its shelf to which it belongs
  selectChange = (event, book) => {
    const { changeBookShelf, onShelfChangeInSearch } = this.props;
    const shelf = event.target.value;
    changeBookShelf(book, shelf);
  };
  render() {
    const { shelfName, books } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, index) => (
              <Book
                book={book}
                changeSelectBook={this.selectChange}
                key={index}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

BookInShelf.propTypes = {
  book: PropTypes.array,
  changeBookShelf: PropTypes.func
};

export default BookInShelf;
