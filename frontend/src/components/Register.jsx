import { useState } from "react";
import { registerUser } from "../api";

export default function Register({ onRegister, switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await registerUser({
        name,
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("access_token", data.access_token);

        onRegister(data.user);
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Network error. Please try again.",
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
        Create your account
      </h1>

      <p className="text-center text-sm text-ink/60 mb-8">
        Save your history and favorite voices.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-line rounded-xl p-6"
      >
        {/* Name */}
        <label className="block text-sm font-medium mb-1">Name</label>

        <input
          className="w-full p-2.5 border border-line rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />

        {/* Email */}
        <label className="block text-sm font-medium mb-1">Email</label>

        <input
          className="w-full p-2.5 border border-line rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        {/* Password */}
        <label className="block text-sm font-medium mb-1">Password</label>

        <input
          className="w-full p-2.5 border border-line rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal"
          type="password"
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          minLength={6}
          required
        />

        {/* Error */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* Register button */}
        <button
          className="w-full bg-teal hover:bg-teal-dark text-white font-medium py-2.5 rounded-lg transition"
          type="submit"
        >
          Register
        </button>

        {/* Login */}
        <p className="text-sm mt-5 text-center text-ink/60">
          Already have an account?{" "}
          <button
            type="button"
            className="text-teal font-medium underline underline-offset-2"
            onClick={switchToLogin}
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
}
