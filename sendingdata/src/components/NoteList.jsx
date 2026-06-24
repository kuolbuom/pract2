// Import React Router Link component for navigation
import { Link } from 'react-router-dom'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'


// Component to display list of notes
// Props: notes (array of note objects)
const NoteList = ({ notes }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Content</TableCell>
            <TableCell>user</TableCell>
            <TableCell>Important</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {/* Map through notes array and create a list item for each note */}
            {notes.map(note => (
            <TableRow key={note.id}>
              <TableCell>
                <li key={note.id}>
                  {/* Link to individual note page, display note content as link text */}
                   <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </li>
              </TableCell>
              <TableCell>{note.user?.name}</TableCell>
              <TableCell>{note.important ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    // <ul>
    //   {/* Map through notes array and create a list item for each note */}
    //   {notes.map(note => (
    //     <li key={note.id}>
    //       {/* Link to individual note page, display note content as link text */}
    //       <Link to={`/notes/${note.id}`}>{note.content}</Link>
    //     </li>
    //   ))}
    // </ul>
  )
}

// Export component for use in NotesPage
export default NoteList
