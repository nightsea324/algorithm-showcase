import "./bar.scss";

const Bar = (props) => {
  return (
    <div className="bar" style={{ height: props.value.toString() + "%" }}></div>
  );
};

export default Bar;
