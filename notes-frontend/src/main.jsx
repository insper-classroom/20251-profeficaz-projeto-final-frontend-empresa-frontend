import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Ministerio, {
  loader as ministerioLoader,
} from "./components/Ministerio/index.jsx"; // <-- importe o loader
import "./index.css";
import MinisterioDetalhado from "./components/MinisterioDetalhado.jsx"; // NOVO

const router = createBrowserRouter([
  {
    path: "/",
    element: <Ministerio />,
    loader: ministerioLoader, // <-- adicione aqui
  },
  {
    path: "/tabelas_de_dados/:siafe/:ano", // NOVO
    element: <MinisterioDetalhado />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);