import './App.css';
import {useState} from 'react';

const Feedback = ({rating, handleClick}) => {
  return <button onClick={handleClick} >{rating}</button>
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

    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>

    </div>
  );
}

export default App;