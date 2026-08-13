// Login form component
// Props: handleSubmit, handleUsernameChange, handlePasswordChange, username, password (all from parent)
const LoginForm = ({
  handleSubmit,              // Function to call when form is submitted
  handleUsernameChange,      // Function to update username state
  handlePasswordChange,      // Function to update password state
  username,                  // Current username input value
  password                   // Current password input value
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        {/* Username input field */}
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        
        {/* Password input field (hidden characters) */}
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        
        {/* Submit button to send login credentials */}
        <button type="submit">login</button>
      </form>
    </div>
  )
}

// Export component for use in NotesPage
export default LoginForm