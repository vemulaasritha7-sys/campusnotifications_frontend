import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://20.207.122.201/evaluation-service";

function App() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const getToken = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth`, {
        email: "av7420@srmist.edu.in",
        name: "Asritha Vemula",
        rollNo: "RA2311030020166",
        accessCode: "QkbpxH",
        clientID: "88e3c2c4-5df9-4ac9-bbea-1a0064b62ace",
        clientSecret: "cpbUtSfucHhQBtXt"
      });

      setToken(res.data.access_token);
      alert("Token Generated ✅");
    } catch (err) {
      alert("Token Error ❌");
      console.log(err);
    }
  };

  const sendLog = async () => {
    try {
      await axios.post(
        `${BASE_URL}/logs`,
        {
          stack: "frontend",
          level: "error",
          package: "component",
          message: message
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Log Sent ✅");
    } catch (err) {
      alert("Log Failed ❌");
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Logging Middleware</h2>

      <button onClick={getToken}>Get Token</button>

      <br /><br />

      <input
        type="text"
        placeholder="Enter log message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br /><br />

      <button onClick={sendLog}>Send Log</button>
    </div>
  );
}

export default App;