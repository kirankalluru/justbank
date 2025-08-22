import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ customer, setCustomer }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCustomer(null);
    navigate("/login");
    setIsOpen(false);
  };

  // Shared menu items
  const guestLinks = [
    { to: "/login", label: "Login", style: "bg-gray-100 text-blue-900 hover:bg-gray-200" },
    { to: "/registration", label: "Register", style: "bg-green-500 text-white hover:bg-green-600" },
  ];

  const customerLinks = [
    { to: "/LoanApproval", label: "Loan Approval Prediction" },
    { to: "/Accountdetail", label: "Account Details" },
    { to: "/DepositForm", label: "Deposit" },
    { to: "/WithdrawlForm", label: "Withdrawal" },
  ];

  const renderLinks = (isMobile = false) => {
    const baseStyle =
      "px-3 py-2 rounded-md font-medium transition-all duration-200";
    return (
      <>
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className={`${baseStyle} bg-green-500 text-white hover:bg-green-600 ${
            isMobile ? "block text-center w-full" : "inline-block"
          }`}
        >
          Home
        </Link>
        {!customer
          ? guestLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`${baseStyle} ${link.style} ${
                  isMobile ? "block text-center w-full mt-2" : "ml-2"
                }`}
              >
                {link.label}
              </Link>
            ))
          : (
            <>
              {customerLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`${baseStyle} bg-gray-100 text-blue-900 hover:bg-gray-200 ${
                    isMobile ? "block text-center w-full mt-2" : "ml-2"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className={`${baseStyle} bg-red-600 text-white hover:bg-red-700 ${
                  isMobile ? "block text-center w-full mt-2" : "ml-2"
                }`}
              >
                Logout
              </button>
            </>
          )}
      </>
    );
  };

  return (
    <nav className="bg-blue-900 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl md:text-3xl font-bold tracking-wide">
          JUST Bank
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center">{renderLinks()}</div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 px-4 py-3 rounded-lg space-y-2">
          {renderLinks(true)}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
