import React from "react";

export default function Card({ heading, description, icon, cardNo }) {
  return (
    <div className="card">
      <span className="card-no">{cardNo}</span>
      <div className="card-header">
        <span className="card-icon">{icon}</span>
        <h1 className="card-heading">{heading}</h1>
      </div>
      <div className="card-footer">
        <p className="card-description"> {description}</p>
      </div>
    </div>
  );
}
