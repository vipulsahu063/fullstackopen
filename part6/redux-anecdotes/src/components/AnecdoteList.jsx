import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'
import { initializeAnecdote } from '../reducers/anecdoteReducer' // Assuming you're using this action

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.notes)  // Get all anecdotes from Redux state
  const anecdotesFilter = useSelector(state => state.filter)  // Get the filter value from Redux state

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdote());  // Dispatch action to fetch all anecdotes on component mount
  }, [dispatch])

  // If the filter is empty, show all anecdotes sorted by votes
  // If the filter has text, show matching anecdotes and sort them by votes
  const filteredAnecdotes = anecdotesFilter === ''  
    ? [...anecdotes].sort((a, b) => b.votes - a.votes)  // Create a copy and sort anecdotes by votes when input is empty
    : [...anecdotes]  // Create a copy to avoid mutation
        .filter(anecdote => anecdote.content.toLowerCase().includes(anecdotesFilter.toLowerCase()))  // Filter by input text
        .sort((a, b) => b.votes - a.votes);  // Sort filtered anecdotes by votes

  const vote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(addVote(id))  // Dispatch action to add a vote
    dispatch(setNotification({ message: `You voted for: ${anecdote.content}`, duration: 5}))  // Show notification
  }

  return (
    <div>
      {/* Display anecdotes only if there are any (either filtered or all) */}
      {filteredAnecdotes.length === 0 ? (
        <p>No anecdotes match your filter</p>  // Display message when no matches
      ) : (
        filteredAnecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes} votes
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default AnecdoteList
