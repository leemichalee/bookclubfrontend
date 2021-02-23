import React,{useState} from 'react'
import MeetingCard from './MeetingCard'
import {useHistory} from 'react-router-dom';

function ClubMeeting({currentClub, user, allUsers, meetings, setMeetings, clubs}){
    
    const history = useHistory()
    const filteredMeetings = meetings.filter((meeting) => meeting.club_id === currentClub.id)

    const meetingComponents = filteredMeetings.map((meeting) => 
        <MeetingCard
        key={meeting.id}
        description={meeting.description}
        allUsers={allUsers}
        club_id={meeting.club_id}
        zoom={meeting.zoom}
        clubs={clubs}
        />
    )
    const userId = user[0].id
    const [zoom, setZoom] = useState('')
    const [description, setDescription] = useState('')
    const formData = {user_id: userId, club_id: currentClub.id, zoom, description}


    function handleSubmit(event){
        event.preventDefault()
        fetch("http://localhost:3001/api/v1/meetings", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then((newMeeting) => {
            setMeetings([...meetings,newMeeting])
            alert('Meeting Created!')
        })
    }

    return(
        <div>
            <div>
            <h1>{currentClub.title} Meetings</h1>
            </div>
            <form onSubmit={handleSubmit} autoComplete="off">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <h4>
                                    Create a Meeting!
                                </h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Zoom link</label>
                            </td>
                            <td>
                                <input
                                type="text"
                                name="zoom"
                                value={zoom}
                                placeholder="zoom.com/link"
                                onChange={(e) => setZoom(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label> Description</label>
                            </td>
                            <td>
                                <input
                                    type="textarea"
                                    name="description"
                                    value={description}
                                    placeholder="Going over Chapter 1 :)"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="Create Meeting" />
            </form>
            <h2>Meetings:</h2>
            {meetingComponents}
        </div>
    )
}
export default ClubMeeting;