import { FormEvent, useState } from "react";
import { signup, SignupResponse } from "./api";

const initialForm = {
  username: "",
  email: "",
  password: "",
};

export default function Signup() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<SignupResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const data = await signup(form);
      setStatus(data);

      if (data.success) {
        setForm(initialForm);
      }
    } catch {
      setStatus({ success: false, error: "Could not reach the server." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 360,
        margin: "48px auto",
        display: "grid",
        gap: 12,
        padding: 24,
        border: "1px solid #d0d7de",
        borderRadius: 12,
        background: "white",
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ margin: 0 }}>Create account</h2>
      <input
        placeholder="Username"
        value={form.username}
        onChange={(event) =>
          setForm({ ...form, username: event.target.value })
        }
      />
      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(event) => setForm({ ...form, email: event.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(event) =>
          setForm({ ...form, password: event.target.value })
        }
      />
      <button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Sign up"}
      </button>
      {status && (
        <p
          style={{
            margin: 0,
            color: status.success ? "green" : "crimson",
          }}
        >
          {status.message || status.error}
        </p>
      )}
    </form>
  );
}
