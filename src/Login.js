import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "./contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Faild to log in");
    }
    setLoading(false);
  }

  return (
    <>
      <Card style={{ padding: "1rem" }}>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
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
          <Form.Group id='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              style={{ fontSize: "inherit" }}
              type='password'
              ref={passwordRef}
              required
            />
          </Form.Group>
          <Button
            disabled={loading}
            style={{ fontSize: "inherit" }}
            className='w-100 mt-2'
            type='submit'
          >
            Log In
          </Button>
        </Form>
        <div className='w-100 text-center mt-3'>
          <Link style={{ fontSize: "1.2rem" }} to={"/forgot-password"}>
            Forgot Password?
          </Link>
        </div>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </>
  );
}
