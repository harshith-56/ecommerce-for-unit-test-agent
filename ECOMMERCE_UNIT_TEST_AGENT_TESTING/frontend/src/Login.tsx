import { FormEvent, useState } from "react";
import { SignupResponse } from "./api";

interface LoginPayload {
  email: string;
  password: string;
}

async function login(payload: LoginPayload): Promise<SignupResponse> {
  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
}

function validateLoginForm(email: string, password: string): string | null {
  if (!email.includes("@")) {
    return "Please enter a valid email address.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  return null;
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<SignupResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const error = validateLoginForm(email, password);
    if (error) {
      setStatus({ success: false, error });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const data = await login({ email, password });
      setStatus(data);
    } catch {
      setStatus({ success: false, error: "Could not reach the server." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Log in"}
      </button>
      {status && (
        <p style={{ color: status.success ? "green" : "crimson" }}>
          {status.message || status.error}
        </p>
      )}
    </form>
  );
}