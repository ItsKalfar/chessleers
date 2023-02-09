import React from "react";
import { useRouter } from "next/router";

export default function Details() {
  const router = useRouter();
  const currentId = router.query.id;

  return (
    <div className="container">
      <h1>{currentId}</h1>
    </div>
  );
}
