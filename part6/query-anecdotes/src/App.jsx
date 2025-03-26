import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'

const App = () => {

  const queryClient = useQueryClient()

  const [notification, dispatchNotification] = useContext(NotificationContext)

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    }
  })

  const { isError, isPending, error, data: anecdotes} = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})

    dispatchNotification({ type: 'MESSAGE', payload: `anecdote '${anecdote.content}' voted`})
    setTimeout(() => {
      dispatchNotification({ type: 'CLEAR'})
    }, 5000)
  }

  if(isPending) {
    return <span>Loadding...</span>
  }

  if(isError) {
    // dispatchNotification({ type: 'MESSAGE', payload: error.message})
    // setTimeout(() => {
    //   dispatchNotification({ type: 'CLEAR'})
    // }, 5000)
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification message={notification} />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button 
              type='VOTE' 
              label={`anecdote '${anecdote.content}' voted`} 
              onClick={() => handleVote(anecdote)}>
                vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
