import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { login, register, getMe } from "../services/auth.api"


export function useAuth(){

    const context = useContext(AuthContext)
    const { user, loading, setUser, setLoading } = context

    const handleLogin = async (email, password)=>{

        setLoading(true)
        try {
            const response = await login(email, password)
            setUser(response.user);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }

    }

    const handleRegister = async (username, email, password)=>{

        setLoading(true)
        try {
            const response = await register(username, email, password)
            setUser(response.user)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }

    }

    const handleGetMe = async ()=>{
        try {
            setLoading(true)
            const response = await getMe()
            setUser(getMe)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return {
        user, loading, handleLogin, handleRegister, handleGetMe
    }
}