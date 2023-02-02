import { useEffect, useState } from "react";
import "./App.scss";
import Bar from "./components/bar/bar";
import Btn from "./components/btn/btn";

function App() {
  const [barList, setBarList] = useState([]);
  const [btnList, setBtnList] = useState([
    { name: "快速排序", status: false },
    { name: "氣泡排序", status: false },
  ]);

  useEffect(() => {
    // init
    setBarList(randBarList(50));
  }, []);

  const randBarList = (amount) => {
    let result = [];
    for (let i = 0; i < amount; i++) {
      result = [...result, Math.floor(Math.random() * amount + 1)];
    }
    return result;
  };

  const titleClick = (event) => {
    event.target.className = "title-select";
  };

  const btnClick = (event) => {
    if (event.status) return;
    setBtnList(
      btnList.map((val) => {
        val.status = val === event;
        return val;
      })
    );
    setBarList(barList.sort((a, b) => a - b));
  };

  return (
    <div className="root">
      <div className="side-bar">
        <div className="title-select" onClick={(event) => titleClick(event)}>
          Sort
        </div>
      </div>
      <div className="chat-container">
        <div className="btn-container">
          {btnList.map((val, index) => (
            <Btn key={index} value={val} onClick={() => btnClick(val)}></Btn>
          ))}
        </div>
        <div className="chat-card">
          {barList.map((val, index) => (
            <Bar key={index} value={val}></Bar>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
