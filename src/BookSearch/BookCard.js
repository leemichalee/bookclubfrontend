import React from 'react';
import BookReview from './BookReview'
import {NavLink} from'react-router-dom'

function BookCard({book, onBookClick, user}){

    const {id, description, genre, author, title} = book

    function handleClick(e){
        e.preventDefault()
        onBookClick(book)
        console.log(book)
    }

    return(
        <div className="book-card">
             <div>
                 <h3>{title}</h3>
             </div>
             <div>
                 <h3>{author}</h3>
             </div>
             <div>
                 <h5>{description}</h5>
             </div>
             <div>
                 <h5>{genre}</h5>
             </div>
             {/* <NavLink exact to="/booksearch/:id"> */}
                <button onClick={handleClick}>See Reviews</button>
            {/* </NavLink> */}
        </div>
    )
}
export default BookCard;