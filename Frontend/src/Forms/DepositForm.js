import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
import { Calendar, DollarSign, CreditCard } from "lucide-react";

const DepositForm = ({ customer, updatebalance }) => {
  const [depositData, setDeposit] = useState({
    username: customer.username,
    accountnumber: customer.accountnumber,
    date: "",
    depositamount: "",
    deposittype: "",
  });

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://justbank-nu.vercel.app/api/deposit",
        depositData
      );

      updatebalance(response.data.balance);

      swal({
        title: "Deposit Successful",
        text: `Amount Deposited: $${depositData.depositamount}`,
        icon: "success",
        button: "Ok",
      });
    } catch (err) {
      console.log(err);
      swal({
        title: "Error",
        text: "Deposit failed. Please try again.",
        icon: "error",
        button: "Ok",
      });
    }

    setDeposit({
      ...depositData,
      date: "",
      depositamount: "",
      deposittype: "",
    });
  };

  const handleClear = () => {
    setDeposit({
      ...depositData,
      date: "",
      depositamount: "",
      deposittype: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-gray-900 border border-gray-700 shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-emerald-400 mb-8">
          Deposit Funds
        </h1>

        {/* Customer Info */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm">
            <span className="text-gray-400 font-medium">Username:</span>
            <span className="text-white font-bold">{customer.username}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm">
            <span className="text-gray-400 font-medium">Account Number:</span>
            <span className="text-white font-bold">
              {customer.accountnumber}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleDeposit} className="space-y-6">
          {/* Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300 mb-1">
              Date
            </label>
            <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3">
              <Calendar className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="date"
                value={depositData.date}
                onChange={(e) =>
                  setDeposit({ ...depositData, date: e.target.value })
                }
                required
                className="w-full p-3 bg-transparent text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Deposit Amount */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300 mb-1">
              Deposit Amount
            </label>
            <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3">
              <DollarSign className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="number"
                value={depositData.depositamount}
                onChange={(e) =>
                  setDeposit({ ...depositData, depositamount: e.target.value })
                }
                placeholder="e.g., 500"
                required
                className="w-full p-3 bg-transparent text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Deposit Type */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300 mb-1">
              Deposit Type
            </label>
            <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3">
              <CreditCard className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="text"
                value={depositData.deposittype}
                onChange={(e) =>
                  setDeposit({ ...depositData, deposittype: e.target.value })
                }
                placeholder="e.g., Cash, Transfer, Cheque"
                required
                className="w-full p-3 bg-transparent text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="w-full sm:w-1/2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-lg hover:shadow-emerald-500/40 transition-all duration-300"
            >
              Deposit
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="w-full sm:w-1/2 px-6 py-3 bg-gray-700 hover:bg-red-500 text-white font-bold rounded-lg shadow-lg hover:shadow-red-400/40 transition-all duration-300"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositForm;
