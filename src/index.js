import BoothDiagram from "./BoothDiagram";
import React from "react";
import { createRoot } from "react-dom/client";
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWH9fd3VWQmRZVkZ+X0c="
);
const container = document.getElementById("root");
const root = createRoot(container);

  root.render(<BoothDiagram />);
