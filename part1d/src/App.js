import './App.css';
import {useState} from 'react';

const Feedback = ({rating, handleClick}) => {
  return <button onClick={handleClick} >{rating}</button>
}

const Statistics = ({good, bad, neutral}) => {
  const all = good+bad+neutral;
  const average = (sum, n) => sum / n;
  const percent = (n, d) => 100 * n / d;

  return ([<p>good {good}</p>,
    <p>neutral {neutral}</p>,
    <p>bad {bad}</p>,
    <p>all {all}</p>,
    <p>average {average(good-bad, all)}</p>,
    <p>percent {percent(good, all)}%</p>])
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