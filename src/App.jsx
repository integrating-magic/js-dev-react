import React, { useState } from "react";
import Button from "../components/Button";

const App = ({ buttons }) => {
  const [btn, setBtn] = useState({ text: "Click a button", btnText: "Choose" });
  return (
    <div>
      <div className="grid gap-5 py-5 sm:justify-center sm:flex ">
        {
          //map through the buttons array and create a button for each item
          buttons.map((button, index) => (
            <Button
              key={index}
              button={button}
              setBtn={setBtn}
              isActive={btn === button}
            />
          ))
        }
      </div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        {btn.text}
      </div>
    </div>
  );
};

export default App;
