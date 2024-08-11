import ReactDOM from "react-dom/client";
import "./components/AppRoutes"
import AppRoutes from "./components/AppRoutes";

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(
    <AppRoutes/>
)