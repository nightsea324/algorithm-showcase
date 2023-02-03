import "./bar.scss";

const Bar = (props) => {
  return (
    <div
      className="bar"
      style={{
        height: props.value.num.toString() + "%",
        backgroundColor: props.value.color,
      }}
    ></div>
  );
};

export default Bar;
