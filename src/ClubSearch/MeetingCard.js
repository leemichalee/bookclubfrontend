import React from 'react';

function MeetingCard({allUsers, description, club_id, zoom, clubs}){
    const club = clubs.filter((singleClub) => singleClub.id === club_id)

    return(
        <div>
            <h5>{zoom}</h5>
            {description}
            <br/>
            <br/>
        </div>
    )
}
export default MeetingCard;