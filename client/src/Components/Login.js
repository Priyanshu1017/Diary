import React, { useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom'
import '../Designs/Diary.css'
export default function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/about');
            props.showAlert("Successfully logged in", 'success');
        }
        else {

            props.showAlert("Invalid credentials", "danger")

        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
   
    function togglePasswordVisibility(e) {
        e.preventDefault();
        let passwordInput = document.getElementById('password');
        let eyeIcon = document.getElementById('eye-icon');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
            eyeIcon.classList.add('eye-opened');
        } else {
            passwordInput.type = 'password';
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
            eyeIcon.classList.remove('eye-opened');
        }
    
    }

    return (
        <div className='formcontainer' style={{ background: "url(https://source.unsplash.com/random/?dawn)", backgroundPositionX: 'center' }} >
            < h3 >Login to use Diary</h3>
            <form className='Form' onSubmit={handleSubmit}>
                <div className="mb-3  row">
                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Email</label>
                    <div className=".input">
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder='ex@gmail.com' />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-4 col-form-label">Password</label>
                    <div className=".input">
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                        <span id="eye-icon" className="fas fa-eye-slash" onClick={togglePasswordVisibility}></span>
                    </div>
                </div>

                <button disabled={credentials.email.length < 1 || credentials.password.length < 1} type="submit" className="btn btn-outline-primary" >Submit</button>
                <span>
                    Don't have an account ? <Link to="/SignUp">Create One.</Link>
                </span>
            </form>
        </div>

    )
}
