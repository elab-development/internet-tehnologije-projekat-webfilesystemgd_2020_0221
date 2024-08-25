import "./Button.css";

function Button({ handleClick, text }) {
  return (
    <button onClick={handleClick} className="button">
      {text}
    </button>
  );
}

export default Button;
