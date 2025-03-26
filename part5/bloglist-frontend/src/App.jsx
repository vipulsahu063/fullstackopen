import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [visiblity, setVisibility] = useState(false)

  const [errorMessage, setErrorMessage] = useState({ message: null, type: null })




  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      // Sort blogs by likes after fetching
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage({ message: 'Invalid username or password', type: 'error' })
      setTimeout(() => {
        setErrorMessage({ message: null, type: null })
      }, 5000)
    }
  }

  const handleClick = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addFormData = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)

      setBlogs((prevBlogs) => [...prevBlogs, returnedBlog])
      setVisibility(false)
      setErrorMessage({ message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, type: 'success' })
      setTimeout(() => {
        setErrorMessage({ message: null, type: null })
      }, 5000)

    } catch (error) {
      console.log('Error creating blog', error)
    }
  }

  const updateFormData = async (updateBlogObject) => {
    try{
      const updatedBlog = await blogService.update(updateBlogObject)

      setBlogs((prevBlogs) => prevBlogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
    } catch (error) {
      console.log('Error updating like', error)
    }
  }

  const handleDeleteClick = async (event, currentBlog) => {
    event.preventDefault()
    if(window.confirm(`remove blog ${currentBlog.title} by ${currentBlog.author}`)) {
      try {
        await blogService.remove(currentBlog.id)

        setBlogs(blogs.filter(blog => blog.id !== currentBlog.id))
      } catch(error) {
        console.log('Error deleting blog', error)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>log in to application</h1>
        <Notification message={errorMessage.message} type={errorMessage.type} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='username'
              onChange={({ target }) => setUsername(target.value)}
              data-testid="username"
            />
          </div>
          <div>
            password
            <input
              type='text'
              value={password}
              name='password'
              onChange={({ target }) => setPassword(target.value)}
              data-testid="password"
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const blogForm = () => {


    return (
      <Togglable buttonLabel='create blog' visiblity={visiblity} setVisibility={setVisibility}>
        <CreateBlogForm
          createBlog={addFormData}
        />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage.message} type={errorMessage.type} />

      {
        user &&
        <p>
          {`${user.name} logged in `}<button onClick={handleClick}>logout</button>
        </p>
      }

      {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} increaseLike={updateFormData} handleDeleteClick={handleDeleteClick} />
      )}
    </div>
  )
}

export default App

