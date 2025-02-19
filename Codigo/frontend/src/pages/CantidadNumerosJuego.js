import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CantidadNumerosJuego.css";

const CantidadNumerosJuego = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(""); // Estado para manejar la cantidad ingresada

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    if (quantity && !isNaN(quantity) && quantity > 0) {
      // Verificar que sea un número positivo
      navigate("/jugar", { state: { quantity: parseInt(quantity, 10) } });
    } else {
      alert("Por favor, ingresa un número");
    }
  };

  return (
    <div className="mainContainer">
      {/* <h1>Selecciona la cantidad <br></br> de números para el desafío</h1> */}
      <h1>
        <strong>Para continuar:</strong>
      </h1>
      <p>Por favor, ingresa la cantidad de números para el desafío:</p>
      {/* texto en negrita */}
      {/* <p><strong>Nota:</strong> El número máximo de números a jugar es 27.</p> */}

      <form
        style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
        onSubmit={handleSubmit}
      >
        <input
          type="number"
          id="inputQuantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="12"
          min="1"
          max={100}
          required
        />
        <button id="verificarButton" type="submit">
          Comenzar
        </button>
      </form>
      <br></br>
      <a className="enlaceRegresar" href="/formularioInformaciónUsuario">
        Regresar
      </a>
      <p id="grayText">Colocar números enteros entre 1 y 100.</p>
    </div>
  );
};

export default CantidadNumerosJuego;
