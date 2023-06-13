import React, { useContext, useEffect, useRef } from 'react'
import Noteitem from './Noteitem';
import noteContext from '../Context/notes/noteContext';
import { useNavigate } from 'react-router-dom';
import '../Designs/star.css'
export default function About(props) {

  const navigate = useNavigate()
  const context = useContext(noteContext)
  const { notes, getNotes, editNote } = context;

  const [note, setNote] = React.useState({ id: "", etitle: "", edescription: "", etag: "" })
  useEffect(() => {
    if (localStorage.getItem('token')) {

      getNotes()
    }
    else {
      navigate('/login')
    }

  })
  const ref = useRef(null)
  const refclsoe = useRef(null)
  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    props.showAlert("Updated Successfully", "success")
  }
  const handleClick = (e) => {
    e.preventDefault();
    // console.log(note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refclsoe.current.click()
    setNote({ title: "", description: "", tag: "" })
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return(<>

     <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">

    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div>
            <div className="container my-3">
              <h1>Add a Note</h1>
              <form >

                <div className="mb-3">
                  <label className="form-label"   >Title</label>
                  <input type="text" className="form-control" name='etitle' id='etitle' value={note.etitle} placeholder="Example input placeholder" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input type="text" className="form-control" name='edescription' id='edescription' value={note.edescription} placeholder="Another input placeholder" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tag</label>
                  <input type="text" className="form-control" name='etag' id='etag' value={note.etag} placeholder="Another input placeholder" onChange={onChange} />
                </div>

              </form>
            </div>
          </div>
          <div className="modal-body">
          </div>
          <div className="modal-footer">
            <button ref={refclsoe} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <div className="Formm row my-3" style={{ background: "url(https://source.unsplash.com/random/?space)", backgroundPositionX: 'center' }} >
      <h3 style={{animation:"none",display:"flex",justifyContent:"center"}}>Your Note</h3>
      

      {notes.length === 0 && 'No Notes to display'}
      {notes.map((note) => {
        return <Noteitem key={note._id} updateNote={updateNote} note={note} />
      })}
      
    </div>
  </>
  )
}
