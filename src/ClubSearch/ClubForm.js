import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';

function ClubForm({user, onNewClub, clubs, setClubs}) {

    const userId = user[0].id

    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [description, setDescription] = useState('')
    const [ownerNumber, setOwnerNumber] = useState(userId)
    const history = useHistory()

    const formData = {title, genre, description, owner_id: ownerNumber}

    function handleSubmit(event){
        event.preventDefault()

        fetch("http://localhost:3001/api/v1/clubs", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then((newClub) => {
            setClubs([...clubs,newClub])
            alert('Club created!')
            history.push('/clubsearch')
        })
    }

    return(
        <div>
            <form onSubmit={handleSubmit} autoComplete="off">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Title</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    placeholder="Cool Cats"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Genre</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="genre"
                                    value={genre}
                                    placeholder="Science Fiction"
                                    onChange={(e) => setGenre(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Description</label>
                            </td>
                            <td>
                                <input
                                    type="textarea"
                                    name="description"
                                    valeu={description}
                                    placeholder="This club reads science fiction books every Tuesday!"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="Create Club" />
            </form>
        </div>
    )
}
export default ClubForm;