import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Header = ({ text }) => <h1>{text}</h1>;

const Total = ({ text, number }) => (
  <p>
    {text} {number}
  </p>
);

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    console.log("good", updatedGood);
  };

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    console.log("neutral", updatedNeutral);
  };

  const handleBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    console.log("bad", updatedBad);
  };

  return (
    <>
      <Header text={"give feedback"} />
      <Button onClick={handleGood} text={"good"} />
      <Button onClick={handleNeutral} text={"neutral"} />
      <Button onClick={handleBad} text={"bad"} />
      <Header text={"statistics"} />
      <Total text={"good"} number={good} />
      <Total text={"neutral"} number={neutral} />
      <Total text={"bad"} number={bad} />
    </>
  );
}

export default App;
