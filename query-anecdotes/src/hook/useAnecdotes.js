import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAnecdotes, updateAnecdote, createAnecdote } from "../requests"
import { useContext } from "react"

import useNotification from "./useNotify"

export const useAnecdotes = () => {
  const { setNotification } = useNotification()


  const queryClient = useQueryClient()

  //retrieving anecdotes from the server using TanStack Query.
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])

       queryClient.setQueryData( ['anecdotes'], anecdotes.concat(newAnecdote) )

      setNotification(`anecdote "${newAnecdote.content}" added` )
      setTimeout(() => {
        setNotification(null)
      },5000)
    },
     onError: (error) => {
      setNotification(error.message)

      setTimeout(()=> {
        setNotification(null)
      },5000)
     }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    handleVote: (anecdote) => updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
    onCreate: (content) => newAnecdoteMutation.mutate({ content, votes: 0 })
  }
}




