import React from "react";
import ReactDOM from "react-dom/client";

import VConnectHome from "./components/VConnectHome"

import "./index.css";

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<VConnectHome/>)