import { useState } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hook/useAnecdotes'



const App = () => {
  const { anecdotes, isPending, isError, handleVote: handleVoteToServer, onCreate } = useAnecdotes()
  const handleVote = (anecdote) => {
    handleVoteToServer(anecdote)
    console.log('vote')
  }

  //  console.log(JSON.parse(JSON.stringify(anecdotes)))

  if (isPending) {
    return <div>loading data...</div>
  }

  if (isError) {
    return (
      <div>
        anecdote service not available due to problems in server
      </div>
    )
  }


  // const anecdotes = result.data

  return (
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm onCreate={onCreate} />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
  )
}

export default App