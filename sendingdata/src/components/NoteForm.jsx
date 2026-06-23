// Import React hooks and navigation
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

      <form onSubmit={addNote}>
        {/* Input field - updates state as user types */}
        <input
          value={newNote}
          onChange={event => setNewNote(event.target.value)}
          placeholder="write note content here"
        />
        {/* Save button - triggers form submission */}
        <button type="submit">save</button>
        {/* Cancel button - navigates back without saving */}
        <button type="button" onClick={() => navigate('/notes')}>cancel</button>
      </form>
    </div>
  )
}

// Export component for use in other files
export default NoteForm