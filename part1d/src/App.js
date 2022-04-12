import './App.css';
import {useState} from 'react';

const Feedback = ({rating, handleClick}) => {
  return <button onClick={handleClick} >{rating}</button>
}

const StatisticsLine = ({name, value}) => <p>{name} {value}</p>

const Statistics = ({good, bad, neutral}) => {
  const all = good+bad+neutral;
  const average = (sum, n) => sum / n;
  const percent = (n, d) => 100 * n / d;

  return ([
    <StatisticsLine name="good" value={good}/>,
    <StatisticsLine name="neutral" value={neutral}/>,
    <StatisticsLine name="bad" value={bad}/>,
    <StatisticsLine name="all" value={all}/>,
    <StatisticsLine name="average" value={average(good-bad, all)}/>,
    <StatisticsLine name="percent" value={percent(good, all) + "%"}/>,
  ])
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div className="App">
    <h1>
      give feedback
    </h1>

    <div>
    <Feedback handleClick={()=>setGood(good+1)} rating={"good"}/>
    <Feedback handleClick={()=>setNeutral(neutral+1)} rating={"neutral"}/>
    <Feedback handleClick={()=>setBad(bad+1)} rating={"bad"}/>
    </div>

    <h1>statistics</h1>

    {good+neutral+bad>0 ? <Statistics good={good} bad={bad} neutral={neutral}/> : <p>No feedback given</p>}

    </div>
  );
}

export default App;