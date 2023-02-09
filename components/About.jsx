import React from "react";
import Card from "./Card";
import { SiLichess } from "react-icons/si";
import { GiSwordsEmblem } from "react-icons/gi";
import { FaCoins } from "react-icons/fa";

const cardInfo = [
  {
    id: 1,
    heading: "Login",
    icon: <SiLichess />,
    description: "With your lichess account to sync your rankings and earnings",
  },
  {
    id: 2,
    heading: "Challenge",
    icon: <GiSwordsEmblem />,
    description:
      "your favourite player or friends or simply create an open challenge",
  },
  {
    id: 3,
    heading: "Earn",
    icon: <FaCoins />,
    description: "coins and use them for future matches",
  },
];

export default function About() {
  return (
    <section className="container about-section">
      <h1>How Does It Work</h1>
      <div className="card-wrapper">
        {cardInfo.map((card) => {
          return (
            <Card
              key={card.id}
              cardNo={card.id}
              icon={card.icon}
              heading={card.heading}
              description={card.description}
            />
          );
        })}
      </div>
    </section>
  );
}
