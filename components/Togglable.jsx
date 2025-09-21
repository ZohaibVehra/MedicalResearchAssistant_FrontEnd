import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visable, setVisable] = useState(false)

  const hideWhenVisable = { display: visable ? 'none' : '' }
  const showWhenVisable = { display: visable ? '' : 'none' }

  const toggleVisibility = () => setVisable(!visable)

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return(
    <div>
      <div style={hideWhenVisable}>
        <button onClick = {toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisable}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable