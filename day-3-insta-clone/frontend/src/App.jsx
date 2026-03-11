import React from 'react'
import AppRoutes from './app.routes'
import AuthProvider from './features/auth/auth.context'
import './features/shared/style.scss'
import PostProvider from './features/post/post.context'

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <AppRoutes />
      </PostProvider>
    </AuthProvider>
  )
}

export default App 