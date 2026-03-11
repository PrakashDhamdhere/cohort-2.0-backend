import { useContext } from "react";
import { PostContext } from "../post.context";
import { getfeed } from "../services/post.api";


export const usePost = ()=>{
    const context = useContext(PostContext)
    const {feed, loading, setFeed, setLoading} = context

    const handleFeed = async ()=>{
        try {
            setLoading(true)
            const response = await getfeed()
            setFeed(response.posts)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return {
        feed, loading, handleFeed
    }

}