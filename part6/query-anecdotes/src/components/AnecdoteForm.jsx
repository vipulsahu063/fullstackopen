import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationContext from '../NotificationContext'
import { useContext } from 'react'


const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const [notification, dispatchNotification] = useContext(NotificationContext)

  const { mutate } = useMutation({ 
    mutationFn: createAnecdote, 
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})

      dispatchNotification({ type: 'MESSAGE', payload: `anecdote '${variable.content}' created` })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR' })
      }, 5000)
    },
    onError: (error) => {
      dispatchNotification({ type: 'MESSAGE', payload: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    mutate({ content })

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
