import "./btn.scss";

const Btn = (props) => {
  return (
    <div
      className={props.value.status ? "btn-select" : "btn"}
      onClick={props.onClick}
    >
      {props.value.name}
    </div>
  );
};

export default Btn;
