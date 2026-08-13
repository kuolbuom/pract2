import Note from './Note'
import { useNotes } from './store'

const NoteList = () => {
    // component gets always the properly filtered set of notes
  const notes = useNotes()


  return (
    <ul>
      {notes.map(note => (
        <Note key={note.id} note={note} />
      ))}
    </ul>
  )
}

export default NoteList
