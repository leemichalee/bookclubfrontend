import React from 'react';
import ClubCard from"./ClubCard";
import {NavLink} from 'react-router-dom';

function ClubSearch({clubs, user, onClubClick}) {

    const clubComponents = clubs.map((club) =>
        <ClubCard
        key={club.id}
        club={club} 
        onClubClick={onClubClick}
        />
    )

    return(
        <div>
            <div className="newClub">
            <NavLink exact to="/club/new">
            <button>Create a Club!</button>
            </NavLink>
            </div>
        <div className="clubs">
            {clubComponents}
        </div>
        </div>
    )
}
export default ClubSearch