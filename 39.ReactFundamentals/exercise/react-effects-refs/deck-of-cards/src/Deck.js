import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
// import Card from "./Card";

const Deck = () => {
  const [deckId, setDeckId] = useState();
  const [cards, setCards] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);

  useEffect(() => {
    async function getDeck() {
      const resp = await axios.get(
        `https://deckofcardsapi.com/api/deck/new/shuffle/`
      );
      setDeckId(resp.data.deck_id);
    }
    getDeck();
  }, []);

  const cardsList = cards.map((card) => (
    <Card key={card.id} image={card.image} />
  ));

  const timerRef = useRef();

  useEffect(() => {
    async function drawACard() {
      const resp = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const card = resp.data.cards[0];
      if (resp.data.remaining > 0) {
        setCards((drawn) => [...drawn, { id: card.code, image: card.image }]);
      } else {
        setAutoDraw(false);
        alert("Error: no cards remaining!");
      }
    }

    if (autoDraw) {
      timerRef.current = setInterval(async () => {
        await drawACard();
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [autoDraw, deckId]);

  const toggleDrawCard = () => {
    setAutoDraw(!autoDraw);
  };

  return (
    <React.Fragment>
      {deckId ? (
        <button onClick={toggleDrawCard}>
          {autoDraw ? `Stop Drawing` : `Start Drawing`}
        </button>
      ) : (
        "Loading..."
      )}
      <div>{cardsList}</div>
    </React.Fragment>
  );
};

export default Deck;
