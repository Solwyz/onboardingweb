import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImg from '../../Assets/signup.png'

function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  // Define user roles and their credentials
  const credentials = {
    superadmin: { phone: "1234567890", password: "superadmin" },
    hrtas: { phone: "1234567890", password: "hrtas" },
    hrm: { phone: "1234567890", password: "hrm" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    setPhoneError("");
    setPasswordError("");

    // Validate phone number format
    if (phoneNumber.length !== 10) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      isValid = false;
    }

    // Check credentials for all roles
    if (isValid) {
      if (phoneNumber === credentials.superadmin.phone && password === credentials.superadmin.password) {
        navigate("/superadmin");
      } else if (phoneNumber === credentials.hrtas.phone && password === credentials.hrtas.password) {
        navigate("/hrtas");
      } else if (phoneNumber === credentials.hrm.phone && password === credentials.hrm.password) {
        navigate("/hr");
      } else {
        setPasswordError("Incorrect phone number or password.");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
      setPhoneError("Please enter numbers only.");
    } else {
      setPhoneError("");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setPhoneNumber(value);
      setPhoneError("");
    }
  };

  const handleBlur = () => {
    if (phoneNumber.length !== 10) {
      setPhoneError("Please enter a valid 10-digit phone number.");
    }
  };

  return (
    <div className="grid p-6  bg-white ">
      <div className="flex">

        <div>

          <img  className="w-[801px] h-[976px]" src={signupImg} alt="" />

        </div>

        <div className="ml-[88px] mt-[164px] w-[378px]">
          <h2 className="text-[36px] text-[#0C1421] font-medium font-Popins text-start">Welcome Back</h2>
          <p className="text-start font-Popins font-normal mt-[16px]   text-[#444444]">Today is a new day. It's your day. You shape it. <br />
            Sign in to start managing your projects.</p>

          <form onSubmit={handleSubmit}>
            <div className="mt-[72px]">
              <label className="block text-base font-normal text-[#0C1421] font-Popins">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                maxLength="10"
                className="w-full mt-2 h-[48px] px-4 py-4 border border-[#D4D7E3] bg-[#F7FBFF] rounded-lg focus:outline-none text-base font-normal placeholder:text-[#8897AD]"
                placeholder="Enter your phone number"
                required
              />
              {phoneError && (
                <p className="text-red-600 text-sm mt-1">{phoneError}</p>
              )}
            </div>

            <div className="mt-6">
              <label className="block text-base font-normal text-[#0C1421] font-Popins">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 h-[48px] px-4 py-4 border border-[#D4D7E3] bg-[#F7FBFF] rounded-lg focus:outline-none text-base font-normal placeholder:text-[#8897AD]"
                placeholder="Enter your password"
                required
              />
              {passwordError && (
                <p className="text-red-600 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex-grow"></div>
              <Link
                to="/forgot"
                className="text-sm text-[#1E4AE9] font-normal font-Popins"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2B2342] text-white font-normal font-Popins py-2 px-2 rounded-lg mt-6 hover:bg-[#4A3C76]"
            >
              Sign In
            </button>

            <div className="mt-10 text-center">
              <p className="text-sm font-Popins font-normal text-[#313957]">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#1E4AE9] font-Popins font-normal text-sm"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
          <div className="mt-[200px]">
            <h2 className="items-center text-center font-Popins text-[#959CB6] text-base font-normal"> © {new Date().getFullYear()} ALL RIGHTS RESERVED</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
