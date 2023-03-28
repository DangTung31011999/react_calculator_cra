import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import "./App.css";

function App() {

  const [input, setInput] = useState('0');
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [operator, setOperator] = useState(null);

  const handleClickNumber = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") return;
    curState
      ? setCurState((pre) => pre + e.target.innerText)
      : setCurState(e.target.innerText);
  };
  useEffect(() => {
    setInput(curState);
  }, [curState]);

  useEffect(() => {
    setInput("0");
  }, []);


  const handleOperator = (e) => {
    setOperator(e.target.innerText);
    if (curState === "") {
      return;
    }
    else {
      setPreState(curState);
      setCurState("");
    }
  };

  const equal = (e) => {
    let result;
    switch (operator) {
      case "/":
        result = String(parseFloat(preState) / parseFloat(curState));
        break;
      case "x":
        result = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "+":
        result = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "-":
        result = String(parseFloat(preState) - parseFloat(curState));
        break;
      default:
        return
    }
    setOperator(null);
    setInput("");
    setPreState(result);
    setCurState("");

  };
  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
  };
  const percent = () => {
    preState
      ? setCurState(String(parseFloat(preState) / 100))
      : setCurState(String(parseFloat(curState) / 100));
    setPreState("")
  };
  const minusPlus = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };
  return (
    <div className="app">
      <div className="container">
        <div className="result">{(input !== "" || input === "0") ? input : preState}</div>
        <div className="wrapper">
          <div className="btn light-gray" onClick={reset}>C</div>
          <div className="btn light-gray" onClick={minusPlus}>+/-</div>
          <div className="btn light-gray" onClick={percent}>%</div>
          <div className="btn orange " onClick={handleOperator}>/</div>
          <div className="btn" onClick={handleClickNumber}>7</div>
          <div className="btn" onClick={handleClickNumber}>8</div>
          <div className="btn" onClick={handleClickNumber}>9</div>
          <div className="btn orange " onClick={handleOperator}>x</div>
          <div className="btn" onClick={handleClickNumber}>4</div>
          <div className="btn" onClick={handleClickNumber}>5</div>
          <div className="btn" onClick={handleClickNumber}>6</div>
          <div className="btn orange " onClick={handleOperator}>-</div>
          <div className="btn" onClick={handleClickNumber}>1</div>
          <div className="btn" onClick={handleClickNumber}>2</div>
          <div className="btn" onClick={handleClickNumber}>3</div>
          <div className="btn orange " onClick={handleOperator}>+</div>
          <div className="btn zero" onClick={handleClickNumber}>0</div>
          <div className="btn" onClick={handleClickNumber}>.</div>
          <div className="btn orange " onClick={equal}>=</div>
        </div>
      </div>
    </div>
  );
}

export default App;
