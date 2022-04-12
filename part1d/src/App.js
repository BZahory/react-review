import {useState} from 'react';

const Feedback = ({rating, handleClick}) => {
  return <button onClick={handleClick} >{rating}</button>
}

const StatisticsLine = ({name, value}) => <tr><td>{name}</td> <td>{value}</td></tr>

const Statistics = ({good, bad, neutral}) => {
  const all = good+bad+neutral;
  const average = (sum, n) => sum / n;
  const percent = (n, d) => 100 * n / d;

  return (<table>
    <StatisticsLine name="good" value={good}/>
    <StatisticsLine name="neutral" value={neutral}/>
    <StatisticsLine name="bad" value={bad}/>
    <StatisticsLine name="all" value={all}/>
    <StatisticsLine name="average" value={average(good-bad, all)}/>
    <StatisticsLine name="percent" value={percent(good, all) + "%"}/>
  </table>)
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
    <h1>
      give feedback
    </h1>
    <Feedback handleClick={()=>setGood(good+1)} rating={"good"}/>
    <Feedback handleClick={()=>setNeutral(neutral+1)} rating={"neutral"}/>
    <Feedback handleClick={()=>setBad(bad+1)} rating={"bad"}/>

    <h1>statistics</h1>
    <div >
    {good+neutral+bad>0 ? <Statistics good={good} bad={bad} neutral={neutral}/> : <p>No feedback given</p>}
    </div>

    </div>
  );
}

export default App;