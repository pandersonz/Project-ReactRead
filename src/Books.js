import React from "react";
import PropTypes from "prop-types";

class Book extends React.Component {
    state={
        book:[]
    }
    render(){
        const { changeSelectBook, book } = this.props;
        let img="";
       let verifidIM =()=> {if(book.hasOwnProperty('imageLinks')){img= book.imageLinks.thumbnail}else{img= ""}};              
        return(
            <li key={book.id+book.title}>
            <div className="book">
              <div className="book-top">
              {console.log(verifidIM())}
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 192,
                    
                    backgroundImage: `url(${img})`
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

        
    }
}
export default Book;