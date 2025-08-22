import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Registration() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    accountnumber: "",
    branch: "",
    phonenumber: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("Sending signup data:", signupData);
    try {
      const response = await axios.post(
        "https://justbank-nu.vercel.app/api/signup",
        signupData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from server:", response.data);
      toast.success(response.data.message, { position: "top-right", autoClose: 2000 });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        if (error.response.status === 401) {
          toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
        } else {
          toast.error("Something went wrong. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else {
        toast.error("Server is unreachable. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handleclear = () => {
    setSignupData({
      username: "",
      password: "",
      accountnumber: "",
      branch: "",
      phonenumber: "",
    });
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-toastify@9.1.3/dist/ReactToastify.css" />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-lg mx-auto bg-gray-800 shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-extrabold text-center text-emerald-400 mb-8">
            Create an Account
          </h1>
          <form className="space-y-6" onSubmit={handlesubmit}>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
                required
                placeholder="Username"
                value={signupData.username}
                onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                maxLength={8}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Account Number</label>
              <input
                type="number"
                required
                placeholder="Account Number"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
                value={signupData.accountnumber}
                onChange={(e) => {
                  if (e.target.value.length <= 14) {
                    setSignupData({ ...signupData, accountnumber: e.target.value });
                  }
                }}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Branch</label>
              <input
                type="text"
                required
                placeholder="Branch"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
                value={signupData.branch}
                onChange={(e) => setSignupData({ ...signupData, branch: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Registered Phone Number</label>
              <input
                type="number"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
                placeholder="Phone Number"
                value={signupData.phonenumber}
                onChange={(e) => {
                  if (e.target.value.length <= 10) {
                    setSignupData({ ...signupData, phonenumber: e.target.value });
                  }
                }}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="w-full sm:w-1/2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                type="submit"
              >
                Sign up
              </button>
              <button
                onClick={handleclear}
                className="w-full sm:w-1/2 px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                type="button"
              >
                Clear
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Registration;