import React, { useState } from "react";

import Button from "../components/Button";

const text = [
  "This is the button to press",
  "Second one",
  "Third One",
  "Fourth one",
  "fith one",
  "sixth one",
  "seventh one",
  "eighth one",
];
const MyApp = () => {
  const [btn, setBtn] = useState("");
  return (
    <>
      <h1>My App</h1>
      {text.map((text) => {
        return <Button setBtn={setBtn} text={text} />;
      })}
      <h1>{btn}</h1>
    </>
  );
};

export default MyApp;
