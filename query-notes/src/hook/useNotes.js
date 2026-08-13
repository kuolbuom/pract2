import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getNotes, createNote, updateNote } from '../requests'



export const useNotes = () => {
  const queryClient = useQueryClient()

  //retrieve the notes in the App component.
  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false
  })

  const newNoteMutation = useMutation({
    //the application renders the up-to-date state on the server
    mutationFn: createNote,
    onSuccess: (newNote) => {
      // the added note is also rendered on the screen.
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))
    }
  })

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    }
  })

  return {
    notes: result.data,
    isPending: result.isPending,
    addNote: (content) => newNoteMutation.mutate({ content, important: true }),
    toggleImportance: (note) => updateNoteMutation.mutate({ 
      ...note, important: !note.important 
    }),
  }
}
