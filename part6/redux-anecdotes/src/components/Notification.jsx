import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearNotification } from "../reducers/notificationReducer"

const Notification = () => {

  const dispatch = useDispatch()
  const { message, duration } = useSelector(state => state.notification)

  useEffect(() => {
    if(message && duration > 0) {
      const timer = setTimeout(() => {
        dispatch(clearNotification())
      }, duration * 1000)
      return () => clearTimeout(timer)
    }
  }, [message, duration, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    message ? (
    <div style={style}>
      {message}
    </div>
    ) : null
  )
}

export default Notification