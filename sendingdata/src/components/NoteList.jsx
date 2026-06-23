// Import React Router Link component for navigation
import { Link } from 'react-router-dom'

// Component to display list of notes
// Props: notes (array of note objects)
const NoteList = ({ notes }) => {
  return (
    <ul>
      {/* Map through notes array and create a list item for each note */}
      {notes.map(note => (
        <li key={note.id}>
          {/* Link to individual note page, display note content as link text */}
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      ))}
    </ul>
  )
}

// Export component for use in NotesPage
export default NoteList
