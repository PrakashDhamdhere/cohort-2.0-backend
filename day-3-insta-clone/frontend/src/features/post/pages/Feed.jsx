import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'

const Feed = () => {

    const {feed, loading, handleFeed} = usePost()

    useEffect(()=>{
        handleFeed();
    },[])

    if(loading || !feed){
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        )
    }
    
    console.log(feed);

  return (
    <main className='feed-page'>
        <div className="feed">
            {
                feed.map((elem, idx)=><Post user={elem.userId} post={elem} />)
            }
        </div>
    </main>
  )
}

export default Feed