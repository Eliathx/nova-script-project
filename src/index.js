import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Game from './pages/Game';
import Lista from './pages/Lista';
import Resumen from './pages/Resumen';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/jugar",
    element: <Game></Game>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/lista-pacientes",
    element: <Lista></Lista>,
  },
  {
    path: "/Resumen",
    element: <Resumen></Resumen>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
