import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.jsx";

import "./fedora.css";
import "./general.css";
import "@patternfly/react-core/dist/styles/base.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
