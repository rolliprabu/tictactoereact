import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [count, setCount] = useState(0);
  const [turn, setTurn] = useState("O");
  const [gameData, setData] = useState([]);
  const [wincond, setWin] = useState(false);
  const winLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  function clickAct(num) {
    if (gameData[num] === undefined) {
      gameData[num] = turn;

      if (!checkBoard()) {
        if (turn === "O") {
          setTurn("X");
        } else {
          setTurn("O");
        }
      } else {
        setWin(true);
      }
    }
  }

  function printSqueare(num) {
    return (
      <td onClick={() => clickAct(num)}>
        <b>{gameData[num]}</b>
      </td>
    );
  }
  /////////
  function checkBoard() {
    for (var i = 0; i < winLine.length; i++) {
      const a = winLine[i][0];
      const b = winLine[i][1];
      const c = winLine[i][2];

      if (
        gameData[a] &&
        gameData[b] &&
        gameData[c] &&
        gameData[a] === gameData[b] &&
        gameData[a] === gameData[c]
      ) {
        return true;
      }
    }
    return false;
  }

  function msg() {
    if (wincond) {
      return (
        <>
          <b>{turn} </b> won the game
        </>
      );
    } else {
      return (
        <>
          <p>
            its <b>{turn} </b> turn
          </p>
        </>
      );
    }
  }
  return (
    <div className="App">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>incr</button>
      <br />
      <button onClick={() => setCount(count - 1)}>decr</button>
      <br />
      <br />
      <p>{msg()}</p>
      <table className="board" border="1">
        <tr>
          {printSqueare(0)}
          {printSqueare(1)}
          {printSqueare(2)}
        </tr>
        <tr>
          {printSqueare(3)}
          {printSqueare(4)}
          {printSqueare(5)}
        </tr>
        <tr>
          {printSqueare(6)}
          {printSqueare(7)}
          {printSqueare(8)}
        </tr>
      </table>

      <button onClick={() => setData([])}>reset</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
