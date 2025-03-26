import { useState } from 'react'

const Togglable = (props) => {

  const hideWhenVisible = { display: props.visiblity ? 'none' : '' }
  const showWhenVisible = { display: props.visiblity ? '' : 'none' }

  const toggleVisiblity = () => props.setVisibility(!props.visiblity)

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisiblity}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisiblity}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable