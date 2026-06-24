// Import React hooks and navigation
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// import { TextField, Button } from '@mui/material'

import styled from 'styled-components'

// Define styled components OUTSIDE the component to avoid recreating them on each render
const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.5em;
  width: 250px;
`

// Component for creating a new note
// Props: createNote (function to save new note)
const NoteForm = ({ createNote }) => {
  // Hook to navigate to different pages
  const navigate = useNavigate()
  // State to store the note content being typed
  const [newNote, setNewNote] = useState('')

  // Handle form submission
  const addNote = event => {
    event.preventDefault()  // Prevent page reload on form submit

    // Call parent function to create note with form data
    createNote({
      content: newNote,     // The note text from input
      important: true       // New notes start as important
    })

    navigate('/notes')      // Go to notes list page
    setNewNote('')          // Clear the input field
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Input field - updates state as user types */}
        {/* <TextField */}
        <Input
          value={newNote}
          onChange={event => setNewNote(event.target.value)}
          placeholder="write note content here"
        />
        {/* /> */}
        {/* Save button - triggers form submission */}
        <Button type="submit">save</Button>
        {/* Cancel button - navigates back without saving */}
        {/* <Button type="button" variant="outlined" onClick={() => navigate('/notes')}>cancel</Button> */}
        <Button type="button" onClick={() => navigate('/notes')}>cancel</Button>
      </form>
    </div>
  )
}

// Export component for use in other files
export default NoteForm