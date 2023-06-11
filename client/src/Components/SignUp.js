import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Designs/star.css'
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
            props.showAlert("User already exists","danger")
            window.scrollTo(0, 0);
            setTimeout(() => {
                window.location.reload(false);
            }, 3000);
        }else if(credentials.password!==credentials.cpassword){
            
            props.showAlert("Password doesn't match","danger")
            window.scrollTo(0, 0);
            setTimeout(() => {
                window.location.reload(false);
            }, 3000);
        }else{
            localStorage.setItem('token', json.authtoken);
            navigate('/')
        }
    
    }
    

    const onChange = (e) => {
        e.preventDefault();
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        if (credentials.password.length < 3) {
            document.getElementById('password').style.border = "2px solid yellow"
        } else {
            document.getElementById('password').style.border = "2px solid green"
        }
        if (credentials.cpassword.length < 3) {
            document.getElementById('cpassword').style.border = "2px solid yellow"
        } else {
            document.getElementById('cpassword').style.border = "2px solid green"
        }
        if (credentials.password !== credentials.cpassword && credentials.cpassword.length > 1) {
            
         
            document.getElementById('cpassword').style.cssText ="background:red ;opacity:0.5; text-decoration: line-through; font-weight: bold";
            document.getElementById('password').style.cssText="background:red ;opacity:0.5; text-decoration: line-through; font-weight: bold";
        }
        else {
            document.getElementById('cpassword').style.cssText = "background:green ;opacity:0.5; text-decoration: line-through; font-weight: bold";
            document.getElementById('cpassword').style.cssText = "background:green ;opacity:0.5; text-decoration: line-through; font-weight: bold";
    }}

    return (
        <div className="signupcontainer my-3" style={{ background: "url(https://source.unsplash.com/random/?night)"}} >
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
                        
                        <p>Password should be of more than 5 characters</p>
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
