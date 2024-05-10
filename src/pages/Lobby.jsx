import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import "../styles/Lobby.scss";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="lobby-container">
      <h1 className="lobby-heading">Lobby</h1>
      <form className="lobby-form" onSubmit={handleSubmitForm}>
        <label htmlFor="email" className="form-label">
          Email ID
        </label>
        <input type="email" id="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label htmlFor="room" className="form-label">
          Room Number
        </label>
        <input type="text" id="room" className="form-input" value={room} onChange={(e) => setRoom(e.target.value)} />
        <br />
        <button className="submit-button">Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
