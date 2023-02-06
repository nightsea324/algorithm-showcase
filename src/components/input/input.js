import "./input.scss";

const Input = (props) => {
  return (
    <div>
      <div className="props">{props.value?.name}</div>
      <input
        className="input"
        maxLength={10}
        value={props.value?.value}
      ></input>
    </div>
  );
};

export default Input;
