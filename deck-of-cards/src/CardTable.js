import React, {useState, useEffect} from 'react';
import './CardTable.css';
import Card from './Card';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const CARD_API_BASE_URL = 'https://deckofcardsapi.com/api/deck';


/** CardTable component uses Card component */

function CardTable() {
  const [cards, setCards] = useState([]);
  const [deckID, setDeckID] = useState(null);
  const [remainingCards, setRemainingCards] = useState(0);

  // Getting a deck ID from a brand new deck and 
  // resetting deckID for the app once upon the first component render
  useEffect(() => {
    async function fetchDeckID() {
      const deckResult = await axios.get(
        `${CARD_API_BASE_URL}/new/shuffle`
      )
      setDeckID(deckResult.data.deck_id);
      setRemainingCards(deckResult.data.remaining);
    }
    fetchDeckID();
  }, []);

  async function drawCard() {
    const cardResult = await axios.get(
      `${CARD_API_BASE_URL}/${deckID}/draw`
    )
    let imgSRC = cardResult.data.cards[0].image;
    let remaining = cardResult.data.remaining;
    setCards(oldCards => (
      [...oldCards, { src: imgSRC, id: uuid() }]
    ));
    setRemainingCards(remaining);
  }

  return (
    <div>
      <h1>Cards Remaining: {remainingCards}</h1>
      {remainingCards === 0 ? "": <button onClick={drawCard}>Draw Card</button>}
      {cards.map(card => (
        <Card key={card.id} src={card.src} />
      ))}
    </div>
  )
}

export default CardTable;