import React, { useState } from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const navigate = useNavigate();
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const {user, loading, handleLogin} = useAuth();

    
    async function submitHandler(e) {
        e.preventDefault();
        await handleLogin(email, password)
        navigate("/")
    }

  return (
    <main className='.login-register-page'>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <input required onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter your email'/>
                <input required onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter your password'/>
                <input disabled={loading} className='btn' value={loading ? "Loading..." : "Login"} type="submit" />
            </form>
            <p>Don't have an account? <Link className='linktag' to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login