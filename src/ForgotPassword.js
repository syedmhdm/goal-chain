import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "./contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Faild to reset password");
    }
    setLoading(false);
  }

  return (
    <>
      <Card style={{ padding: "1rem" }}>
        <Card.Body>
          <h2 className='text-center mb-4'>Password Reset</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
        </Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group id='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              style={{ fontSize: "inherit" }}
              type='email'
              ref={emailRef}
              required
            />
          </Form.Group>

          <Button
            disabled={loading}
            style={{ fontSize: "inherit" }}
            className='w-100 mt-2'
            type='submit'
          >
            Reset Password
          </Button>
        </Form>
        <div className='w-100 text-center mt-3'>
          <Link style={{ fontSize: "1.2rem" }} to={"/login"}>
            Login
          </Link>
        </div>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </>
  );
}
