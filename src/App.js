import React, { useState } from "react";
import Button from "../components/Button";

// const buttons = [
//   { text: "This is button 1", btnText: "Button 1" },
//   { text: "This is button 2", btnText: "Button 2" },
//   { btnText: "Button 3", text: "This is button 3" },
//   { text: "This is button 4", btnText: "Button 4" },
//   { text: "This is button 5", btnText: "Button 5" },
// ];
const App = ({ buttons }) => {
  const [btn, setBtn] = useState({ text: "Click a button", btnText: "" });
  return (
    <div>
      <div className="grid gap-5 py-5 sm:justify-center sm:flex ">
        {" "}
        {
          //map through the buttons array and create a button for each item
          buttons.map((button, index) => (
            <Button key={index} button={button} setBtn={setBtn} />
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
