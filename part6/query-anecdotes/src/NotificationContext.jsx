import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "MESSAGE":
      return action.payload
    case "CLEAR":
      return ''
    default:
      return state
  }
} 

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, '')
  return (
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext