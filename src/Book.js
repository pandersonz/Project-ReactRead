import React from "react";
import PropTypes from "prop-types";

export const Book = ({ book, changeSelectBook }) => (
  <li key={book.id+book.title}>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 192,
            backgroundImage: `url(${book.imageLinks.thumbnail})`
          }}
        />
        <div className="book-shelf-changer">
          <select
            onChange={event => changeSelectBook(event, book)}
            value={book.shelf}
          >
            <option value="none" disabled>
              Move to...
            </option>
            <option value="none">None</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  </li>
);

Book.propTypes = {
  book: PropTypes.object.isRequired
};
