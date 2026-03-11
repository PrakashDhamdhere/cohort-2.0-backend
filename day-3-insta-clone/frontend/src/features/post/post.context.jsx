import { createContext, useState } from 'react'

export const PostContext = createContext()

const PostProvider = ({children}) => {

  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(null)
  const [feed, setFeed] = useState(null)


  return (
    <PostContext.Provider value={{feed, loading, setFeed, setLoading}}>
        {children}
    </PostContext.Provider>
  )
}

export default PostProvider