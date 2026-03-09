import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function submitHandler(e) {
        e.preventDefault();

        axios.post("http://localhost:3000/api/auth/register",{
            username,
            email,
            password
        }, {withCredentials: true}).then((res)=>{
            console.log(res.data)
        })
    }

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder='Enter your username'/>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter your email'/>
                <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter your password'/>
                <input className='btn' value="Register" type="submit" />
            </form>
            <p>Already have an account? <Link className='linktag' to="/login">Login</Link></p>
        </div>
    </main>
  )
}

export default Register