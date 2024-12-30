import React, { useState, useEffect } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import medoLogo from "../../Assets/medoLogo.svg"
import Api from "../../Services/Api";
function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const [token, setToken] = useState(localStorage.getItem('token'))

  const navigate = useNavigate();

  // Define user roles and their credentials
  const credentials = {
    superadmin: { phone: "1234567890", password: "superadmin" },
    hrtas: { phone: "1234567890", password: "hrtas" },
    hrm: { phone: "1234567890", password: "hrm" },
  };

  useEffect(() => {
    // Check if both phone number and password are filled and valid
    if (phoneNumber.length === 10 && password !== "") {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [phoneNumber, password]);

  const handleSubmit = (e) => {
    e.preventDefault();


    Api.post('api/auth/authenticate',
      JSON.stringify({
        "username": phoneNumber,
        "password": password
      }))
      .then(response => {
        if (response.data && response.data.jwt) {
          setToken(response.data.jwt);
          console.log('your token is : ', response.data.jwt)
          localStorage.setItem('token', response.data.jwt);
          navigate("/superadmin")
        } else {
          console.error('Invalid response data:', response)
          alert('Authentication failed. Please try again.')
        }
      })

      
      // .catch(error => {
      //   console.error('Error occurred during authentication:', error);
      //   alert('An error occured while trying to authenticate. Please check your credentials or try again later.')
      // })


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
      // if (phoneNumber === credentials.superadmin.phone && password === credentials.superadmin.password) {
      //   navigate("/superadmin");
      // } else 
      if (phoneNumber === credentials.hrtas.phone && password === credentials.hrtas.password) {
        navigate("/hrtas");
      } else if (phoneNumber === credentials.hrm.phone && password === credentials.hrm.password) {
        navigate("/hr");
      } else {
        setPasswordError("Incorrect phone number or password.");
      }
    }
  };

  // const handleKeyDown = (e) => {
  //   if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
  //     e.preventDefault();
  //     setPhoneError("Please enter numbers only.");
  //   } else {
  //     setPhoneError("");
  //   }
  // };

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
    <div className="grid p-6 bg-white ">
      <div className="flex">
        <div className="bg-adminLogin bg-cover w-[801px]  h-[976px]">

        </div>

        <div className="ml-[88px]">
          <div className=" ml-[421px] "><img src={medoLogo} className="" alt="" /></div>
          <div className="mt-[113px] w-[379px]">
            <h2 className="text-[36px] text-[#0C1421] font-medium font-Popins text-start">Welcome Back</h2>
            <p className="text-start font-Popins font-normal mt-[16px] text-[#444444]">
              Today is a new day. It's your day. You shape it. <br />
              Sign in to start managing your projects.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mt-[72px]">
                <label className="block text-base font-normal text-[#0C1421] font-Popins">User name</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={handleChange}
                  // onKeyDown={handleKeyDown}
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
                <Link to="/forgot" className="text-sm text-[#1E4AE9] font-normal font-Popins">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className={`w-full py-2 px-2 rounded-lg mt-6 font-Popins font-normal ${isFormValid ? "bg-[#2B2342] text-white hover:bg-[#4A3C76]" : "bg-[#D0C6EF] text-white cursor-not-allowed"
                  }`}
                disabled={!isFormValid}
              >
                Sign In
              </button>

              <div className="mt-10 text-center">
                <p className="text-sm font-Popins font-normal text-[#313957]">
                  Don’t have an account?{" "}
                  <Link to="/signup" className="text-[#1E4AE9] font-Popins font-normal text-sm">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>

            <div className="mt-[200px]">
              <h2 className="items-center text-center font-Popins text-[#959CB6] text-base font-normal">
                © {new Date().getFullYear()} ALL RIGHTS RESERVED
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
