import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, increaseLike, handleDeleteClick }) => {

  const [visiblity, setVisibility] = useState(true)
  const [addLike, setAddLike] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleVisiblityClick = () => {
    setVisibility(!visiblity)
  }

  const handleLikeClick = (event)  => {
    event.preventDefault()

    const updatedLike = addLike + 1
    setAddLike(updatedLike)

    increaseLike({
      ...blog,
      likes: updatedLike
    })
  }

  const displayStyle = { display: visiblity ? 'none': '' }

  return (
    <div style={blogStyle}>

      <div>
        <div className='blog-head'>
          {blog.title}
          {blog.author}
          <button onClick={handleVisiblityClick}>
            {visiblity ? 'view': 'hide'}
          </button>
        </div>

        <div style={displayStyle} className='blog-bottom'>
          <div>{blog.url}</div>
          <div>
            {blog.likes}
            <button onClick={handleLikeClick}>like</button>
          </div>
          <div>{blog.user.username}</div>
          <div><button onClick={(event) => handleDeleteClick(event, blog)}>remove</button></div>
        </div>

      </div>

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  increaseLike: PropTypes.func.isRequired
}


export default Blog