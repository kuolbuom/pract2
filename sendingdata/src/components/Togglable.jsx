// Import React hooks for state management and ref handling
import { useState, useImperativeHandle } from 'react'

// Togglable component - shows/hides content with a button
// Can be controlled from parent using ref (via useImperativeHandle)
const Togglable = props => {
  // State to track if content is visible
  const [visible, setVisible] = useState(false)

  // CSS styles: hide button when visible === true (show content instead)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  // CSS styles: show content when visible === true (hide button instead)
  const showWhenVisible = { display: visible ? '' : 'none' }

  // Toggle visibility state
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // useImperativeHandle exposes toggleVisibility to parent component via ref
  // This allows parent to call ref.current.toggleVisibility() from outside
  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      {/* Show button only when content is hidden */}
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      
      {/* Show content and cancel button only when visible */}
      <div style={showWhenVisible}>
        {/* props.children = the content passed between <Togglable>...</Togglable> tags */}
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

// Export component for use in NotesPage
export default Togglable