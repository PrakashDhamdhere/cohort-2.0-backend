import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import '../style/form.scss'

const Register = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {user, loading, handleRegister} = useAuth()

    async function submitHandler(e) {
        e.preventDefault();
        await handleRegister(username, email, password)
        navigate("/")
    }

  return (
    <main className='.login-register-page'>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder='Enter your username'/>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter your email'/>
                <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter your password'/>
                <input disabled={loading} className='btn'  value={loading ? "Loading..." : "Login"} type="submit" />
            </form>
            <p>Already have an account? <Link className='linktag' to="/login">Login</Link></p>
        </div>
    </main>
  )
}

export default Register