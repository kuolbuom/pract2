import { Alert } from "@mui/material"

// Component to display error or notification messages
// Props: message (string to display or null)
const Notification = ({ message }) => {
  // If message is null/empty, don't render anything
  if(message===null){
    return null
  }

  // Display message in a styled div (CSS class: 'error')
  return <Alert style={{marginTop: 10, marginBottom: 10}} severity={message.type}>{message.text}</Alert>
}

// Export component for use in other files
export default Notification