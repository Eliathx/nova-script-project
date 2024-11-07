import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/index.css"
import App from './pages/App';
import Game from './pages/Game';
import UserInformationForm from './pages/UserInformationForm';
import Lista from './pages/Lista';
import Resumen from './pages/Resumen';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/jugar",
    element: <Game />,
  },
  {
    path: "/formularioInformaciónUsuario",
    element: <UserInformationForm></UserInformationForm>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/lista-pacientes",
    element: <Lista />,
  },
  {
    path: "/resumen/:pacienteId", // Ruta dinámica para paciente
    element: <Resumen />, // El componente Resumen recibirá el pacienteId
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

