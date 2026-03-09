import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function submitHandler(e) {
        e.preventDefault();

        axios.post("http://localhost:3000/api/auth/login", {
            email,
            password
        },{withCredentials: true}).then((res)=>{
            console.log(res.data);
        })
    }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter your email'/>
                <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter your password'/>
                <input className='btn' value="Login" type="submit" />
            </form>
            <p>Don't have an account? <Link className='linktag' to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login