import { createSlice } from '@reduxjs/toolkit';

import anecdoteService from '../services/anecdote'

// Helper function to generate a unique ID for each note


// Create the slice with reducers
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setVote: (state, action) => {
      const { id, votes } = action.payload;
      const anecdote = state.find(note => note.id === id);
      if (anecdote) {
        anecdote.votes = votes;
      }
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
});

// Export the action creators
export const { setVote, appendAnecdote, setAnecdote } = anecdoteSlice.actions;

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdote))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (id) => {
  return async dispatch => {
    const updateAnecdote = await anecdoteService.addVote(id)
    dispatch(setVote({ id: updateAnecdote.id, votes: updateAnecdote.votes }))
  }
}

// Export the reducer to be used in the store
export default anecdoteSlice.reducer;
