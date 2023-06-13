import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Designs/star.css'
export default function SignUp(props) {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (credentials.email === json.email) {
            props.showAlert("User already exists", "danger")
            window.scrollTo(0, 0);
            setTimeout(() => {
                window.location.reload(false);
            }, 3000);
        } else if (credentials.password !== credentials.cpassword) {

            props.showAlert("Password doesn't match", "danger")
            document.getElementById('cpassword').style.cssText = "border: 4px solid red";
            document.getElementById('password').style.cssText = "border: 4px solid red";
            window.scrollTo(0, 0);
            setTimeout(() => {
                window.location.reload(false);
            }, 3000);
        } else {
            document.getElementById('cpassword').style.cssText = "border: 4px solid green";
            document.getElementById('password').style.cssText = "border: 4px solid green";
            localStorage.setItem('token', json.authtoken);
            navigate('/')
        }

    }


    const onChange = (e) => {
        e.preventDefault();
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="signupcontainer my-3" style={{ background: "url(https://source.unsplash.com/random/?night)" }} >
            < h3>Sign Up to use Diary</h3>
            <form className='Form' onSubmit={handleSubmit}>
                <div className="mb-3  row">
                    <label htmlFor='name' className="col-sm-3 col-form-label">Name</label>
                    <div className="col-sm-7">
                        <input type="text" className="form-control" value={credentials.name} id="name" name="name" onChange={onChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-7">
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} name="email" id="email" placeholder='ex@gmail.com' />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                    <div className="col-sm-7">
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />

                        <p>Password should be of more than 5 characters</p>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="cpassword" className="col-sm-3 col-form-label">Confirm Password</label>
                    <div className="col-sm-7">
                        <input type="text" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" />
                    </div>
                </div>


                <button disabled={credentials.name.length < 1 || credentials.email.length < 1 || credentials.password.length < 3} type="submit" className="btn btn-outline-light" >Submit</button>
            </form>
        </div>
    )
}
