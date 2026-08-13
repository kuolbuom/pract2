import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import noteService from './services/notes'

// const logger = (config) => (set, get) => config(
//   (...args) => {
//     console.log('prev state', get());
//     set(...args);
//     console.log('next state', get());
//   },
//   get
// );


const useNoteStore = create(devtools((set, get) => ({
  notes: [],
  filter: 'all',
  actions: {
    add: async (content) => {
      const newNote = await noteService.createNew(content)
      set(state => ({ notes: [...state.notes, newNote] }))
    },
    initialize: async () => {
      const notes = await noteService.getAll()
      set(() => ({ notes }))
    },
    toggleImportance: async (id) => {
      const note = get().notes.find(n => n.id === id)
      const updated = await noteService.update(
        id, { ...note, important: !note.important }
      )
      set(state => ({
        notes: state.notes.map(n => n.id === id ? updated : n)
      }))
    },
    setFilter: value => set(() => ({ filter: value }))
  }
})))

export const useNotes = () => {
  const notes = useNoteStore(state => state.notes)
  const filter = useNoteStore(state => state.filter)
  if (filter === 'important')  return notes.filter(note => note.important)
  if (filter === 'nonimportant') return notes.filter(note => !note.important)
  return notes
} 

export const useNoteActions = () => useNoteStore(state => state.actions)

export default useNoteStore