import React, { useState } from "react";
import Login from "./Login";
import AudioCapture from "./AudioCapture";
import Match from "./Match";
import Chat from "./Chat";

function App() {
  const [user, setUser] = useState(null);
  const [interestsCaptured, setInterestsCaptured] = useState(false);
  const [matchStatus, setMatchStatus] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleInterests = () => {
    setInterestsCaptured(true);
  };

  const handleMatch = (status) => {
    setMatchStatus(status);
  };

  return (
    <div style={{ padding: "20px" }}>
      {!user && <Login onLogin={handleLogin} />}
      {user && !interestsCaptured && (
        <AudioCapture user={user} onInterestsCaptured={handleInterests} />
      )}
      {user && interestsCaptured && !matchStatus && (
        <Match user={user} onMatch={handleMatch} />
      )}
      {user && matchStatus === "Closest" && <Chat user={user} />}
      {user && matchStatus === "Not Connected" && (
        <div>
          <h2>Not Connected</h2>
          <p>
            We could not find a matching interest for you. Please try again.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
