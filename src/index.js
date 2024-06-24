import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";

window.loadButtons = (json) => {
  const obj = JSON.parse(json);
  const container = document.getElementById("root");
  const root = createRoot(container);

  root.render(<App obj={obj} />);
};