// Import React hooks, navigation, and child components
import { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import NoteList from './NoteList'
import Notification from './Notification'
import Togglable from './Togglable'
// Import API service functions
import loginService from '../services/login'
import noteService from '../services/notes'

// Main page for displaying and managing notes
// Props: notes (array of all notes from App), user (logged-in user), setUser (update user state)
const NotesPage = ({ notes, user, setUser }) => {
  // Filter toggle state: true = show all notes, false = show only important notes
  const [showAll, setShowAll] = useState(true)
  // Error message state for login failures
  const [errorMessage, setErrorMessage] = useState(null)
  // Form input states for login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Handle login submission
  const handleLogin = async event => {
    event.preventDefault()  // Prevent page reload

    try {
      // Call login service with credentials
      const loggedUser = await loginService.login({ username, password })
      // Store auth token in note service for future API calls
      noteService.setToken(loggedUser.token)
      // Update user state (logged in successfully)
      setUser(loggedUser)
      // Clear form fields
      setUsername('')
      setPassword('')
    } catch {
      // If login fails, show error message
      setErrorMessage('wrong credentials')
      // Auto-clear error message after 5 seconds
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Determine which notes to display based on showAll toggle
  // If showAll is true: show all notes
  // If showAll is false: show only notes where important === true
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      {/* Display error/notification messages */}
      <Notification message={errorMessage} />

      {/* Show login form only if user is NOT logged in (!user = true) */}
      {!user && (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}

      {/* Show user info and logout button only if user IS logged in (user = true) */}
      {user && (
        <div>
          <p>
            {user.name} logged in{' '}
            <button onClick={() => setUser(null)}>logout</button>
          </p>
          <Link to="/create"><button>new note</button></Link>
        </div>
      )}

      {/* Toggle button to switch between showing all notes or just important ones */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      {/* Display the filtered list of notes */}
      <NoteList notes={notesToShow} />
    </div>
  )
}

// Export component for use in App
export default NotesPage