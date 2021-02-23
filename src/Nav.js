import React from 'react';
import {NavLink} from "react-router-dom";   

function Nav({user, setUser}){
    console.log(user)
    // function clickHandler(){
    //     if (user === {}) {
    //         <NavLink exact to="/"></NavLink>
    //     } else{
    //         setUser({})
    //     }
    // }

    return(
        <>
            {/* <button>My Clubs</button> */}
            <NavLink exact to="/profile">
            <button className="navButton">My Profile</button>
            </NavLink>
            <NavLink exact to="/clubsearch">
                <button className="navButton">Club Search</button>
            </NavLink>
            <NavLink exact to="/booksearch">
                <button className="navButton">Book Search</button>
            </NavLink>
            <NavLink exact to="/">
                <button className="navButton">{user === {} ? "Log In" : "Log In"}</button>
            </NavLink>
        </>
    )
}
export default Nav;