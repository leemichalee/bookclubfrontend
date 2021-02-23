import React from 'react';
import ProfileCard from './ProfileCard'

function Profile({user, reviews, allUsers, books, onDeleteReview}) {

    let username = user[0].username
    const upperUsername = (username.charAt(0).toUpperCase()+username.slice(1))

    const filteredReviews = reviews.filter((review) => review.user_id === user[0].id)

    const reviewComponents = filteredReviews.map((review) => 
        <ProfileCard
        key={review.id}
        review={review}
        allUsers={allUsers}
        user_id={review.user_id}
        book_id={review.book_id}
        books={books}
        currentUser={user}
        onDeleteReview={onDeleteReview}
        />
    )
    return(
        <div>
            <h1>{upperUsername}</h1>
            <h2>My Reviews</h2><br/>
            {reviewComponents}
        </div>
    )
}
export default Profile;