import React, { useContext } from 'react'
import noteContext from '../Context/notes/noteContext';
import'./star.css'
export default function Noteitem(props) {
    const context = useContext(noteContext)
    const { note, updateNote } = props;
    const { deleteNote } = context;

    const handleClick = (e) => {
        e.preventDefault();
        deleteNote(note._id);
    }

    return (

        <div className="card mx-3 my-3 row" style={{ width: "18rem", border: "3px solid ", }}>
           
            <div className="card-body">
                <h5 className="card-title" style={{ textAlign: "center", textDecoration: "underline" }}>{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <p className="card-text">{note.tag}</p>
            </div>
                <div className="opr">
                <i className="fa-solid fa-file-pen mx-2" onClick={() => { updateNote(note) }}></i>
                <i className="fa-solid fa-eraser" onClick={handleClick} ></i>
                </div>
            
        </div>

    )
}
