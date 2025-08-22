import React, { useState } from "react";
import wimg from "../images/withdraw_img.png";
import axios from "axios";
import swal from "sweetalert";
import { DollarSign, CreditCard } from "lucide-react";

const WithdrawlForm = ({ customer, updatebalance }) => {
  const [withdrawl, setWithdrawl] = useState({
    username: customer.username,
    accountnumber: customer.accountnumber,
    withdrawlamount: "",
    withdrawltype: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://justbank-nu.vercel.app/api/withdrawl",
        withdrawl
      );

      updatebalance(response.data.balance);

      swal({
        title: "Withdrawal Successful",
        text: `Amount Withdrawn: $${withdrawl.withdrawlamount}`,
        icon: "success",
        button: "Ok",
      });
    } catch (error) {
      console.log("Withdrawal failed", error);
      swal({
        title: "Withdrawal Failed",
        text: `Amount Withdrawal failed due to ${
          error.response?.data?.message || "server error"
        }`,
        icon: "error",
        button: "Ok",
      });
    }

    setWithdrawl({
      username: customer.username,
      accountnumber: customer.accountnumber,
      withdrawlamount: "",
      withdrawltype: "",
    });
  };

  const handleClear = () => {
    setWithdrawl({
      username: customer.username,
      accountnumber: customer.accountnumber,
      withdrawlamount: "",
      withdrawltype: "",
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      {/* Image Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          className="rounded-2xl shadow-2xl object-cover h-[500px]"
          src={wimg}
          alt="Withdraw"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 max-w-lg bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8 mx-4">
        <h1 className="text-emerald-400 font-bold text-3xl text-center mb-6">
          Withdraw Funds
        </h1>

        <form className="space-y-6" onSubmit={handlesubmit}>
          {/* User Info */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm">
            <p className="text-gray-300">
              <span className="font-semibold text-gray-200">Username:</span>{" "}
              {customer.username}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-gray-200">
                Account Number:
              </span>{" "}
              {customer.accountnumber}
            </p>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">
              Withdrawal Amount
            </label>
            <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3">
              <DollarSign className="text-gray-400 w-5 h-5 mr-2" />
              <input
                className="w-full p-3 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                type="number"
                placeholder="Enter amount"
                value={withdrawl.withdrawlamount}
                onChange={(e) =>
                  setWithdrawl({ ...withdrawl, withdrawlamount: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">
              Withdrawal Type
            </label>
            <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3">
              <CreditCard className="text-gray-400 w-5 h-5 mr-2" />
              <input
                className="w-full p-3 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                type="text"
                placeholder="e.g., ATM, Online"
                value={withdrawl.withdrawltype}
                onChange={(e) =>
                  setWithdrawl({ ...withdrawl, withdrawltype: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="w-full md:w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-emerald-500/40 transition-all duration-300"
            >
              Withdraw
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="w-full md:w-1/2 bg-gray-700 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-red-400/40 transition-all duration-300"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawlForm;
