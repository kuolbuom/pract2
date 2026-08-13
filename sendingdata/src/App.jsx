// Import React hooks for state management and side effects
import { useState, useEffect } from 'react'
// Import the notes service for API calls (to fetch, create, update, delete notes)
import noteService from './services/notes'
import styled from 'styled-components'
import { AppBar, Button, Container, Toolbar } from '@mui/material'

// Define styled components OUTSIDE the component
const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const StyledFooter = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

// Import React Router components for navigation/routing
import {
  BrowserRouter as Router,    // Provides routing context to the app
  Routes,                      // Container for route definitions
  Route,                       // Individual route definition
  Link                         // Navigation links (doesn't reload page)
} from 'react-router-dom'
import Home from './components/Home'
import Note from './components/Note'
import NoteForm from './components/NoteForm'
import NotesPage from './components/NotesPage'
import Notification from './components/Notification'

const App = () => {
  // State variable to store all notes and function to update it
  const [notes, setNotes] = useState([])
  // Logged-in user state (null if not logged in) - lifted here so NoteForm can use it too
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  // useEffect runs once when component mounts (empty [] dependency array)
  // It fetches all notes from the server and updates the state
  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)  // Store fetched notes in state
    })
  }, [])  // Empty dependency = runs only once after initial render

  // Function to create a new note
  // noteObject: the form data from user (title, content, etc.)
  const addNote = noteObject => {
    // Attach the logged-in user to the note before saving
    const noteWithUser = user
      ? { ...noteObject, user: { username: user.username, name: user.name } }
      : noteObject
    // Send the new note to the server via API
    noteService.create(noteWithUser).then(returnedNote => {
      // After server returns the created note (with an ID from database)
      // Add it to our state: ...notes (all existing) + [returnedNote] (new one)
      setNotes(notes.concat(returnedNote))
      setNotification({ text: `Note '${returnedNote.content}' added successfully`, type: 'success' })
      setTimeout(() => setNotification(null), 5000)
    })
  }

  // Function to toggle (flip) the importance status of a note
  // id: the ID of the note to update
  const toggleImportanceOf = id => {
    // Find the note object with matching ID
    const note = notes.find(n => n.id === id)

    // If note doesn't exist, stop execution
    if (!note) {
      return
    }

    // Create a new note object by:
    // 1. ...note spreads all existing properties (id, title, content, etc.)
    // 2. important: !note.important flips the importance boolean (true→false or false→true)
    const changedNote = { ...note, important: !note.important }

    // Send the updated note to the server
    noteService.update(id, changedNote).then(returnedNote => {
      // Update the state: replace the old note with the returned updated note
      // .map() creates new array, ternary operator replaces matching note
      setNotes(notes.map(n => (n.id !== id ? n : returnedNote)))
    })
  }

  // Function to delete a note
  // id: the ID of the note to delete
  const deleteNote = id => {
    // Send delete request to the server
    noteService.remove(id).then(() => {
      // After successful deletion on server, remove from state
      // .filter() keeps all notes EXCEPT the one with matching id
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  // CSS style object for navigation links
  // (applies 5px padding to each link)
  const padding = {
    padding: 5
  }

  const style = { '&:hover': {bgcolor: 'rgba(255, 255, 255, 0.3)'} }

  return (
    // Router wrapper provides routing context for the entire app
    <Container>
      <Router>
        <Page>
          {/* Navigation links - Link doesn't reload page like <a> tags do */}
          <Navigation>
            {/* <AppBar position="static">
              <Toolbar> */}
                <Button color='inherit' component={Link} to="/" sx={style}>home</Button>
                <Button color='inherit' component={Link} to="/notes" sx={style}>notes</Button>
                <Button color='inherit' component={Link} to="/create" sx={style}>new note</Button>
              {/* </Toolbar>
            </AppBar> */}
          </Navigation>

          <Notification message={notification} />

          {/* Routes container - renders component matching current URL path */}
          <Routes>
            {/* /notes path - shows all notes list */}
            <Route
              path="/notes"
              element={<NotesPage
                 notes={notes}
                 user={user}
                 setUser={setUser} />}
            />

            {/* /notes/:id path - shows single note by ID (colon means dynamic parameter) */}
            <Route
              path="/notes/:id"
              element={
                <Note
                  notes={notes}
                  toggleImportanceOf={toggleImportanceOf}
                  deleteNote={deleteNote}
                />
              }
            />

            {/* /create path - form to add a new note */}
            <Route
              path="/create"
              element={<NoteForm createNote={addNote} user={user} />}
            />

            {/* / path (root) - home page, matches all unmatched routes */}
            <Route path="/" element={<Home />} />
          </Routes>

          {/* Footer component shown on every page */}
          <StyledFooter>
            Note app, Department of Computer Science, University of Helsinki 2026
          </StyledFooter>
        </Page>
      </Router>
    </Container>
  )
}

// Export the App component as the main component of this app
export default App