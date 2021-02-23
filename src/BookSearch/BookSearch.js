import React from 'react';
import BookCard from"./BookCard";


function BookSearch({books, user, onBookClick, reviews}) {

    const bookComponents = books.map((book) =>
        <BookCard
        key={book.id}
        book={book} 
        onBookClick={onBookClick}
        />
    )

    return(
        <div className="clubs">
            {bookComponents}
        </div>
    )
}
export default BookSearch