import { configureStore } from '@reduxjs/toolkit'

import noteSlice from './anecdoteReducer'
import filterSlice from './filterReducer'
import notificationSlice from './notificationReducer'


const store = configureStore({
  reducer: {
    notes: noteSlice,
    filter: filterSlice,
    notification: notificationSlice
  }
})

export default store