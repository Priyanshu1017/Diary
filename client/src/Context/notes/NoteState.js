import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
    // const host = "http://localhost:5000"
    const [notes, setNotes] = useState([])

    // Get all Notes

    const getNotes = async () => {
        try {
            // API Call 
            const response = await fetch(`/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json()
            setNotes(json)            
        } catch (error) {
            console.log(error, "error")
        }
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API Call 
        const response = await fetch(`/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();

        setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // API Call
        try {
            await fetch(`/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });
            // let json = await response.json()
            const newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(newNotes)
        } catch (error) {
            console.log(error)
        }
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        await fetch(`/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, getNotes , addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;