import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
     const user = await loginService.login({ username, password })
     window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
     setUser(user)
     blogService.setToken(user.token)
     setUsername('')
     setPassword('')
    } catch(exception) {
      setMessage({
        text: exception.response.data.error || 'An error occured',
        type: 'error'
      })
      setTimeout(() => setMessage(null), 2000)
      
    }
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }
    
    try{
      const savedBlog = await blogService.create(newBlog)
      setBlogs([...blogs, savedBlog])

      setAuthor('')
      setTitle('')
      setUrl('')

      setMessage({
        text: `Added ${savedBlog.title}`,
        type: 'success'
      })

      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (exception) {
        setMessage({
          text: exception.response.data.error || 'An error occured',
          type: 'error'
        })
        setTimeout(() => setMessage(null), 3000)
    }
  }

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label >
          title:
          <input 
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        </div>
        <div>
          <label>
          author:
          <input 
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          />
          </label>
        </div>
        <div>
          <label >
          url:
          <input 
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          />
        </label>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )

  return (
    <div>
      <Notification message={message}/>
      {!user && loginForm()}
      { user && 
        (
          <div>
            <h2>blogs</h2>
            <p><b>{user.username}</b> logged in <button onClick={handleLogout}>logout</button></p>
            {blogForm()}
            {blogsList()}
          </div>
        )
      }
    </div>
  )
}

export default App