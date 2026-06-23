import { useNavigate, useParams } from 'react-router-dom'

const Note = ({ note, notes, toggleImportance, toggleImportanceOf, deleteNote }) => {
  const id = useParams().id
  const navigate = useNavigate()
  const currentNote = note ?? notes?.find(n => n.id === id)

  if (!currentNote) {
    return null
  }

  const label = currentNote.important ? 'make not important' : 'make important'
  const handleToggle = notes
    ? () => toggleImportanceOf(id)
    : toggleImportance

  const handleDelete = () => {
    if (window.confirm(`Delete note "${currentNote.content}"?`)) {
      deleteNote(id)
      navigate('/notes')
    }
  }

  return (
    <li className="note">
      <span>{currentNote.content}</span>
      {(toggleImportance || toggleImportanceOf) && (
        <button onClick={handleToggle}>{label}</button>
      )}
      {deleteNote && <button onClick={handleDelete}>delete</button>}
    </li>
  )
}

export default Note