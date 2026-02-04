import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Header = ({ text }) => <h1>{text}</h1>;

const StatisticLine = ({ text, number }) => (
  <p>
    {text} {number}
  </p>
);

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;

  const average = all === 0 ? 0 : (good - bad) / all;

  const positivePercent = all === 0 ? 0 + " %" : (good / all) * 100 + " %";

  const handleGood = () => setGood(good + 1);

  const handleNeutral = () => setNeutral(neutral + 1);

  const handleBad = () => setBad(bad + 1);

  return (
    <>
      <Header text={"give feedback"} />
      <Button onClick={handleGood} text={"good"} />
      <Button onClick={handleNeutral} text={"neutral"} />
      <Button onClick={handleBad} text={"bad"} />
      <Header text={"statistics"} />
      <StatisticLine text={"good"} number={good} />
      <StatisticLine text={"neutral"} number={neutral} />
      <StatisticLine text={"bad"} number={bad} />
      <StatisticLine text={"all"} number={all} />
      <StatisticLine text={"average"} number={average} />
      <StatisticLine text={"positive"} number={positivePercent} />
    </>
  );
}

export default App;
