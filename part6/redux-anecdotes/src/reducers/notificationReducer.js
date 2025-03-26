import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: '',
  duration: 0
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      const { message, duration } = action.payload
      state.message = message
      state.duration = duration
      
    },
    clearNotification: () => {
      return { message: '', duration: 0}
    }

  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer