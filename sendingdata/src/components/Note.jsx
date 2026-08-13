// Import React Router hooks for navigation and URL parameters
import { useNavigate, useParams } from 'react-router-dom'

// Component to display a single note
// Props: note (single note), notes (array of notes), toggleImportance, toggleImportanceOf, deleteNote (functions)
const Note = ({ note, notes, toggleImportance, toggleImportanceOf, deleteNote }) => {
  // Get the ID from URL (e.g., /notes/123 → id = '123')
  const id = useParams().id
  // Hook to navigate to different routes
  const navigate = useNavigate()
  
  // ⭐ IMPORTANT: Understanding ?? (nullish coalescing) and ?. (optional chaining)
  // ?? (double question mark) = "use left side if it's not null/undefined, otherwise use right side"
  // ?. (optional chaining) = "safely access property, return undefined if object is null/undefined"
  // 
  // So this line means:
  // 1. If 'note' prop exists → use it
  // 2. Otherwise → search in 'notes' array for note with matching id
  // 3. But use ?. so if 'notes' is null/undefined, it won't crash - just returns undefined
  const currentNote = note ?? notes?.find(n => n.id === id)

  // If note doesn't exist, render nothing
  if (!currentNote) {
    return null
  }

  // Set button label based on current importance status
  const label = currentNote.important ? 'make not important' : 'make important'
  
  // Choose which toggle function to use based on whether 'notes' array exists
  // If notes array exists, use toggleImportanceOf (full featured); otherwise use toggleImportance
  const handleToggle = notes
    ? () => toggleImportanceOf(id)
    : toggleImportance

  // Delete handler: confirm deletion, delete the note, then navigate back to notes list
  const handleDelete = () => {
    if (window.confirm(`Delete note "${currentNote.content}"?`)) {
      deleteNote(id)        // Delete from database
      navigate('/notes')    // Go back to notes list page
    }
  }

  return (
    <li className="note">
      {/* Display note content */}
      <span>{currentNote.content}</span>
      
      {/* Show toggle button only if either toggle function exists */}
      {(toggleImportance || toggleImportanceOf) && (
        <button onClick={handleToggle}>{label}</button>
      )}
      
      {/* Show delete button only if deleteNote function exists (conditional rendering) */}
      {deleteNote && <button onClick={handleDelete}>delete</button>}
    </li>
  )
}

// Export component for use in other files
export default Note