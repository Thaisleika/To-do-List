import "./styles.css";

export function Activities(props) {
  return (
    <div className="activities">
      <strong>{props.task}</strong>
      <small>{props.when}</small>
    </div>
  );
}
