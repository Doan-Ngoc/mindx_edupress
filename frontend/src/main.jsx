import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <ThemeProvider>
    <BrowserRouter>
      <App />
      <Toaster
        toastOptions={{
          success: {
            iconTheme: {
              primary: "var(--primary-color)",
              secondary: "var( --white-color)",
            },
          },
          error: {
            iconTheme: {
              primary: "var(--secondary-color)",
              secondary: "var(--font-color)",
            },
          },
        }}
      />
    </BrowserRouter>
  </ThemeProvider>
  </StrictMode>
);
