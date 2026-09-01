import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ProductProvider } from "./context/ProductContext";

import "./styles/global.css";

/* Load saved theme */
const savedTheme =
    localStorage.getItem("glowe_theme") || "light";

document.documentElement.setAttribute(
    "data-theme",
    savedTheme
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ProductProvider>
                <App />
            </ProductProvider>
        </BrowserRouter>
    </React.StrictMode>
);