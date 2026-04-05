import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form>
        <div>
          <label>
            username
            <input 
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              />
          </label>
        </div>
        <div>
          <label>
            password
            <input 
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              />
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  
  return (
    <div>
      {!user && loginForm()}
      { user && blogsList()}
    </div>
  )
}

export default App