import React from "react";
import { useRouter } from "next/router";

export default function Logged() {
  const router = useRouter();

  return (
    <div className="container">
      <h1>Jay Shree Ganesh</h1>
    </div>
  );
}
