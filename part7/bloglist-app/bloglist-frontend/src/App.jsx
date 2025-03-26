import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // console.log(blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // console.log(user)
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
    try {
      const updatedBlog = await blogService.update(updateBlogObject)

      setBlogs((prevBlogs) => prevBlogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
    } catch (error) {
      console.log('Error updating like', error)
    }
  }

  const handleDeleteClick = async (event, currentBlog) => {
    event.preventDefault()
    if (window.confirm(`remove blog ${currentBlog.title} by ${currentBlog.author}`)) {
      try {
        await blogService.remove(currentBlog.id)

        setBlogs(blogs.filter(blog => blog.id !== currentBlog.id))
      } catch (error) {
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
            />
          </div>
          <div>
            password
            <input
              type='text'
              value={password}
              name='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const blogForm = () => {


    return (
      <Togglable buttonLabel='Create Blog' visiblity={visiblity} setVisibility={setVisibility}>
        <CreateBlogForm
          createBlog={addFormData}
        />
      </Togglable>
    )
  }

  const Users = () => {
    // Create a Map to store usernames and their corresponding blog counts
    const userBlogCounts = new Map()

    // Count blogs for each user
    blogs.forEach(blog => {
      const username = blog.user.username
      userBlogCounts.set(username, (userBlogCounts.get(username) || 0) + 1)
    })

    // Get an array of unique users with their blog counts
    const uniqueUsers = [...userBlogCounts]

    const UserView = () => {
      return (
        <div>
          <h4>added blogs</h4>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} increaseLike={updateFormData} handleDeleteClick={handleDeleteClick} />
          )}
        </div>
      )
    }

    return (
      <div>
        <h2>Users</h2>
        <ul>
          {uniqueUsers.map(([username, blogCount]) => {
            // Get the user ID from the first blog's user object (assuming each user has a unique ID)
            const userId = blogs.find(blog => blog.user.username === username)?.user.id

            return (
              <li key={username}>
                <Link to={`/users/${userId}`} element={<UserView />}>
                  {username} {blogCount}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }


  return (
    <div>
      <div>
        <h2>blogs</h2>

        <Notification message={errorMessage.message} type={errorMessage.type} />

        {
          user &&
          <p>
            {`${user.name} logged in `}<button onClick={handleClick}>logout</button>
          </p>
        }

        {/* {blogForm()} */}


      </div>

      <Routes>
        <Route path='/users' element={<Users />} />
        {/* <Route path='/' element={<App />} /> */}
      </Routes>
    </div>
  )
}

export default App

