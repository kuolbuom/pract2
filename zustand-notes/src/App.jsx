import NoteForm from './NoteForm'
import NoteList from './NoteList'
import VisibilityFilter from './VisibilityFilter'
import { useNoteActions } from './store'
import { useEffect } from 'react'

const App = () => {

   const { initialize } = useNoteActions()

  useEffect(() => {
   initialize()
  }, [initialize])

  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <NoteList />
    </div>
  )
}

export default App