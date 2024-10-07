import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    setUsernameError("");
    setPasswordError("");

    const validUsername = "user@example.com";
    const validPassword = "123";

    if (username !== validUsername) {
      setUsernameError("Username does not exist.");
      isValid = false;
    }

    if (password !== validPassword) {
      setPasswordError("Incorrect password.");
      isValid = false;
    }

    if (isValid) {

      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
            {usernameError && (
              <p className="text-red-600 text-sm mt-1">{usernameError}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
            {passwordError && (
              <p className="text-red-600 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex-grow"></div>
            <Link
              to="/forgot"
              className="text-sm text-blue-600 hover:underline hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-700">
              New user?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:underline font-semibold hover:text-blue-800"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
