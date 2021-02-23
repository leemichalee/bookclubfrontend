import React, {useState, useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import Header from "./Header";
import Nav from "./Nav";
import Login from "./Login/Login";
import ClubSearch from "./ClubSearch/ClubSearch";
import BookSearch from "./BookSearch/BookSearch";
import MyClubs from "./MyClubs/MyClubs";
import Profile from "./Profile/Profile";
import ClubForm from "./ClubSearch/ClubForm";
import BookReview from "./BookSearch/BookReview";
import ClubMeeting from "./ClubSearch/ClubMeeting";



function App() {

  const [user, setUser] = useState({})
  const [books, setBooks] = useState([])
  const [clubs, setClubs] = useState([])
  const [currentClub, setCurrentClub] = useState({})
  const [currentBook, setCurrentBook] = useState({})
  const [reviews, setReviews] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [meetings, setMeetings] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/books')
    .then(r => r.json())
    .then((bookArray) => {
      setBooks(bookArray)
    })
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/clubs')
    .then(r => r.json())
    .then((clubArray) => {
      setClubs(clubArray)
    })
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/reviews')
    .then(r => r.json())
    .then((reviewArray) => {
      setReviews(reviewArray)
    })
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/users')
    .then(r => r.json())
    .then((usersArray) => {
      setAllUsers(usersArray)
    })
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/meetings')
    .then(r => r.json())
    .then((meetingArray) => {
      setMeetings(meetingArray)
    })
  }, [])

  function handleSubmit(email){
    fetch('http://localhost:3001/api/v1/users')
    .then(r => r.json())
    .then((usersArray) => {
        const userObject = usersArray.filter((user) => (user.email) === (email))
        setUser(userObject)
        history.push('/profile')
    })
  }

  function handleNewClub(clubObj){
    const membershipObj = {user_id: user[0].id, club_id: clubObj.id}
    fetch("http://localhost:3001/api/v1/memberships", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(membershipObj)
        })
        history.push('/profile')
  }

  function handleBookClick(bookObj){
    setCurrentBook(bookObj)
    history.push(`/books/${bookObj.id}`)
  }

  function handleClubClick(clubObj){
    setCurrentClub(clubObj)
    history.push(`/clubsearch/${clubObj.id}`)
  }

  function handleDeleteReview(){
    setReviews([])
    fetch('http://localhost:3001/api/v1/reviews')
    .then(r => r.json())
    .then((reviewArray) => {
      setReviews(reviewArray)
    })
  }

  const history = useHistory()

  return (
    <div className="app">
      <div className="header">
        <Header />
      </div>
      <div className="nav">
        <Nav user={user}/>
      </div>
      <div className="body">
        <Switch>
          <Route exact path="/">
            <Login setUser={setUser} onLoginSubmit={handleSubmit}/>
          </Route>
          <Route exact path="/clubs">
            <MyClubs />
          </Route>
          <Route exact path="/profile">
            <Profile user={user} setUser={setUser} reviews={reviews} books={books} onDeleteReview={handleDeleteReview}/>
          </Route>
          <Route exact path="/clubsearch">
            <ClubSearch clubs={clubs} user={user} onClubClick={handleClubClick}/>
          </Route>
          <Route exact path="/booksearch">
            <BookSearch books={books} user={user} onBookClick={handleBookClick}/>
          </Route>
          <Route exact path="/club/new">
            <ClubForm user={user} onNewClub={handleNewClub} clubs={clubs} setClubs={setClubs}/>
          </Route>   
          <Route exact path="/clubsearch/:id">
            <ClubMeeting user={user} allUsers={allUsers} currentClub={currentClub} meetings={meetings} setMeetings={setMeetings} clubs={clubs}/>
          </Route>
          <Route exact to="/booksearch/:id">
            <BookReview user={user} book={currentBook} reviews={reviews} allUsers={allUsers} setReviews={setReviews} onDeleteReview={handleDeleteReview}/>
          </Route>    
        </Switch>
      </div>
    </div>
  );
}

export default App;
