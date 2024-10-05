import { useState } from 'react'

const StatisticLine = ({text, value}) => {

  if (text === 'positive') {
    return (
      <table>
        <thead>
          <tr>
            <th>{text} {value} %</th>
          </tr>
        </thead>
      </table>
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th>{text} {value}</th>
        </tr>
      </thead>
    </table>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  const total = good + neutral + bad

  const average = (good - bad) / total
  const positive = (good / total) * 100

  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='total' value={total} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} />
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
