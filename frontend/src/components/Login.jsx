import { useState } from "react";
import { loginUser } from "../api";

export default function Login({ onLogin, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({
        email,
        password,
      });

      if (data.success) {
        // Backend returns the JWT as "access_token"
        localStorage.setItem("access_token", data.access_token);

        onLogin(data.user);
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Network error. Please try again.",
      );
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="waveform justify-center mb-6" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <h1 className="font-display font-semibold text-3xl text-center mb-1">
        Welcome back
      </h1>

      <p className="text-center text-sm text-ink/60 mb-8">
        Log in to turn your words into speech.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-line rounded-xl p-6"
      >
        <label className="block text-sm font-medium mb-1">Email</label>

        <input
          className="w-full p-2.5 border border-line rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block text-sm font-medium mb-1">Password</label>

        <input
          className="w-full p-2.5 border border-line rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          className="w-full bg-teal hover:bg-teal-dark text-white font-medium py-2.5 rounded-lg transition"
          type="submit"
        >
          Log in
        </button>

        <p className="text-sm mt-5 text-center text-ink/60">
          New here?{" "}
          <button
            type="button"
            className="text-teal font-medium underline underline-offset-2"
            onClick={switchToRegister}
          >
            Create an account
          </button>
        </p>
      </form>
    </div>
  );
}
