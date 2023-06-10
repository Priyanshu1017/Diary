import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Diary.css'
export default function SignUp(props) {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if(credentials.email===json.email){
            window.location.reload(false);
            props.showAlert("User already exists","danger")
        }else if(credentials.password!==credentials.cpassword){
            window.location.reload(false);
            props.showAlert("Password doesn't match","danger")
        }else{
            localStorage.setItem('token', json.authtoken);
            navigate('/about')
        }
    
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="formcontainer my-3" style={{ background: "url(https://source.unsplash.com/random/?sunset)"}} >
            < h3>Sign Up to use Diary</h3>
            <form className='Form' onSubmit={handleSubmit}>
                <div className="mb-3  row">
                    <label className="col-sm-3 col-form-label">Name</label>
                    <div className="col-sm-7">
                        <input type="text" className="form-control" value={credentials.name} id="name" name="name" onChange={onChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-7">
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} name="email" id="email" placeholder='ex@gmail.com' />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Password</label>
                    <div className="col-sm-7">
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Confirm Password</label>
                    <div className="col-sm-7">
                        <input type="text" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" />
                    </div>
                </div>


                <button disabled={credentials.name.length < 1 || credentials.email.length < 1 || credentials.password.length < 3} type="submit" className="btn btn-outline-light" >Submit</button>
            </form>
        </div>
    )
}
