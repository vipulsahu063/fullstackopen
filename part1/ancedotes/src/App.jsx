import { useState } from 'react'

const MostVotedAnecdote = ({vote, anecdotes}) => {

  let largest = vote[0]
  let position = 0
  
  for (let i = 0; i < vote.length; i++) {
    if (vote[i] > largest) {
      largest = vote[i]
      position = i
    }
  }

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[position]} <br /> has {largest} votes 
    </div>
  )
} 

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Uint8Array(8))
  // console.log(vote)

  const getRandomInt = () => Math.floor(Math.random() * 8)
  

  const handleNextClick = () => setSelected(getRandomInt)


  const handleVoteClick = () => {
    const newArr = [...vote]
    // console.log(newArr)
    newArr[selected] += 1
    setVote(newArr)
  }

  return (
    <div>
      <div>
        <h1>Ancidote of day</h1>
        {anecdotes[selected]}<br />
        has {vote[selected]} votes<br />
        <button onClick={handleVoteClick}>vote</button>
        <button onClick={handleNextClick}>next anecdote</button>
      </div>
        <MostVotedAnecdote vote={vote} anecdotes={anecdotes} />
    </div>
  )
}

export default App
