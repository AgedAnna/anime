import "./index.css";
import { StrictMode } from "react";
import Home from "./routes/Homer/Home.tsx";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <Home />
    </Provider>
  </StrictMode>
);
