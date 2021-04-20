import React from "react";
import Logo from "./components/Logo";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [data, setData] = React.useState([]);
  const key = "b1e793bf8f5063ec5aacea3046457ad0";
  const token =
    "7638ca317415f52368d5599ca375434c8656494626d19436c875c485ad6a5384";

  React.useEffect(() => {
    const rootUrl = `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`;
    fetch(`${rootUrl}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  return (
    <div className="App">
      <Logo text="Quick Trello!" />
      <section className="cardContainer">
        {data.map((table) => {
          return <Card key={table.id} boardId={table.id} text={table.name} />;
        })}
      </section>
    </div>
  );
}

export default App;
