import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";

window.loadApp = (json) => {
  const obj = JSON.parse(json);
  const buttons = obj.data;
  const container = document.getElementById("root");
  const root = createRoot(container);

  root.render(<App buttons={buttons} />);
};