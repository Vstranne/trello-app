import React from "react";
import "./card.css";
import Title from "../Title";

const Card = (props) => {
  const [lists, setLists] = React.useState([]);
  const [optionValue, setOptionValue] = React.useState("");
  const [inputText, setInputText] = React.useState("");
  const key = "b1e793bf8f5063ec5aacea3046457ad0";
  const token =
    "7638ca317415f52368d5599ca375434c8656494626d19436c875c485ad6a5384";

  React.useEffect(() => {
    const rootUrl = `https://api.trello.com/1/boards/${props.boardId}/lists?key=${key}&token=${token}`;

    fetch(`${rootUrl}`)
      .then((res) => res.json())
      .then((json) => {
        setLists(json);
      });
  }, []);

  const makePostUrl = `https://api.trello.com/1/cards?key=${key}&token=${token}&idList=${optionValue}&idBoard=${props.boardId}4&name=${inputText}`;
  function postNewCardToApi() {
    fetch(`${makePostUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.text();
    });
  }

  return (
    <div className="card">
      <Title text={props.text} />
      <div className="optionContainer">
        <label>Välj lista:</label>
        <select
          value={optionValue}
          onChange={(e) => setOptionValue(e.target.value)}
        >
          {lists.map((list) => {
            return (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="formContainer">
        <input
          type="text"
          placeholder="Namn på nytt kort..."
          onChange={(e) => setInputText(e.target.value)}
        ></input>
        <button className="btn" onClick={postNewCardToApi}>
          + Lägg till kort
        </button>
      </div>
    </div>
  );
};

export default Card;
