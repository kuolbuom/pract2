// Footer component - displayed at bottom of every page
const Footer = () => {
  // CSS inline styles for the footer
  const footerStyle = {
    color: 'green',          // Green text color
    fontStyle: 'italic'      // Italic font style
  }

  return (
    <div style={footerStyle}>
      <br />
      <p>
        Note app, Department of Computer Science, University of Helsinki 2025
      </p>
    </div>
  )
}

// Export component for use in App
export default Footer