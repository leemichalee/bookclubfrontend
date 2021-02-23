import React, {useState} from 'react';
import ReviewCard from './ReviewCard'
import {useHistory} from 'react-router-dom';

function BookReview({user, book, reviews, allUsers, setReviews, onDeleteReview}){

    const history = useHistory()
    const filteredReviews = reviews.filter((review) => review.book_id === book.id)

    const reviewComponents = filteredReviews.map((review) => 
        <ReviewCard
        key={review.id}
        review={review}
        allUsers={allUsers}
        user_id={review.user_id}
        book_id={review.book_id}
        currentUser={user}
        onDeleteReview={onDeleteReview}
        />
    )
    const userId = user[0].id
    const [review, setReview] = useState('')
    const formData = {user_id: userId, book_id: book.id, review}


    function handleSubmit(event){
        event.preventDefault()
        fetch("http://localhost:3001/api/v1/reviews", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then((newReview) => {
            setReviews([...reviews,newReview])
            alert('Review Created!')
        })
    }

    return(
        <div>
            <div>
            {book.title}
            </div>
            <div>
            {book.author}
            </div>
            <div>
            {book.publisher}
            </div>
            <div>
            {book.genre}
            </div>
            <br/>
            <br/>
            <h2>Reviews:</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
                <table>
                    <tbody>
                    
                        <tr>
                            <td>
                                <h4>Leave a Review!</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Review</label>
                            </td>
                            <td>
                                <input
                                    type="textarea"
                                    name="review"
                                    value={review}
                                    placeholder="Neat read!"
                                    onChange={(e) => setReview(e.target.value)}
                                />
                            </td>
                        </tr>  
                    </tbody>
                </table>
                <input type="submit" value="Leave Review" />
            </form>
            {reviewComponents}
        </div>
    )
}

export default BookReview;