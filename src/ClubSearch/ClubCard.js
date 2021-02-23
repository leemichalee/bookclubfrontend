import React from 'react';
import {NavLink} from "react-router-dom";

function ClubCard({club, onClubClick}){

    const {id, description, genre, owner_id, title} = club

    function handleClick(e){
        e.preventDefault()
        onClubClick(club)
    }

    return(
        <div className="club-card">
             <div>
                 <h3>{title}</h3>
             </div>
             <div>
                 <p>{description}</p>
             </div>
             <div>
                 <h5>{genre}</h5>
             </div>
             <button onClick={handleClick}>See Meetings</button>
        </div>
    )
}
export default ClubCard;