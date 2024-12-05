import "./Button.css";

function Button({ handleClick, text, width }) {
  return (
    <button onClick={handleClick} className="button" style={{width: `${width}`}}>
      {text}
    </button>
  );
}

export default Button;
