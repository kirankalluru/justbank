import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bankimg from "./images/homepageimg.png";

import banklogo from "./images/homepagrightlogo.png";

import { CreditCardIcon, BanknotesIcon, ShieldCheckIcon, AcademicCapIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";

function Home() {
  const features = [
    {
      title: "AI Loan Approval",
      desc: "Smart prediction systems to check loan eligibility instantly.",
      icon: "💡",
    },
    {
      title: "Secure Banking",
      desc: "Top-grade security with encrypted transactions & fraud protection.",
      icon: "🔒",
    },
    {
      title: "Quick Deposits",
      desc: "Deposit money anytime, anywhere with a few simple clicks.",
      icon: "💰",
    },
    {
      title: "Easy Withdrawals",
      desc: "Fast withdrawals without long waiting queues at the bank.",
      icon: "🏦",
    },
  ];

  const partnerIcons = [
    AcademicCapIcon,
    BanknotesIcon,
    CreditCardIcon,
    ShieldCheckIcon,
    DevicePhoneMobileIcon,
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-300">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 md:py-24">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 space-y-6 text-center md:text-left"
        >
          <div className="text-4xl md:text-5xl font-extrabold text-emerald-400 mb-4">
            Just Bank
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Banking for the Modern Era
          </h1>
          <p className="text-lg text-gray-400">
            Your trusted financial partner for secure banking, smart investments,
            and AI-powered financial solutions.
          </p>
          <Link to={"/login"}>
            <button className="px-8 py-4 mt-6 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300">
              Get Started
            </button>
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex md:w-1/2 justify-center items-center mt-8 md:mt-0"
        >
         
          <img
          src={bankimg}
          alt="Abstract modern banking"
          className="rounded-3xl shadow-2xl md:h-[500px] object-cover"
        />

        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-gray-800"
      >
        <h2 className="text-3xl font-bold text-center text-white">
          Why Choose Just Bank?
        </h2>
        <p className="text-center text-gray-400 mt-2">
          Experience modern, secure, and intelligent banking like never before.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 px-6 md:px-16">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700 p-6 rounded-2xl shadow-lg text-center border border-gray-600"
            >
              <div className="text-4xl text-emerald-400">{feature.icon}</div>
              <h3 className="text-xl font-semibold mt-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Credit Card Flip Section */}
      <div className="py-20 bg-gray-900 flex flex-col items-center text-white">
        <h2 className="text-3xl font-bold text-center mb-12">
          Your Premium Just Bank Credit Card
        </h2>
        <div className="relative w-80 h-52 [perspective:1000px]">
          <div className="absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
            {/* Front */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between [backface-visibility:hidden]">
              <div className="flex justify-end">
                <CreditCardIcon className="h-10 w-10 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm tracking-widest text-gray-400">CARD NUMBER</p>
                <p className="text-xl font-mono text-white">1234 5678 9012 3456</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-400">VALID THRU: 12/28</p>
                <p className="font-semibold text-white">JOHN DOE</p>
              </div>
            </div>
            {/* Back */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div className="bg-gray-700 h-10 w-full rounded-sm"></div>
              <div className="bg-white h-8 w-3/4 mt-4 rounded-sm"></div>
              <p className="text-right font-mono text-lg text-white mt-4">CVC: 456</p>
            </div>
          </div>
        </div>
      </div>

      {/* Apple-style Minimal Section */}
      <div className="py-20 text-center bg-gray-800">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white max-w-3xl mx-auto"
        >
          Banking That Feels Effortless
        </motion.h2>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          We design banking to be smooth, minimal, and powerful. Every feature works
          seamlessly across devices with a clean design and unmatched performance.
        </p>
      </div>

      {/* Partner Logos Infinite Scroll */}
      <div className="py-16 bg-gray-900 overflow-hidden">
        <h2 className="text-2xl font-bold text-center text-white mb-8">
          Trusted by Leading Partners
        </h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll gap-12 w-max">
            {partnerIcons.concat(partnerIcons).map((Icon, i) => (
              <div key={i} className="p-4 bg-gray-800 rounded-xl shadow-lg flex items-center justify-center border border-gray-700">
                <Icon className="w-12 h-12 text-emerald-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Animation */}
      <style>{`
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default Home;
