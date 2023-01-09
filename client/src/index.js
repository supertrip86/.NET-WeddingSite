import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/fonts/google-fonts/google-fonts.css';
import './assets/fonts/themify-icons/themifiy-icons.css';
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(
    <App />
);

window.addEventListener("load", function () {
    rootElement.classList.remove("invisible");
});