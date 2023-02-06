import { useEffect, useState } from "react";
import "./App.scss";
import Bar from "./components/bar/bar";
import Btn from "./components/btn/btn";
import Input from "./components/input/input";
import {
  colorMap,
  sortList as sortList_,
  funcList,
  configList,
} from "./maps/maps";
import { config } from "./config/config";

function App() {
  const [barList, setBarList] = useState([]);
  const [sortList, setSortList] = useState(sortList_);
  const [left, setLeft] = useState(-1);
  const [right, setRight] = useState(-1);

  useEffect(() => {
    // init
    setBarList(randBarList(config.barConfig.quantity));
  }, []);

  useEffect(() => {
    if (right >= 0 || left >= 0) setHighLight();
  }, [left, right]);

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

  const sort = async () => {
    let temp = barList.map((val) => val);
    for (let i = temp.length; i >= 0; i--) {
      for (let j = 0; j < i - 1; j++) {
        setLeft(j);
        setRight(j + 1);
        await timer(config.barConfig.delay);
        if (temp[j].num > temp[j + 1].num) {
          swap(j, j + 1, temp);
          await timer(config.barConfig.delay);
        }
      }
    }
  };

  const swap = async (aIndex, bIndex, arr) => {
    [arr[aIndex], arr[bIndex]] = [arr[bIndex], arr[aIndex]];
    setBarList(arr);
  };

  const next = () => {};

  const prev = () => {};

  const setHighLight = () => {
    setBarList(
      barList.map((val, index) => {
        if (index === right) {
          val.color = colorMap.red;
          return val;
        }
        if (index === left) {
          val.color = colorMap.blue;
          return val;
        }
        val.color = colorMap.green;
        return val;
      })
    );
  };

  const timer = async (ms) => {
    return new Promise((res) => setTimeout(res, ms));
  };

  return (
    <div className="root">
      <div className="side-bar">
        <div className="logo-container">
          <div className="logo">
            <div className="name">Night</div>
            <div className="sub-name">Sea</div>
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
