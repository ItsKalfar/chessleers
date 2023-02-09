import React, { useState, useEffect } from "react";
import BoardCard from "components/BoardCard";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => setPlayers(data))
        .catch((err) => {
          alert(err);
        });
    };
    fetchData();
  }, []);

  return (
    <section className="container">
      <div className="leader-board">
        <h2>Leaderboard</h2>
        <div className="players-wrapper">
          {players.map((player) => {
            const { id, name, username, email } = player;

            return (
              <BoardCard
                key={id}
                name={name}
                username={username}
                email={email}
                id={id}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
