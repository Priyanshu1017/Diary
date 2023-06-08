import React, { useContext, useState } from 'react'
import noteContext from '../Context/notes/noteContext';
import './star.css'

export default function AddNote(props) {
  const context = useContext(noteContext)
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" })

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const handleClick = (e) => {

    e.preventDefault();
    addNote(note.title, note.description, note.tag)
    setNote({ title: "", description: " ", tag: " " })

    props.showAlert("Added Successfully", "success")
  }

  return (

    <div className='formcontainer my-3' style={{ background: "url(https://source.unsplash.com/random/?nature`)", backgroundPositionX: 'center' }}>
      
        <h3>Add a Note</h3>
        <form className='Form'>

          <div className="mb-3">
            <label className="form-label"   >Title</label>
            <input type="text" className="form-control" name='title' id='title' onChange={onChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input type="text" className="form-control" name='description' id='description' onChange={onChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Tag</label>
            <input type="text" className="form-control" name='tag' id='tag' onChange={onChange} />
          </div>
          <button disabled={note.title.length < 1 || note.description.length < 1} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
      </div>
   
  )
}
