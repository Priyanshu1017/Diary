import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../Designs/star.css'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {

  const navigate = useNavigate()
  const handleLogout = () => {

    localStorage.removeItem('token')
    navigate('/login')
  }
  let location = useLocation();



  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><img src={process.env.PUBLIC_URL + '/image/5leaf.png'} alt='diarl logo' style={{
          width: '5vw',
          height: '5vh',
          borderRadius: '9vh 9vw'
        }}></img></Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item"  >
              <Link className={`nav-link ${location.pathname === "/about" ? 'active' : ""}`} to="/about" >Notes</Link>
            </li>


          </ul>
          <div className="zororun">
         
              
              <img src={process.env.PUBLIC_URL + '/image/zoro-run.gif'} alt="zoro run"  style={{
                width: '3vw',
                borderRadius: '9vh 9vw'
              }} />
           
          </div>
          <div className="Foorm">
            {!localStorage.getItem('token') ?
              <form action="" >
                <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
              </form> : <button className='btn btn-outline-primary' onClick={handleLogout}>Logout</button>}
          </div>
        </div>
      </div>
    </nav>
  )
}
