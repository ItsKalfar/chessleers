import React from "react";
import { AiOutlineTrophy } from "react-icons/ai";

export default function BoardCard({ id, name, username, email }) {
  return (
    <div className="leader-board-card">
      <div>
        {id == 1 ? (
          <AiOutlineTrophy color="yellow" className="trophy-icon" />
        ) : id == 2 ? (
          <AiOutlineTrophy color="silver" className="trophy-icon" />
        ) : id == 3 ? (
          <AiOutlineTrophy color="orange" className="trophy-icon" />
        ) : (
          id
        )}
      </div>
      <p className="name">{name}</p>
      <p className="username">{username}</p>
      <p className="emailId">{email}</p>
    </div>
  );
}
