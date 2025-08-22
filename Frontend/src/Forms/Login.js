import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Login = ({ updatecustomer }) => {
  const navigate = useNavigate();
  const [logindata, setLogindata] = useState({
    username: "",
    password: "",
  });

  const handleClear = () => {
    setLogindata({
      username: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://justbank-nu.vercel.app/api/login", logindata);
      updatecustomer(response.data.customer);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/Accountdetail");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      {/* Toastify CSS is loaded via a link tag to resolve the build error */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-toastify@9.1.3/dist/ReactToastify.css" />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-sm mx-auto bg-gray-800 shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-extrabold text-center text-emerald-400 mb-8">
            Welcome Back!
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                value={logindata.username}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
                placeholder='username'
                required
                onChange={(e) => setLogindata({ ...logindata, username: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={logindata.password}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
                required
                placeholder='password'
                onChange={(e) => setLogindata({ ...logindata, password: e.target.value })}
                maxLength={8}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="w-full sm:w-1/2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                type="submit"
              >
                Login
              </button>
              <button
                className="w-full sm:w-1/2 px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                type="button"
                onClick={handleClear}
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

export default Login;
