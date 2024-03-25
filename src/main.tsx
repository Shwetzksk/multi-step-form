import React from "react";
import ReactDOM from "react-dom/client";
import "@/assets/style/index.css";
import {RouterProvider} from "react-router-dom";
import router from "@lib/functions/router";
import {NextUIProvider} from "@nextui-org/react";
import "@/assets/style/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>,
);
