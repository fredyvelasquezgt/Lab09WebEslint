/* eslint-disable react/prop-types */
import React from 'react';
import './Tarjeta.css';
import classnames from 'classnames';
import backpick from '../image/backpick.jpeg';

function Card({
  // eslint-disable-next-line react/prop-types
  onClick, card, index, isInactive, isFlipped, isDisabled,
}) {
  const handleClick = () => {
    if (!isFlipped && !isDisabled) {
      onClick(index);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      role="banner"
      onKeyDown={handleClick}
      className={classnames('card', {
        'is-flipped': isFlipped,
        'is-inactive': isInactive,
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src={backpick} alt="backpick" className="img" />
      </div>
      <div className="card-face card-back-face">
        <img src={card.image} alt="frontpic" className="img" />
      </div>
    </div>
  );
}
export default Card;
