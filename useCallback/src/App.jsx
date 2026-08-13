import { memo, useCallback, useState } from "react"

// React.memo makes this component skip re-rendering if its props haven't changed
const NoteList = memo(({ onDelete, notes }) => {
  console.log('NoteList rendered')

  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>
          {note.content}
          <button onClick={() => onDelete(note.id)}>delete</button>
        </li>
      ))}
    </ul>
  )
})
const App = () => {
 const [notes, setNotes] = useState([
  { id: 1, content: 'Learn react' },
  { id: 2, content: 'Learn hooks' },
  { id: 3, content: 'Learn useMemo' },
  { id: 4, content: 'Learn useCallback' },
  { id: 5, content: 'build some thing cool' }
 ])

 const [newNote, setNewNote] = useState('')

 //before adding useCallback 
//  const handleDelete = (id) => {
//   setNotes(notes.filter(note => note.id!==id))
//  }

 const handleDelete = useCallback((id) => {
  setNotes(notes.filter(note => note.id !== id))
 }, []) // no external dependencies: this function never needs to change

 const handleAdd = () => {
  setNotes(notes => [...notes, {id: Date.now(), content: newNote}])
  setNewNote('')
 }
  return (
   <div>
    <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
    <button onClick={handleAdd}>add</button>
    <NoteList notes={notes} onDelete={handleDelete} />
   </div>
  )
}

export default App
