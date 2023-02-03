import { useEffect, useState } from "react";
import "./App.scss";
import Bar from "./components/bar/bar";
import Btn from "./components/btn/btn";

function App() {
  const [barList, setBarList] = useState([]);
  const [sortList, setSortList] = useState([
    { name: "快速排序", status: false },
    { name: "氣泡排序", status: false },
  ]);
  const funcList = [
    { name: "開始排序", status: false },
    { name: "下一步", status: false },
    { name: "上一步", status: false },
  ];
  const colorMap = {
    red: "#f04747",
    yellow: "#faa61a",
    green: "#43b581",
    blue: "#7289da",
    purple: "#5765f2",
    gray: "#2c2f33",
    lightGray: "#99aab5",
  };
  const [curStep, setCurStep] = useState(0);

  useEffect(() => {
    // init
    setBarList(randBarList(50));
  }, []);

  useEffect(() => {
    if (curStep) {
      setCurBar();
    }
  }, [curStep]);

  const randBarList = (amount) => {
    let result = [];
    for (let i = 0; i < amount; i++) {
      result = [
        ...result,
        { color: colorMap.green, num: Math.floor(Math.random() * 100 + 1) },
      ];
    }
    return result;
  };

  const titleClick = (event) => {
    event.target.className = "title-select";
  };

  const btnClick = (event) => {
    if (event.status) return;
    setSortList(
      sortList.map((val) => {
        val.status = val === event;
        return val;
      })
    );
  };

  const funcClick = (event) => {
    switch (event.name) {
      case "開始排序":
        sort();
        break;
      case "下一步":
        next();
        break;
      case "上一步":
        prev();
        break;
    }
  };

  const sort = () => {
    let temp = barList.map((val) => val).sort((a, b) => a.num - b.num);
    setBarList(temp);
  };

  const next = () => {
    if (curStep >= barList.length) return;
    setCurStep((val) => (val += 1));
  };

  const prev = () => {
    if (curStep <= 0) return;
    setCurStep((val) => (val -= 1));
  };

  const setCurBar = () => {
    let temp = barList.map((val) => {
      val.color = colorMap.green;
      return val;
    });
    temp[curStep - 1].color = colorMap.red;
    temp[curStep].color = colorMap.blue;
    setBarList(temp);
  };

  return (
    <div className="root">
      <div className="side-bar">
        <div className="logo-container">
          <div className="logo">
            <div className="title">Night</div>
            <div className="sub-title">Sea</div>
          </div>
        </div>
        <div className="title-select" onClick={(event) => titleClick(event)}>
          Sort
        </div>
      </div>
      <div className="chat-container">
        <div className="btn-container">
          {sortList.map((val, index) => (
            <Btn key={index} value={val} onClick={() => btnClick(val)}></Btn>
          ))}
        </div>
        <div className="btn-container">
          {funcList.map((val) => (
            <Btn
              key={val.name}
              value={val}
              onClick={() => funcClick(val)}
            ></Btn>
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
