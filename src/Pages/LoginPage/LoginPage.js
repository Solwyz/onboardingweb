import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    setPhoneError("");
    setPasswordError("");

    const validPhoneNumber = "1234567890"; // Dummy valid phone number for validation
    const validPassword = "123"; // Dummy valid password for validation

    if (phoneNumber.length !== 10) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      isValid = false;
    } else if (phoneNumber !== validPhoneNumber) {
      setPhoneError("Phone number does not exist.");
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

  const handleKeyDown = (e) => {
    // Allow only numeric characters and prevent non-numeric input
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
      setPhoneError("Please enter numbers only.");
    } else {
      setPhoneError(""); // Clear the error when valid input is detected
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    // Update the value only if it's 10 digits or fewer
    if (value.length <= 10) {
      setPhoneNumber(value);
      setPhoneError(""); // Clear error when valid input is detected
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              maxLength="10"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              required
            />
            {phoneError && (
              <p className="text-red-600 text-sm mt-1">{phoneError}</p>
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
