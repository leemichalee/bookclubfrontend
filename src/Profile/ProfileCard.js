import { render } from '@testing-library/react';
import React, {useState} from'react';
function ProfileCard({allUsers, review, user_id, book_id, currentUser, onDeleteReview, books}) {

    const [editedReview, setEditedReview] = useState('')
    const updatedReview = {review: editedReview}

    function clickHandler(e){
        e.preventDefault()
        console.log(review.id)
        if(user_id === currentUser[0].id){
            fetch(`http://localhost:3001/api/v1/reviews/${review.id}`, {
                method:"DELETE"
            })
            .then(r => r.json())
            .then((review) => {
                onDeleteReview(review)
                console.log(review)
            })
        } else{
            alert('That is not your review!')
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        fetch(`http://localhost:3001/api/v1/reviews/${review.id}`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedReview)
        })
        .then(r => r.json())
        .then((latestReview) => {
            onDeleteReview(latestReview)
        })
    }

    const bookTitle = (books[review.book_id - 1].title)

    return(
        <div>
            <h5>{bookTitle}</h5>
            {review.review}
            <button onClick={clickHandler} className="deleteButton">Delete</button>
            <br/>
            <br/>
            { user_id === currentUser[0].id ?
                <form onSubmit={handleSubmit} autoComplete="off">
                    <input
                        type="textarea"
                        name="review"
                        value={editedReview}
                        placeholder="Neat read!"
                        onChange={(e) => setEditedReview(e.target.value)}
                    />
                    <input type="submit" value="Edit Review" />
                </form>
                :
                ''
            }<br/><br/>
        </div>
    )
}
export default ProfileCard