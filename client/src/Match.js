import React, { useState } from "react";

function Match({ user, onMatch }) {
  const [loading, setLoading] = useState(false);

  const findMatch = async () => {
    setLoading(true);
    const res = await fetch(
      `http://localhost:5000/api/match?username=${user.username}`
    );
    const data = await res.json();
    onMatch(data.match);
    setLoading(false);
  };

  return (
    <div>
      <h2>Matching...</h2>
      <button onClick={findMatch} disabled={loading}>
        {loading ? "Finding match..." : "Find Match"}
      </button>
    </div>
  );
}

export default Match;
