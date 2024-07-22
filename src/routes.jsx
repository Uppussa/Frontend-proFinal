import { createBrowserRouter } from "react-router-dom";
import Layout from './components/Layout';
import Login from './pages/Login';
import BitacoraTable from './pages/BitacoraTable';
import CrearIncidencia from "./pages/CrearIncidencia";
import Incidencia from "./pages/Incidencia";

import PrivateRoute from "../src/context/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        element: <PrivateRoute />,
        children: [
          { path: "dashboard", element: <Incidencia /> },
          { path: "bitacora", element: <BitacoraTable /> },
          { path: "new-incidencia", element: <CrearIncidencia /> },
         
        ]
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
]);