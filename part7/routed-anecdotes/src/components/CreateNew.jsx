import { useNavigate } from 'react-router-dom'

import { useField } from '../hooks'

const filterResetProp = ({ reset, ...rest }) => rest

const CreateNew = (props) => {

  const newContent = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')
  
  const handleReset = () => {
    newContent.reset()
    newAuthor.reset()
    newUrl.reset()
  }

  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: newContent.value,
      author: newAuthor.value,
      info: newUrl.value,
      votes: 0
    })

    handleReset()
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...filterResetProp(newContent)} />
        </div>
        <div>
          author
          <input {...filterResetProp(newAuthor)} />
        </div>
        <div>
          url for more info
          <input {...filterResetProp(newUrl)} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew