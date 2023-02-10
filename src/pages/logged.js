import React from "react";
import { useRouter } from "next/router";

export default function Logged() {
  const router = useRouter();
  const currentId = router.query.id;

  return (
    <div className="container">
      <h1>Jay Shree Ganesh</h1>
      <h1>{currentId}</h1>
    </div>
  );
}
