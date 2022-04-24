import React, { useEffect, useRef, useState } from 'react';
import uniqueCardsArray from './data';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Resultados';
// eslint-disable-next-line import/order
import { Col, Container, Row } from 'react-bootstrap';
import Card from './Tarjeta';
import Finish from './Final';

// FisherYates Modern Shuffle Algorithm
function swap(array, i, j) {
  const arr = array;
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;

  // eslint-disable-next-line no-param-reassign
  array = arr;
}
function shuffleCards(array) {
  const { length } = array;
  for (let i = length; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    swap(array, currentIndex, randomIndex);
  }
  return array;
}

function App() {
  const [cards, setCards] = useState(() => shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
  const [openCards, setOpencards] = useState([]);
  const [matchedCards, setMatchedcards] = useState({});
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem('bestScore')) || Number.POSITIVE_INFINITY,
  );
  const timeout = useRef(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(matchedCards).length === uniqueCardsArray.length) {
      setShowModal(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem('bestScore', highScore);
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setMatchedcards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpencards([]);
      return;
    }
    timeout.current = setTimeout(() => {
      setOpencards([]);
    }, 500);
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpencards((prev) => [...prev, index]);
      setMoves((m) => m + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpencards([index]);
    }
  };
  useEffect(() => {
    let timeOut = null;
    if (openCards.length === 2) {
      timeOut = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [evaluate, openCards]);

  useEffect(() => {
    checkCompletion();
  }, [checkCompletion, matchedCards]);

  const checkIsFlipped = (index) => openCards.includes(index);
  const checkIsInactive = (card) => Boolean(matchedCards[card.type]);
  const handleRestart = () => {
    setMatchedcards({});
    setOpencards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    setCards(shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
  };

  return (
    <div>
      <Header
        moves={moves}
        bestScore={bestScore}
        handleRestart={handleRestart}
      />
      <Container>
        <Row>
          {cards.map((card, index) => (
            <Col xs={6} md={3} lg={2}>
              <Card
                key={card}
                card={card}
                index={index}
                isDisabled={shouldDisableAllCards}
                isInactive={checkIsInactive(card)}
                isFlipped={checkIsFlipped(index)}
                onClick={handleCardClick}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Finish
        showModal={showModal}
        moves={moves}
        bestScore={bestScore}
        handleRestart={handleRestart}
      />
    </div>
  );
}

export default App;
