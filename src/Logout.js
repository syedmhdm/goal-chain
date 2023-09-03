import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <p style={{ fontSize: "1.2rem" }}>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <Button variant='link' onClick={handleLogout}>
        Log Out
      </Button>
      {error && <Alert variant='danger'>{error}</Alert>}
    </>
  );
}

export default Logout;
