import React from "react";
import accdet_img from "../images/account_details.png";
import { useNavigate } from "react-router-dom";

const Accountdetail = ({ customer, updatedbalance }) => {
  const navigate = useNavigate();

  const handleShowTransactions = () => {
    navigate("/transactions");
  };

  return (
    <>
      <div className="relative min-h-screen bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={accdet_img}
            alt="kiran"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-lg bg-neutral-800 bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100">
            <div className="p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-extrabold text-green-400 mb-6 sm:mb-8 tracking-wide">
                Account Details
              </h1>
              <div className="space-y-4">
                <div className="bg-neutral-700 bg-opacity-70 rounded-lg px-4 py-3 shadow-inner">
                  <p className="text-sm text-neutral-400 font-medium">Username</p>
                  <p className="text-lg text-white font-semibold">{customer.username}</p>
                </div>
                <div className="bg-neutral-700 bg-opacity-70 rounded-lg px-4 py-3 shadow-inner">
                  <p className="text-sm text-neutral-400 font-medium">Account Number</p>
                  <p className="text-lg text-white font-semibold">{customer.accountnumber}</p>
                </div>
                <div className="bg-neutral-700 bg-opacity-70 rounded-lg px-4 py-3 shadow-inner">
                  <p className="text-sm text-neutral-400 font-medium">Branch</p>
                  <p className="text-lg text-white font-semibold">{customer.branch}</p>
                </div>
                <div className="bg-neutral-700 bg-opacity-70 rounded-lg px-4 py-3 shadow-inner">
                  <p className="text-sm text-neutral-400 font-medium">Phone Number</p>
                  <p className="text-lg text-white font-semibold">{customer.phonenumber}</p>
                </div>
                <div className="bg-neutral-700 bg-opacity-70 rounded-lg px-4 py-3 shadow-inner flex justify-between items-center">
                  <div>
                    <p className="text-sm text-neutral-400 font-medium">Available Balance</p>
                    <p className="text-2xl font-bold text-green-400 mt-1">
                      ${" "}
                      {updatedbalance === 0 ? customer.balance : updatedbalance}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={handleShowTransactions}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-neutral-800"
                >
                  View Transactions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accountdetail;