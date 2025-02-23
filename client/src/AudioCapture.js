import React, { useState } from "react";

function AudioCapture({ user, onInterestsCaptured }) {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const simulateRecording = () => {
    setRecording(true);
    // Simulate a 3-second recording delay
    setTimeout(() => {
      // Simulated transcription result
      const dummyTranscript = "I love dogs";
      setTranscript(dummyTranscript);
      // Send interests to backend
      fetch("http://localhost:5000/api/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          interests: dummyTranscript,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          setRecording(false);
          onInterestsCaptured();
        });
    }, 3000);
  };

  return (
    <div>
      <h2>Audio Capture</h2>
      <p>Soul will extract - Traits</p>
      {recording ? (
        <p>Recording... Please wait.</p>
      ) : (
        <div>
          {transcript && <p>Transcript: {transcript}</p>}
          <button onClick={simulateRecording}>
            {transcript ? "Re-record" : "Record Audio"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AudioCapture;
