//create a button function component. Export it so it can be used in other files
import React from "react";
export default function Button({ text, setBtn }) {
  return (
    <button
      onClick={() => {
        setBtn(text);
      }}
    >
      {text}
    </button>
  );
}
