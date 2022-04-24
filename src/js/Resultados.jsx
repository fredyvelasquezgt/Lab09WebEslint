import React from 'react';
import './Resultados.css';
import { Container } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
function Header({ moves, handleRestart }) {
  return (
    <div>
      <h1>Memory Game</h1>
      <Container>
        <div className="sub-header">
          <div className="moves">
            <span className="bold">Moves:</span>
            {moves}
          </div>
          <div className="reshuffle">
            <button onClick={handleRestart} type="button">
              Reiniciar
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
